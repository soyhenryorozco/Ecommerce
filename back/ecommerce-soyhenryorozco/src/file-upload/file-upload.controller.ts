import {
  Controller,
  FileTypeValidator,
  MaxFileSizeValidator,
  Param,
  ParseFilePipe,
  ParseUUIDPipe,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileUploadService } from './file-upload.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBody, ApiConsumes } from '@nestjs/swagger';

@Controller('file-upload')
export class FileUploadController {
  constructor(private readonly fileUploadService: FileUploadService) {}

  @Post('uploadImage/:productId')
  @ApiConsumes('multipart/form-data')
    @ApiBody({
    description: 'Imagen a subir a Cloudinary',
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })

  @UseInterceptors(FileInterceptor('file'))
  uploadImage(
    @Param('productId', ParseUUIDPipe) productId: string,
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({
            maxSize: 200000,
            message: 'File size is to large',
          }),
          new FileTypeValidator({
            fileType: /(jpg|jpeg|png|webp)$/,
          })
        ],
      }),
    )
    file: Express.Multer.File,
  ) {
    return this.fileUploadService.uploadImage(file, productId);
  }
}

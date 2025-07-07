import { Injectable } from '@nestjs/common';
import * as toStream from 'buffer-to-stream';
import cloudinary from '../config/cloudinary';
import { UploadApiResponse } from 'cloudinary';

@Injectable()
export class FileUploadRepository {
  async uploadImage(
    file: Express.Multer.File,
  ): Promise<UploadApiResponse> {
    console.log('Iniciando subida de archivo:', {
      originalname: file.originalname,
      mimetype: file.mimetype,
      size: file.size,
    });

    return new Promise((resolve, reject) => {
      const upload = cloudinary.uploader.upload_stream(
        {
          resource_type: 'auto',
          folder: 'ecommerce',
        },
        (error, result) => {
          if (error) {
            console.error('Error detallado de Cloudinary:', error);
            reject(error);
          } else {
            console.log('Archivo subido exitosamente:', result);
            resolve(result!);
          }
        },
      );
      toStream(file.buffer).pipe(upload);
    });
  }
}

import { ApiProperty, PickType } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsString,
  Matches,
  MaxLength,
  MinLength,
  Validate,
} from 'class-validator';
import { MatchPassword } from 'src/helpers/matchPassword';

export class CreateUserDto {
  /**
   * @description Esta propiedad debe ser el nombre del usuario
   * @example Henry
   */

  @IsString()
  @MinLength(3)
  @IsNotEmpty()
  name: string;

  /**
   * @description Esta propiedad debe ser un email valido
   * @example Henry@gmail.com
   */

  @IsNotEmpty()
  @IsEmail()
  email: string;

  /**
   * @example Henry123!
   */
  @IsNotEmpty()
  @IsString()
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])/, {
    message:
      'La contraseña debe tener al menos una minúscula, una mayúscula, un número y un carácter especial',
  })
  
  @IsNotEmpty()
  @MinLength(8)
  @MaxLength(15) // Password123!
  password: string;


  /**
   * @example Henry123!
   */
  @IsNotEmpty()
  @Validate(MatchPassword, ['password']) //
  confirmPassword: string;


  /**
   * @example MarinillaCol
   */
  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  @MaxLength(80)
  address: string;


  /**
   * @example 3192252490
   */
  @IsNotEmpty()
  @IsNumber()
  phone: number;


  /**
   * @example Colombia
   */
  @IsNotEmpty()
  @IsString()
  @MinLength(5)
  @MaxLength(20)
  country: string;



  /**
   * @example Marinilla
   */
  @IsNotEmpty()
  @IsString()
  @MinLength(5)
  @MaxLength(20)
  city: string;

  @IsNotEmpty()
  @IsNumber()
  edad: number;
}

export class LoginDto extends PickType(CreateUserDto, ['password', 'email']) {}

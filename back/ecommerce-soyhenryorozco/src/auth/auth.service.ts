import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto, LoginDto } from 'src/users/dtos/users.dto';
import * as bcrypt from 'bcrypt';
import { Users } from 'src/users/entities/users.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Users) private usersRepository: Repository<Users>,
    private readonly jwtService: JwtService,
  ) {}

  async signIn(credentials: LoginDto) {
    const findUser = await this.usersRepository.findOneBy({
      email: credentials.email,
    });

    if (!findUser) throw new BadRequestException('Bad credentials');

    const passwordMatch = await bcrypt.compare(
      credentials.password,
      findUser.password,
    );

    if (!passwordMatch) throw new BadRequestException('Bad credentials');
    const payload = {
      id: findUser.id,
      email: findUser.id,
      isAdmin: findUser.isAdmin,
    };
    const token = this.jwtService.sign(payload);

    return token;
  }

  // getAuth(user: any) {
  //   return 'Get all auth';
  // }

  async signUp(user: CreateUserDto) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { confirmPassword, ...userWhithoutPassword } = user;

    const findUser = await this.usersRepository.findOneBy({
      email: user.email,
    });

    if (findUser) throw new BadRequestException('User already registered');

    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
    const hashedPassword = await bcrypt.hash(user.password, 10);

    const newUser = await this.usersRepository.save({
      ...userWhithoutPassword,
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      password: hashedPassword,
    });

    const { password, isAdmin, ...cleanUser } = newUser;
    return cleanUser;
  }
}

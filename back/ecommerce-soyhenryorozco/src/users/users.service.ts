import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Users } from './entities/users.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Users) private readonly userRepository: Repository<Users>,
  ) {}

  async getUsers(page: number, limit: number) {
    let users = await this.userRepository.find();

    const start = (page - 1) * limit;
    const end = start + limit;

    users = users.slice(start, end);

    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return users.map(({ password, isAdmin,...user }) => user);
  }

  async getUser(id: string) {
    // Validar que el ID sea un UUID válido
    const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
    if (!uuidRegex.test(id)) {
      throw new BadRequestException('Invalid UUID format');
    }

    const user = await this.userRepository.findOne({
      where: { id },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const { password, isAdmin, ...userWithoutPassword } = user;
    return userWithoutPassword;
  }

  // async createUser(userData: Partial<Users>) {
  //   const user = this.userRepository.create(userData);
  //   const savedUser = await this.userRepository.save(user);
  //   const { password, isAdmin, ...userWithoutPassword } = savedUser;
  //   return userWithoutPassword;
  // }

  // async updateUser(id: string, userData: Partial<Users>) {
  //   const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
  //   if (!uuidRegex.test(id)) {
  //     throw new BadRequestException('Invalid UUID format');
  //   }

  //   const user = await this.userRepository.findOne({ where: { id } });
  //   if (!user) {
  //     throw new NotFoundException('User not found');
  //   }

  //   await this.userRepository.update(id, userData);
  //   const updatedUser = await this.userRepository.findOne({ where: { id } });
  //   const { password, ...userWithoutPassword } = updatedUser!;
  //   return userWithoutPassword;
  // }

  // async deleteUser(id: string) {
  //   const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
  //   if (!uuidRegex.test(id)) {
  //     throw new BadRequestException('Invalid UUID format');
  //   }

  //   const user = await this.userRepository.findOne({ where: { id } });
  //   if (!user) {
  //     throw new NotFoundException('User not found');
  //   }

  //   await this.userRepository.delete(id);
  //   return { message: 'User deleted successfully' };
  // }

  // async createTestUsers() {
  //   try {
  //     // Primero, eliminar todos los usuarios existentes usando CASCADE
  //     await this.userRepository.query('TRUNCATE TABLE "USERS" CASCADE');

  //     const testUsers = [
  //       {
  //         name: 'Juan Pérez',
  //         email: 'juan.perez@example.com',
  //         password: 'hashedpassword123',
  //         phone: 3001234567,
  //         country: 'Colombia',
  //         address: 'Calle 123 #45-67',
  //         city: 'Bogotá',
  //         isAdmin: false,
  //       },
  //       {
  //         name: 'María Gómez',
  //         email: 'maria.gomez@example.com',
  //         password: 'hashedpassword456',
  //         phone: 3019876543,
  //         country: 'Colombia',
  //         address: 'Carrera 89 #12-34',
  //         city: 'Medellín',
  //         isAdmin: false,
  //       },
  //       {
  //         name: 'Admin User',
  //         email: 'admin@example.com',
  //         password: 'adminpassword',
  //         phone: 3000000000,
  //         country: 'Colombia',
  //         address: 'Calle Admin #1',
  //         city: 'Bogotá',
  //         isAdmin: true,
  //       },
  //     ];

  //     const createdUsers = await this.userRepository.save(testUsers);
  //     console.log('Usuarios creados:', createdUsers); // Para debug

  //     // Obtener todos los usuarios para verificar
  //     const allUsers = await this.userRepository.find();
  //     console.log('Todos los usuarios en la base de datos:', allUsers); // Para debug

  //     return createdUsers.map(({ password, isAdmin, ...user }) => user);
  //   } catch (error) {
  //     console.error('Error al crear usuarios de prueba:', error);
  //     throw error;
  //   }
  // }
}

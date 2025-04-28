import {
  Injectable,
  ConflictException,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcryptjs';
import { Prisma } from '@prisma/client';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async update(userId: number, data: UpdateUserDto) {
    try {
      const user = await this.prisma.user.update({
        where: { id: userId },
        data,
        select: {
          id: true,
          nome: true,
          email: true,
          cpf: true,
          telefone: true,
          created_at: true,
        },
      });

      return user;
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === 'P2002'
      ) {
        const field =
          error.meta?.target instanceof Array
            ? error.meta.target[0]
            : error.meta?.target;

        if (field === 'email') {
          throw new ConflictException('Este e-mail já está cadastrado.');
        }
        if (field === 'cpf') {
          throw new ConflictException('Este CPF já está cadastrado.');
        }

        throw new ConflictException(
          'Já existe um usuário com este dado único.',
        );
      }
      throw error;
    }
  }

  async create(data: CreateUserDto) {
    const hashedPassword = await bcrypt.hash(data.senha, 10);

    try {
      const user = await this.prisma.user.create({
        data: {
          nome: data.nome,
          email: data.email,
          cpf: data.cpf,
          telefone: data.telefone,
          senha: hashedPassword,
        },
      });

      return {
        id: user.id,
        nome: user.nome,
        email: user.email,
        cpf: user.cpf,
        telefone: user.telefone,
        createdAt: user.created_at,
      };
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === 'P2002'
      ) {
        const field =
          error.meta?.target instanceof Array
            ? error.meta.target[0]
            : error.meta?.target;

        if (field === 'email') {
          throw new ConflictException('Este e-mail já está cadastrado.');
        }

        if (field === 'cpf') {
          throw new ConflictException('Este CPF já está cadastrado.');
        }

        throw new ConflictException(
          'Já existe um usuário com este dado único.',
        );
      }
      throw error;
    }
  }
  async findAll() {
    return this.prisma.user.findMany({
      select: {
        id: true,
        nome: true,
        email: true,
        cpf: true,
        telefone: true,
        created_at: true,
      },
      orderBy: {
        id: 'asc',
      },
    });
  }

  async findOne(id: number) {
    const user = await this.prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        nome: true,
        email: true,
        cpf: true,
        telefone: true,
        created_at: true,
      },
    });

    if (!user) {
      throw new NotFoundException('Usuário não encontrado.');
    }

    return user;
  }
}

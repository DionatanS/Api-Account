import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { PrismaService } from '../prisma/prisma.service';
import { JwtStrategy } from '../auth/jwt.strategy'; // Estratégia de autenticação

@Module({
  controllers: [UserController],
  providers: [UserService, PrismaService, JwtStrategy], // Aqui sim precisa manter o JwtStrategy para proteger rotas
})
export class UserModule {}

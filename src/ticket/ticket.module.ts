import { Module } from '@nestjs/common';
import { TicketController } from './ticket.controller';
import { TicketService } from './ticket.service';
import { PrismaService } from '../prisma/prisma.service';
import { JwtStrategy } from '../auth/jwt.strategy';

@Module({
  controllers: [TicketController],
  providers: [TicketService, PrismaService, JwtStrategy],
})
export class TicketModule {}

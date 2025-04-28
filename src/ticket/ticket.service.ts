import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateTicketDto } from './dto/create-ticket.dto';

@Injectable()
export class TicketService {
  constructor(private prisma: PrismaService) {}

  async create(userId: number, data: CreateTicketDto) {
    const ticket = await this.prisma.ticket.create({
      data: {
        setor: data.setor,
        descricao: data.descricao,
        nome: data.nome,
        userId,
        status: data.status ?? 'ABERTO',
      },
    });

    return ticket;
  }

  async findAllByUser(userId: number) {
    return this.prisma.ticket.findMany({
      where: {
        userId,
      },
      orderBy: {
        created_at: 'desc',
      },
    });
  }
  async delete(userId: number, ticketId: number) {
    const ticket = await this.prisma.ticket.findUnique({
      where: { id: ticketId },
    });

    if (!ticket) {
      throw new NotFoundException('Ticket não encontrado');
    }

    if (ticket.userId !== userId) {
      throw new ForbiddenException(
        'Você não tem permissão para excluir este ticket',
      );
    }

    await this.prisma.ticket.delete({
      where: { id: ticketId },
    });

    return { message: 'Ticket excluído com sucesso!' };
  }
}

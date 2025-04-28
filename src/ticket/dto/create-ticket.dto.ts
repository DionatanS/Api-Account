import { IsEnum, IsNotEmpty, IsOptional, MaxLength } from 'class-validator';

export enum TicketStatus {
  ABERTO = 'ABERTO',
  EM_ANDAMENTO = 'EM_ANDAMENTO',
  CONCLUIDO = 'CONCLUIDO',
}

export class CreateTicketDto {
  @IsNotEmpty({ message: 'Setor é obrigatório' })
  @MaxLength(100, { message: 'Setor deve ter no máximo 100 caracteres' })
  setor!: string;

  @IsNotEmpty({ message: 'Nome do chamado é obrigatório' })
  @MaxLength(191, {
    message: 'Nome do chamado deve ter no máximo 191 caracteres',
  })
  nome!: string;

  @IsNotEmpty({ message: 'Descrição é obrigatória' })
  descricao!: string;

  @IsOptional()
  @IsEnum(TicketStatus, { message: 'Status inválido' })
  status?: TicketStatus;
}

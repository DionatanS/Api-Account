import {
  IsEmail,
  IsNotEmpty,
  Length,
  Matches,
  MaxLength,
} from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  @MaxLength(100, { message: 'O nome deve ter no máximo 100 caracteres' })
  nome!: string;

  @IsEmail({}, { message: 'E-mail inválido' })
  @MaxLength(191, { message: 'O e-mail deve ter no máximo 191 caracteres' })
  email!: string;

  @IsNotEmpty()
  @Matches(/^\d{11}$/, {
    message: 'CPF deve ter exatamente 11 dígitos numéricos',
  })
  cpf!: string;

  @IsNotEmpty()
  @Matches(/^\d{10,11}$/, {
    message: 'Telefone deve ter 10 ou 11 dígitos numéricos',
  })
  @MaxLength(20, { message: 'O telefone deve ter no máximo 20 caracteres' })
  telefone!: string;

  @IsNotEmpty()
  @Length(6, 32, { message: 'Senha deve ter entre 6 e 32 caracteres' })
  senha!: string;
}

import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';

@Injectable()
export class ApiKeyGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();

    const apiKey = request.headers['x-api-key'];

    if (!apiKey) {
      throw new UnauthorizedException('x-api-key não encontrada.');
    }

    if (apiKey !== process.env.API_KEY) {
      throw new UnauthorizedException('x-api-key inválida.');
    }

    return true;
  }
}

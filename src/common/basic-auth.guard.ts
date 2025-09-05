import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';

@Injectable()
export class BasicAuthGuard implements CanActivate {
  canActivate(ctx: ExecutionContext): boolean {
    const req = ctx.switchToHttp().getRequest<Request & { headers: any }>();
    const hdr = req.headers['authorization'] as string | undefined;
    if (!hdr?.startsWith('Basic '))
      throw new UnauthorizedException('Auth required');

    const [user, pass] = Buffer.from(hdr.slice(6), 'base64')
      .toString()
      .split(':');
    const ok =
      user === process.env.ADMIN_USER && pass === process.env.ADMIN_PASS;
    if (!ok) throw new UnauthorizedException('Bad credentials');
    return true;
  }
}

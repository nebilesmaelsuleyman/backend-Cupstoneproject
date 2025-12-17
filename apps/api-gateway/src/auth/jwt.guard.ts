import { CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { verifyToken } from '@clerk/clerk-sdk-node';

export class JwtGuard implements CanActivate {
  async canActivate(ctx: ExecutionContext) {
    const req = ctx.switchToHttp().getRequest();
    const token = req.headers.authorization?.replace('Bearer ', '');

    if (!token) throw new UnauthorizedException();

    const payload = await verifyToken(token, {
      secretKey: process.env.CLERK_SECRET_KEY,
      issuer: null
    });

    req.user = payload;
    return true;
  }
}

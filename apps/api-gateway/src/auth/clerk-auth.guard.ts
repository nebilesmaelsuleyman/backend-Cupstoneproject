import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { verifyToken } from '@clerk/backend';

@Injectable()
export class ClerkAuthGuard implements CanActivate {
  async canActivate(ctx: ExecutionContext) {
    const req = ctx.switchToHttp().getRequest();
    const authHeader = req.headers.authorization;

    if (!authHeader) throw new UnauthorizedException('No authorization header');

    const token = authHeader.replace('Bearer ', '');

    try {
     const payload = await verifyToken(token, {
    // Use your Secret Key from .env instead of a URL
    secretKey: process.env.CLERK_SECRET_KEY, 
  });

      req.user = payload;
      return true;
    } catch (err) {
      console.error('Clerk token verification failed', err);
      throw new UnauthorizedException('Invalid token');
    }
  }
}

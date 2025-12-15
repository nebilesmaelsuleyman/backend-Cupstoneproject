// api-gateway/src/auth/jwt.guard.ts
import { CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { verifyToken } from '@clerk/clerk-sdk-node';

export class JwtAuthGuard implements CanActivate {
  async canActivate(context: ExecutionContext) {
    const req = context.switchToHttp().getRequest();
    const authHeader = req.headers.authorization;

    if (!authHeader) throw new UnauthorizedException();

    const token = authHeader.replace('Bearer ', '');

    try {
      const payload = await verifyToken(token, {
          secretKey: process.env.CLERK_SECRET_KEY,
          issuer: null
      });

      req.user = payload;
      return true;
    } catch {
      throw new UnauthorizedException();
    }
  }
}

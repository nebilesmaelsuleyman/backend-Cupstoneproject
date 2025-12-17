import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common'
import { verifyToken } from '@clerk/clerk-sdk-node'

@Injectable()
export class ClerkAuthGuard implements CanActivate {
  async canActivate(context: ExecutionContext) {
    const req = context.switchToHttp().getRequest()

    const authHeader = req.headers.authorization
    if (!authHeader) {
      throw new UnauthorizedException('Missing Authorization header')
    }

    const token = authHeader.replace('Bearer ', '')

    try {
      const payload = await verifyToken(token, {
          secretKey: process.env.CLERK_SECRET_KEY,
          issuer: null
      })

      req.user = {
        clerkUserId: payload.sub,
        email: payload.email,
      }

      return true
    } catch {
      throw new UnauthorizedException('Invalid Clerk token')
    }
  }
}

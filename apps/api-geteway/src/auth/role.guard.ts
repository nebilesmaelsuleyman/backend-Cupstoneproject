import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common'
import { AuthService } from './auth.service'

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private authService: AuthService) {}

  async canActivate(ctx: ExecutionContext) {
    const req = ctx.switchToHttp().getRequest()
    const user = req.user

    const result = await this.authService.validateOrCreateUser(
      user.clerkUserId,
      user.email,
    )

    if (!result.active) {
      throw new ForbiddenException('User inactive')
    }

    req.user.role = result.role
    return true
  }
}

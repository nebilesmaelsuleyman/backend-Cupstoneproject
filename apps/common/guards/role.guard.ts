import {
  CanActivate,
  ExecutionContext,
  Injectable,
  ForbiddenException,
} from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { ROLES_KEY } from '../decorators/role.decorator'

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(ctx: ExecutionContext): boolean {
    const requiredRoles =
      this.reflector.getAllAndOverride<string[]>(
        ROLES_KEY,
        [ctx.getHandler(), ctx.getClass()],
      )

    if (!requiredRoles) return true

    const request = ctx.switchToHttp().getRequest()
    const user = request.user

    if (!requiredRoles.includes(user.role)) {
      throw new ForbiddenException('Access denied')
    }

    return true
  }
}

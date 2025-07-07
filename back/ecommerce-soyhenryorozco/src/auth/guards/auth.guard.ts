import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Observable } from 'rxjs';
import { Role } from 'src/roles.enum';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    const authHeader = request.headers.authorization;

    if (!authHeader) {
      return false;
    }

    const token = authHeader.split(' ')[1];
    if (!token) {
      return false;
    }
    try {
      const secret = process.env.JWT_SECRET;
      const user = this.jwtService.verify(token, { secret });

      if (user.isAdmin) {
        user.roles = [Role.Admin];
      } else {
        user.roles = [Role.User];
      }

      request.user = user;

      user.exp = new Date(user.exp * 1000);
      user.iat = new Date(user.iat * 1000);

      console.log(user);
      return true;
    } catch (error) {
      return false;
    }
  }
}

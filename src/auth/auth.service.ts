import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { RoleEnum } from '../constants/role.enum';
import { RoleService } from 'src/role/role.service';
import { MailService } from 'src/mail/mail.service';
import { UsersService } from 'src/user/user.service';
import { OrganizationService } from 'src/organization/organization.service';
import {
  Injectable,
  UnauthorizedException,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { verifyEmailDto } from './dto/verify-email.dto';
import { AuthLoginResponse, AuthTokenResponse } from './types/auth-response.type';
import { User } from 'src/typeorm/entities/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private roleService: RoleService,
    private usersService: UsersService,
    private organizationService: OrganizationService,
    private mailService: MailService,
  ) { }

  async register(dto: RegisterDto): Promise<void> {
    const hashedPassword = await bcrypt.hash(dto.password, 10);

    const adminRole = await this.roleService.findByName(RoleEnum.ADMIN);
    if (!adminRole) throw new NotFoundException('Role not found');

    const organization = await this.organizationService.create(dto.name);

    const user = await this.usersService.create({
      ...dto,
      password: hashedPassword,
      organization_id: organization.id,
      role_id: adminRole.id,
    });

    const confirmationToken = this.jwtService.sign(
      { sub: user.id, email: user.email },
      { expiresIn: '1d' }
    );

    // Send email directly (without queue)
    await this.mailService.sendConfirmationEmail(user.email, confirmationToken);
  }

  async verifyEmail(dto: verifyEmailDto): Promise<void> {
    const payload = await this.jwtService.verifyAsync(dto.token);
    const user = await this.usersService.findByEmail(payload.email);

    if (!user)
      throw new NotFoundException('User not found');

    if (user.emailVerifiedAt)
      throw new BadRequestException('Email is already verified');

    await this.usersService.update(user.id, {
      emailVerifiedAt: new Date(),
    });
  }

  async login(dto: LoginDto): Promise<AuthLoginResponse> {
    const user = await this.usersService.findByEmail(dto.email);

    if (!user)
      throw new UnauthorizedException('Invalid credentials');

    if (!user.emailVerifiedAt)
      throw new UnauthorizedException('Email is not verified');

    const isPasswordValid = await bcrypt.compare(dto.password, user.password);
    if (!isPasswordValid)
      throw new UnauthorizedException('Invalid credentials');


    return {
      access_token: this.generateToken(user),
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role?.name,
        organizationId: user.organization_id,
      },
    }
  }

  private generateToken(user: User): AuthTokenResponse {
    const payload = { sub: user.id, email: user.email };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}

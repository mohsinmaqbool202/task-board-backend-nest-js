import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { Messages } from 'src/common/messages';
import { ApiResponse } from 'src/common/types/api-response.type';
import { jsonApiResponse } from 'src/common/helpers/json-api-response.helper';
import { verifyEmailDto } from './dto/verify-email.dto';
import { AcceptInvitationDto } from './dto/accept-invitation.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  async register(@Body() dto: RegisterDto): Promise<ApiResponse> {
    await this.authService.register(dto);
    return jsonApiResponse(true, Messages.verify());
  }

  @Post('verify-email')
  async verifyEmail(@Body() dto: verifyEmailDto): Promise<ApiResponse> {
    await this.authService.verifyEmail(dto);
    return jsonApiResponse(true, Messages.verified());
  }

  @Post('accept-invitation')
  async acceptInvitation(@Body() dto: AcceptInvitationDto): Promise<ApiResponse> {
    await this.authService.acceptInvitation(dto);
    return jsonApiResponse(true, null);
  }

  @Post('login')
  async login(@Body() dto: LoginDto): Promise<ApiResponse> {
    const data = await this.authService.login(dto);
    return jsonApiResponse(true, Messages.loggedIn(), data);
  }
}

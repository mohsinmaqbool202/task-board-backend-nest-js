import { IsString, MinLength,IsNotEmpty } from 'class-validator';
import { Match } from 'src/common/validators/match.decorator';

export class AcceptInvitationDto {
  @IsString()
  @IsNotEmpty()
  token: string;

  @IsString()
  @MinLength(8)
  password: string;

  @IsString()
  @Match('password', { message: 'Passwords do not match' })
  confirm_password: string;
}

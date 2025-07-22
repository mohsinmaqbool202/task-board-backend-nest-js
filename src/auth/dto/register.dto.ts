import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { IsEmailUnique } from 'src/common/validators/is-email-unique.validator';

export class RegisterDto {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsEmail()
    @IsString()
    @IsNotEmpty()
    // @IsEmailUnique({ message: 'Email is already in use' })
    email: string;

    @IsNotEmpty()
    password: string;
}

import { IsOptional, IsString, IsEmail, IsIn } from 'class-validator';

export class UpdateUserDto {
    @IsOptional()
    @IsString()
    name?: string;

    @IsOptional()
    @IsEmail()
    email?: string;

    @IsOptional()
    @IsIn(['manager', 'member'])
    role?: string;
}
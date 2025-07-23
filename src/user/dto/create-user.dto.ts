import { IsNotEmpty, IsString, IsEmail, IsIn } from "class-validator";

export class CreateUserDto {
    @IsNotEmpty()
    @IsString()
    name: string;

    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsNotEmpty()
    @IsIn(['manager', 'member'])
    role: string;
}
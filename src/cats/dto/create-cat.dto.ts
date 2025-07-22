import { IsString, IsNotEmpty } from 'class-validator';

export class CreateCatDto {
    @IsString()
    @IsNotEmpty()
    name: string

    @IsString()
    @IsNotEmpty()
    color: string

    @IsString()
    @IsNotEmpty()
    breed: string
}
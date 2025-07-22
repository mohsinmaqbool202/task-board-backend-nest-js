import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
  registerDecorator,
  ValidationOptions,
} from 'class-validator';
import { Injectable } from '@nestjs/common';
// import { UsersService } from 'src/user/user.service';
import { UsersService } from '../../user/user.service';


@ValidatorConstraint({ async: true })
@Injectable()
export class IsEmailUniqueConstraint implements ValidatorConstraintInterface {
  constructor(private readonly usersService: UsersService) {}

  async validate(email: string): Promise<boolean> {
    const user = await this.usersService.findByEmail(email);
    return !user;
  }

  defaultMessage(args: ValidationArguments) {
    return 'Email "$value" is already taken';
  }
}

export function IsEmailUnique(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName,
      options: validationOptions,
      constraints: [],
      async: true,
      validator: IsEmailUniqueConstraint,
    });
  };
}

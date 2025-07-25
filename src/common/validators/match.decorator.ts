import {
    registerDecorator,
    ValidationOptions,
    ValidationArguments,
  } from 'class-validator';
  
  export function Match(property: string, validationOptions?: ValidationOptions) {
    return function (object: any, propertyName: string) {
      registerDecorator({
        name: 'Match',
        target: object.constructor,
        propertyName,
        constraints: [property],
        options: validationOptions,
        validator: {
          validate(value: any, args: ValidationArguments) {
            const [relatedProperty] = args.constraints;
            return value === (args.object as any)[relatedProperty];
          },
          defaultMessage(args: ValidationArguments) {
            return `${args.property} must match ${args.constraints[0]}`;
          },
        },
      });
    };
  }
  
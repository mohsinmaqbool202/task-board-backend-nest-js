import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { FastifyReply  } from 'fastify';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<FastifyReply>();

    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    let message: string | string[] = 'Something went wrong';

    if (exception instanceof HttpException) {
      const responseBody = exception.getResponse();

      // Validation error (BadRequestException with nested messages)
      if (
        typeof responseBody === 'object' &&
        (responseBody as any).message &&
        Array.isArray((responseBody as any).message)
      ) {
        // Combine all validation messages
        message = (responseBody as any).message;
      } else if (typeof responseBody === 'string') {
        message = responseBody;
      } else if (typeof (responseBody as any).message === 'string') {
        message = (responseBody as any).message;
      }
    } else if (exception.message) {
      message = exception.message;
    }

    response.status(status).send({
      success: false,
      message,
      data: null,
    });
  }
}

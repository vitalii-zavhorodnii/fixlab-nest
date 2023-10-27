import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';
import { Response } from 'express';

import { MongoError } from 'mongodb';

@Catch(MongoError)
export class MongoErrorsFilter implements ExceptionFilter {
  catch(exception: MongoError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const message = this.getErrorMessage(exception);

    response.status(409).json({
      statusCode: 409,
      message: message
    });
  }

  private getErrorMessage(exception: MongoError): string {
    switch (exception.code) {
      case 11000:
        return `Database Conflict: Duplicate key error`;

      case 14388:
        return 'User is not allowed to do action';

      default:
        return 'A database error occurred while processing the request.';
    }
  }
}

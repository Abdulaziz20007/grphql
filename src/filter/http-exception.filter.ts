import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
} from "@nestjs/common";
import { GraphQLError } from "graphql";

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.getArgByIndex(2); // GraphQL context
    const response = exception.getResponse();

    // Extract only necessary fields
    const error = {
      message: response["message"] || exception.message,
      extensions: {
        code: response["statusCode"] || 500, // HTTP status
      },
    };

    // Send the formatted error
    ctx.reply(error);
  }
}

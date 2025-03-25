import { ArgumentsHost, Catch, HttpException } from '@nestjs/common';
import { GqlArgumentsHost, GqlExceptionFilter } from '@nestjs/graphql';
import { QueryFailedError } from 'typeorm';
import { CustomGraphQLError } from './custom-graphql-error';

@Catch()
export class ExceptionFilter implements GqlExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const gqlHost = GqlArgumentsHost.create(host);
    const fieldName = gqlHost.getInfo()?.fieldName;
    const user = gqlHost.getContext().user;

    const logData = {
      fieldName,
      level: exception?.extensions?.level || 'error',
      message: exception.message,
      stack: exception.stack,
      userId: user?.id ?? 'anonymous',
    };

    if (exception instanceof CustomGraphQLError) {
      switch (logData.level) {
        case 'log':
          console.log(logData);
          break;
        case 'warn':
          console.warn(logData);
          break;
        case 'error':
        default:
          console.error(logData);
          break;
      }
      return { ok: false, error: logData.message };
    }

    if (exception instanceof QueryFailedError) {
      console.error('query failed error');
      console.error(logData);
      return {
        ok: false,
        error: '데이터 베이스 오류... 개발자에게 문의 하세요',
      };
    }

    console.error('Unexpected error');
    console.error(logData);
    return {
      ok: false,
      error: '지금은 사용 할 수 없습니다.',
    };
  }
}

import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common'
import { Observable } from 'rxjs'
import { map } from 'rxjs/operators'

export interface Response<T> {
  success: boolean
  statusCode: number
  data: T | null
}

@Injectable()
export class ResponseInterceptor<T> implements NestInterceptor<T, Response<T>> {
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<Response<T>> {
    return next.handle().pipe(
      map((data): Response<T> => {
        const response = context.switchToHttp().getResponse()
        const statusCode = response.statusCode ?? 200

        if (data) {
          return {
            success: true,
            statusCode,
            data,
          } as Response<T>
        } else {
          return {
            success: false,
            statusCode,
            data: null,
          } as Response<T>
        }
      }),
    )
  }
}

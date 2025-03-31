import { createParamDecorator, ExecutionContext } from '@nestjs/common'

export const CreatedBy = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest()
    return {
      ip: request.ip,
      userAgent: request.headers['user-agent'],
      timestamp: new Date(),
      method: request.method,
      path: request.url,
      user: request.user || null,
    }
  },
)

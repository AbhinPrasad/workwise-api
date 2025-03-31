import { registerAs } from '@nestjs/config'

export default registerAs('app', () => ({
  port: process.env.PORT || 8081,
  webUrl: process.env.WEB_APP_URL,
  nodeEnv: process.env.NODE_ENV,
}))

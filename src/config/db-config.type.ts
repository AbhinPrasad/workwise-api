export type DatabaseConfig = {
  url?: string
  host: string
  port: number
  password: string
  database: string
  username?: string
  synchronize?: boolean
  autoLoadEntities?: boolean
}

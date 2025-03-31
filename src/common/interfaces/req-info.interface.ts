interface User {
  id: string
  userName: string
}

interface ReqInfo {
  ip: string
  userAgent: string | undefined
  timestamp: Date
  method: string
  path: string
  user: User | null
}

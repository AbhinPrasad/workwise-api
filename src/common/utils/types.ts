export type DeepPartial<T> = {
  [P in keyof T]?: DeepPartial<T[P]>
}

export type NullableType<T> = T | null

import { createHmac } from 'crypto'

const sha256 = (str: string, key: string) => {
  const h = createHmac('SHA256', key)
  h.update(str)
  return h.digest('base64')
}

export const createSign = (key: string, ts: number) => {
  const str = `${ts}\n${key}`
  const sign = sha256(str, key)
  return encodeURIComponent(sign)
}

import { config } from 'dotenv'
import 'dotenv/config'
import { z } from 'zod'

console.log(process.env.DATABASE_URL)
if (process.env.NODE_ENV === 'test') {
  config({ path: '.env.test', override: true })
} else {
  config()
}

const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'production', 'test']).default('production'),
  DATABASE_URL: z.string(),
  PORT: z.number().default(3333),
})

const _env = envSchema.safeParse(process.env)

if (_env.success === false) {
  console.error('invalid variable enviroment', _env.error.format())

  throw new Error('invalid variebles enviroment')
}

export const env = _env.data

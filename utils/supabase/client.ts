import { createBrowserClient } from '@supabase/ssr'

export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!, // 이제 이 값을 읽을 수 있습니다.
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )
}
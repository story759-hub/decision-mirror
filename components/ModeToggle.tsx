"use client"

import { useTheme } from "next-themes"
import { useEffect, useState } from "react"

export function ModeToggle() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  // 서버 사이드 렌더링 시 발생하는 충돌을 방지하기 위한 코드입니다.
  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <button
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="fixed top-5 right-5 z-50 px-4 py-2 rounded-full font-bold text-xs transition-all
        bg-slate-800 text-white dark:bg-white dark:text-black border border-slate-700 dark:border-slate-200 shadow-lg"
    >
      {theme === "dark" ? "☀️ 화이트 모드" : "🌙 다크 모드"}
    </button>
  )
}
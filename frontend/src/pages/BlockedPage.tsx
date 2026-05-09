import { useEffect } from "react"

export default function BlockedPage() {
  useEffect(() => {
    if (!sessionStorage.getItem("devtools_detected")) {
      window.location.replace("/")
    }
  }, [])

  const goHome = () => {
    sessionStorage.removeItem("devtools_detected")
    window.location.href = "/"
  }

  return (
    <div className="flex min-h-screen items-center justify-center px-4 text-foreground">
      <div className="max-w-sm text-center">
        <h1 className="text-2xl font-semibold">접근이 제한되었습니다</h1>

        <p className="mt-3 text-sm text-muted-foreground">
          비정상적인 접근이 감지되어 페이지 이용이 제한되었습니다.
        </p>

        <button
          type="button"
          onClick={goHome}
          className="mt-6 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground"
        >
          홈으로 돌아가기
        </button>
      </div>
    </div>
  )
}

"use client"

import { Label } from '@radix-ui/react-label'
import React, { useState } from 'react'
import { Button } from './ui/button'
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from './ui/card'
import { Input } from './ui/input'
import { useRouter } from 'next/navigation'
import { useAtom } from 'jotai'
import { persistentEmailAtom } from '@/basic/atom'

function LoginForm() {
  const router = useRouter()
  const [isLogin, setIsLogin] = useState(true)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [name, setName] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const[,setUserEmail] = useAtom(persistentEmailAtom)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()



    setIsLoading(true)
    if (isLogin == true) {
      router.push("/arts")
    } else if (isLogin==false) {
      console.log("resisterを通っています");
      
      setUserEmail(email)
      router.push("/register")
    }


    // try {
    //   if (isLogin) {
    //     // ログイン処理
    //     console.log("ログイン試行:", { email, password })
    //     await new Promise(resolve => setTimeout(resolve, 1000)) // デモ用の遅延
    //     alert("ログインに成功しました！")
    //   } else {
    //     // 新規登録処理
    //     console.log("新規登録:", { name, email, password })
    //     await new Promise(resolve => setTimeout(resolve, 1000)) // デモ用の遅延
    //     alert("アカウントが作成されました！")
    //     setIsLogin(true) // 登録後はログイン画面に切り替え
    //   }
    // } catch (error) {
    //   console.error(isLogin ? "ログインエラー:" : "登録エラー:", error)
    //   alert(isLogin ? "ログインに失敗しました。" : "登録に失敗しました。")
    // } finally {
    //   setIsLoading(false)
    // }
  }

  return (
    <Card className="w-full max-w-md mx-auto">
      {/* トグルボタン */}
      <div className="flex w-full border-b">
        <button
          type="button"
          className={`flex-1 py-3 text-center font-medium transition-colors cursor-pointer ${isLogin ? "border-b-2 border-primary" : "text-muted-foreground"
            }`}
          onClick={() => setIsLogin(true)}
        >
          ログイン
        </button>
        <button
          type="button"
          className={`flex-1 py-3 text-center font-medium transition-colors cursor-pointer ${!isLogin ? "border-b-2 border-primary" : "text-muted-foreground"
            }`}
          onClick={() => setIsLogin(false)}
        >
          新規登録
        </button>
      </div>

      <CardHeader>
        <CardTitle className="text-2xl font-bold text-center">
          {isLogin ? "ログイン" : "新規登録"}
        </CardTitle>
        <CardDescription className="text-center">
          {isLogin
            ? "アカウント情報を入力してログインしてください"
            : "新規登録に使用するメールアドレスを入力してください"}
        </CardDescription>
      </CardHeader>

      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-4">
          {/* 新規登録時のみ名前フィールドを表示 */}
          <div className="space-y-2">
            <Label htmlFor="email">メールアドレス</Label>
            <Input
              id="email"
              // type="email"
              placeholder="example@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              {isLogin && (
                <div className='w-full'>
                  <Label htmlFor="password">パスワード</Label>
                  <Input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                  <a
                    href="#"
                    className="text-sm text-blue-600 hover:text-blue-800"
                  >
                    パスワードをお忘れですか？
                  </a>
                </div>


              )}
            </div>

          </div>

          {/* <div className="space-y-2">

            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div> */}
        </CardContent>

        <CardFooter className="flex flex-col my-10">
          <Button
            type="submit"
            className="w-full space-y-2"
            disabled={isLoading}
          >
            {isLoading
              ? (isLogin ? "ログイン中..." : "登録中...")
              : (isLogin ? "ログイン" : "アカウント作成")}
          </Button>
        </CardFooter>
      </form>
    </Card>
  )
}

export default LoginForm
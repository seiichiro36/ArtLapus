import React from 'react'

function LoginLayout({
    children,
}: Readonly<{children: React.ReactNode}>) {
  return (
    <div>
        {children}
    </div>
  )
}

export default LoginLayout
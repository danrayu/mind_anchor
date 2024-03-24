"use client"
// import { SessionProvider } from 'next-auth/react'
import React from 'react'

function AuthProvider({children}: { children: React.ReactNode}) {
  return (
    <>{children}</>
    // <SessionProvider>{children}</SessionProvider>
  )
}

export default AuthProvider
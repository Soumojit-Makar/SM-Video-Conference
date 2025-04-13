import StreamVideoCProvider from '@/providers/StreamClientProvider'
import React from 'react'

export default function RootLayout  ({children}:{children:React.ReactNode})  {
  return (
    <main>
      <StreamVideoCProvider>
      {children}
      </StreamVideoCProvider>
    </main>
  )
}

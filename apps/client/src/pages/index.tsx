import Image from 'next/image'
import { Inter } from 'next/font/google'
import { Button } from '@repo/ui/button'
import { DialogDemo } from '@repo/ui/dialog'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <>
      <Button/>
      <DialogDemo/>
    </>
  )
}

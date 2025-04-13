
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import MobileNavbar from './MobileNavbar'
import { SignedIn, UserButton } from '@clerk/nextjs'

const Navbar = () => {
  return (
    <nav
    className='flex justify-between w-full fixed z-50 bg-gray-900 px-6 py-4 lg:px-10'
    >
      <Link
      href={'/'}
      className='flex items-center gap-2'
      >
        <Image
        src={"/icons/logo.svg"}
        width={32}
        height={32}
        alt='SM Video Conference'
        className='max-sm:size-10'

        />
        <p
        className='text-[26px] font-extrabold  text-white max-sm:hidden'
        >
          SM Video Conference
        </p>
      </Link>
      <div
      className='flex justify-between gap-5'
      >
         <SignedIn>
              <UserButton />
            </SignedIn>

        <MobileNavbar/>
      </div>
    </nav>
  )
}

export default Navbar
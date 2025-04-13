"use client"
import React from 'react'
import { Sheet, SheetClose, SheetContent, SheetTrigger } from './ui/sheet'
import Image from 'next/image'
import Link from 'next/link'
import { sidebarLinks } from '@/constants'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'

const MobileNavbar = () => {
    const pathname = usePathname();
    return (
        <section
            className='w-full max-w-[164px]'
        >
            <Sheet>
                <SheetTrigger>
                    <Image
                        src={"/icons/hamburger.svg"}
                        width={36}
                        height={36}
                        alt='Open'
                        className='cursor-pointer sm:hidden'
                    />
                </SheetTrigger>
                <SheetContent side='left' className='border-none bg-gray-900'>
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
                        <div>
                            <p
                                className='text-[16px] font-extrabold  text-wrap text-white '
                            >
                                SM Video

                            </p>
                            <p
                                className='text-[16px] font-extrabold  text-wrap text-white '
                            >
                                Conference
                            </p>
                        </div>
                    </Link>
                    <div
                        className='flex h-[calc(100vh-72px)] flex-col w-full justify-between items-center overflow-y-auto'
                    >
                        <SheetClose asChild>
                            <section className='flex h-full flex-col gap-6 pt-16 ml-5 w-full  text-white'>
                                {sidebarLinks.map((link) => {
                                    const isActive = pathname === link.route||pathname.startsWith(`${link.route}/`);
                                    return (
                                        <SheetClose asChild key={link.route}>


                                            <Link
                                                href={link.route}
                                                key={link.label}
                                                className={cn('flex gap-4 items-center p-4 rounded-lg w-full max-w-60', {
                                                    'bg-blue-500': isActive,
                                                })}
                                            >
                                                <Image
                                                    src={link.imgURL}
                                                    alt={link.label}
                                                    width={20}
                                                    height={20}
                                                />
                                                <p
                                                    className='text-lg font-semibold '
                                                >
                                                    {link.label}
                                                </p>
                                            </Link>
                                        </SheetClose>
                                    )
                                })}
                            </section>

                        </SheetClose>
                    </div>
                </SheetContent>
            </Sheet>

        </section>
    )
}

export default MobileNavbar
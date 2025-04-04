'use client'

import React from 'react'
import {
    Sheet,
    SheetContent,
    SheetClose,
    SheetTrigger,
} from "@/components/ui/sheet"
import Image from 'next/image'
import Link from 'next/link'
import { sidebarLinks } from '../constants'
import { cn } from '../lib/utils'
import { usePathname } from 'next/navigation'
import Footer from './Footer'


const MobileNav = ({ user }: MobileNavProps) => {
    const pathname = usePathname();
    return (
        <section className='w-full max-w-[264px]'>
            <Sheet>
                <SheetTrigger>
                    <Image src="/icons/hamburger.svg" width={30} height={30} alt="menu" className="cursor-pointer" />
                </SheetTrigger>
                <SheetContent side='left' className='border-none bg-white'>
                    <Link href='/' className='flex  cursor-pointer items-center gap-1 px-4'>
                        <Image src="/icons/logo.svg" width={34} height={34} alt="NxtGen logo"  />
                        <h1 className='font-bold px-4 text-26 font-robo text-gray-700'>NxtGen</h1>
                    </Link>
                    <div className = 'mobilenav-sheet'>
                        <SheetClose asChild>
                            <nav className='flex flex-col gap-6 h-full pt-16'>
                                {sidebarLinks.map((link) => {
                                    const isActive = pathname === link.route || pathname.startsWith(`${link.route}/`)
                                    return (
                                        <SheetClose asChild key={link.route}>
                                            <Link href={link.route} key={link.label} className={cn('mobilenav-sheet_close ', { 'bg-bank-gradient': isActive })}
                                            >
                                                <div className='relative size-6'>
                                                    <Image width={20} height={20}
                                                    src={link.imgURL} alt={link.label} className={cn({ 'brightness-[3] invert-0': isActive })} />
                                                </div>
                                                <p className={cn('mobilenav-sheet_label', { '!text-white': isActive })}>{link.label}</p>
                                            </Link>
                                        </SheetClose>
                                    )
                                })}
                                USER
                            </nav>
                        </SheetClose>
                        <Footer user={user} type = 'mobile' />
                    </div>
                    

                </SheetContent>
            </Sheet>
            
        </section>
    )
}

export default MobileNav
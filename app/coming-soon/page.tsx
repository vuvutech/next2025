import MainLogo from '@/components/ui/MainLogo'
import { ThemeSwitch } from '@/components/ui/theme-switch'
import Link from 'next/link'
import React from 'react'

export default function Home() {
    return (
        <main className='flex h-screen min-h-screen flex-col items-center justify-center p-4 relative'>
            <div className='absolute top-4  right-3 '>            
                <ThemeSwitch className='pt-2 pl-6' />
                </div>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-1 sm:gap-3 lg:grid-cols-1 lg:gap-8 space-y-2">

                <div>
                    <MainLogo />
                </div>
                <hr className='pt-2' />
                <div className='text-center'>
                    <h1 className="sm:text-4xl  text-2xl font-bold text-gray-900 dark:text-white">
                        Maintenance In Progress!
                    </h1>
                    <p className="text-lg">
                        We are currently working on some updates. <br />
                        Please check back later.
                    </p>
                </div>
                <div>

                    <p className="text-sm wrap-break-word text-center ">
                        <Link href="email:info@costrad.org">info@costrad.org</Link>, <Link href="email:webmaster@costrad.org">webmaster@costrad.org</Link>, <Link href="tel: +233200201334">+233 20 020 1334</Link>
                    </p>
                </div>
            </div>

        </main>
    )
}
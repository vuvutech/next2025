import MainLogo from '@/components/ui/MainLogo';
import { ThemeSwitch } from '@/components/ui/theme-switch';
import { LucideHome } from 'lucide-react';
import Image from "next/image";
import Link from 'next/link';

import { Toaster } from 'sonner';





export default function SignInLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-3 w-full h-dvh relative">
            <div className='absolute top-4 right-5 z-20 '><ThemeSwitch className='pt-2 pl-6' /></div>
            <Link href={'/'} className='absolute top-3 md:top-7 left-3 md:left-7 z-90 ' >
                {/* <LucideAArrowDown className='text-red-500' /> */}
                <LucideHome className='text-current' />
            </Link>
            <div className="sm:flex sm:col-span-2 box-border m-2  justify-center items-center hidden relative">
                <Image priority src={'/images/wallpaper.jpg'} alt="alt" width={1000} height={1000}
                    className="inset-0 absolute "
                    style={
                        {
                            width: "100%",
                            height: "100%",
                        }
                    }
                />
                <div className="z-10">
                    <MainLogo textColor="text-white" logoSize="w-[5.7rem] h-[5.7rem]" />
                </div>
            </div>
            <div className='flex flex-col justify-center items-center h-dvh  '>

                {children}
                <Toaster />
            </div>
        </div>
    );
}
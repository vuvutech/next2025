import React from 'react'
import Content from './Content';
import { bebas } from '@/config/fonts';

export default function Footer() {
  return (
    <div
    className={`${bebas.className} bg-background relative h-auto md:h-[50dvh] md:min-h-screen` }
    style={{ clipPath: "polygon(0% 0, 100% 0%, 100% 100%, 0 100%)" }}
  >
    <div className='md:fixed bottom-0 h-auto md:h-[50dvh] md:min-h-screen w-full'>
      <Content />
    </div>
  </div>
  )
}
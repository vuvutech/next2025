'use client';
import Link from 'next/link';
import React, { useRef } from 'react';
import { affiliateMenu, menuItems, quickLinks, siteConfig } from '../../config/site';
import Marquee from './marquee';

export default function Content() {
  return (
    <div className=' py-8 px-8  h-dvh w-full flex flex-col justify-between'>
      <Nav />
      <Section2 />
    </div>
  );
}

const Section2 = () => {
  const firstText = useRef(null);
  const secondText = useRef(null);
  const slider = useRef(null);
  let xPercent = 0;
  const directionRef = useRef(-1);

  // const animate = useCallback(() => {
  //   if (xPercent < -100) {
  //     xPercent = 0;
  //   } else if (xPercent > 0) {
  //     xPercent = -97;
  //   }
  //   gsap.set(firstText.current, { xPercent: xPercent });
  //   gsap.set(secondText.current, { xPercent: xPercent });
  //   requestAnimationFrame(animate);
  //   xPercent += 0.1 * directionRef.current;
  // }, []);

  // useLayoutEffect(() => {
  //   gsap.registerPlugin(ScrollTrigger);
  //   gsap.to(slider.current, {
  //     scrollTrigger: {
  //       trigger: document.documentElement,
  //       scrub: 0.25,
  //       start: 0,
  //       end: window.innerHeight,
  //       onUpdate: (e) => (directionRef.current = e.direction * -1),
  //     },
  //     x: '-500px',
  //   });
  //   requestAnimationFrame(animate);
  // }, [animate]);

  return (
    <div className='flex justify-between md:items-end relative '>
      <div className='text-[6.5rem] md:text-[12.5rem] md:leading-[0.8] md:mt-10 absolute -left-14 bottom-16 md:bottom-5 '>
        <div className='w-full opacity-20'>
          <Marquee className=' ' speed={70}>
            <p ref={firstText}> COSTrAD &#x2014; </p>
            <p ref={secondText}> COSTrAD &#x2014; </p>
          </Marquee>
        </div>
      </div>
      <div className='w-full md:flex items-center justify-between'>
        <div>
          <Link href={'/'} >
            {siteConfig.year} &copy; copyright &#x2014; All Rights Reserved.
          </Link>
        </div>
        <div className='flex items-center gap-10'>
          <Link target='_blank' href={'https://gh.linkedin.com/in/abu-bako-69a65718'}>LinkedIn</Link>
          <Link target='_blank' href={'https://www.facebook.com/drabubako/'}>Facebook</Link>
          <Link target='_blank' href={'https://twitter.com/drabubako/status/980861107891032065'}>X</Link>
        </div>
      </div>
    </div>
  );
};

const Nav = () => {
  return (
    <div className='flex flex-col h-auto md:flex-row items-start shrink-0 gap-8 md:gap-20 z-50 pt-5 md:pt-[14dvh]'>
      <div className='flex flex-col '>
        <h3 className='mb-2 uppercase md:text-2xl text-gray-500'>About</h3>
        {menuItems.map((item) => (
          <div key={item.number}>
            {/* <span className='absolute -left-8 text-sm text-zinc-600'>
                    {item.number}
                  </span> */}
            <Link
              href={item.href}
              className='group relative  font-light transition-all duration-300'
              >
              {item.label}
              <span className='absolute -bottom-1 left-0 h-0.5 w-0 bg-red-600 transition-all duration-300 group-hover:w-full' />
            </Link>
          </div>
        ))}
      </div>
      <div className='flex flex-col '>
        <h3 className='mb-2 uppercase md:text-2xl text-gray-500'>Affiliations</h3>
        {affiliateMenu.map((item) => (
          <div key={item.label}>
            {/* <span className='absolute -left-8 text-sm text-zinc-600'>
                    {item.number}
                  </span> */}
            <Link
              href={item.href}
              target='_blank'
              className='group relative  font-light transition-all duration-300'
              >
              {item.label}
              <span className='absolute -bottom-1 left-0 h-0.5 w-0 bg-red-600 transition-all duration-300 group-hover:w-full' />
            </Link>
          </div>
        ))}
      </div>
      <div className='flex flex-col '>
        <h3 className='mb-2 uppercase md:text-2xl text-gray-500'>Policies</h3>
        {quickLinks.map((item) => (
          <div key={item.label}>
            {/* <span className='absolute -left-8 text-sm text-zinc-600'>
                    {item.number}
                  </span> */}
            <Link
              href={item.href}
              className='group relative  font-light transition-all duration-300'
              >
              {item.label}
              <span className='absolute -bottom-1 left-0 h-0.5 w-0 bg-red-600 transition-all duration-300 group-hover:w-full' />
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

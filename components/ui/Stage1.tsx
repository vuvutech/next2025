import { specialElite } from '@/config/fonts';
import React from 'react';

type Props = {};

const Stage1 = (props: Props) => {
  return (
    <section
      className={`${specialElite.className} h-auto md:min-h-dvh p-12 md:py-20 pt-24
         flex flex-col justify-center items-center 
     dark:bg-neutral-950  `}>
      <blockquote className='relative max-w-3xl container mx-auto text-xl md:text-4xl '>
        <span className='absolute -left-10 -top-2 w-16 h-16 text-[6.5rem] '>
          “
        </span>
        {/* Your blockquote content here */}
        <div>
          Ask that He will show you how to carry the responsibility of strategic
          voting with the weightiness and gravity it requires for your own good
          and the good of your territory.
        </div>
        <br />


        <cite className='text-xl pt-4'>&mdash; Dr. Abu Bako</cite>
      </blockquote>
      {/* <span className=' p-4  text-[6.5rem] '>”</span> */}
    </section>
  );
};

export default Stage1;

import { bebas } from '@/config/fonts';
import React from 'react';
import Image from 'next/image';


type Props = {};

const Introduction = (props: Props) => {
  return (
    <div className=' container mx-auto max-w-5xl grid grid-cols-1 md:grid-cols-3 gap-4 min-h-screen h-auto space-y-3 p-4  md:p-12 '>
      <div
        className={` md:col-span-1  text-4xl md:text-6xl space-y-2 `}
        data-scroll
        data-scroll-speed={0.1}>
        <div className={' text-gray-500 text-3xl uppercase font-light'}>An Overview</div>
        <div className='w-1/3 text-red-500'>&#8212;</div>
        <div className={`${bebas.className} pb-4 md:leading-[3.7rem] `}>The <br /> Strategic <br /> Voter</div>{' '}
        <Image src={'/images/favicon.png'} width={250} height={250} alt='COSTrAD' className='rounded-3xl md:pr-4' />
      </div>
      <div className='md:col-span-2 md:text-xl space-y-2  '>
        <p>
          This book, <span className='text-red-500'>"COSTrAD Volume 1"</span> by Dr. Abu Bako, is a
          valuable resource that equips readers with the knowledge and skills
          necessary to make informed decisions at the polls. Written by a
          renowned expert in leadership and governance, the book provides
          practical guidance on how to become an active and responsible citizen,
          leveraging one's vote as a tool for co-ruling with God.
        </p>
        <br />
        <p>
          With a focus on transformational governance and leadership, the author
          shares insights from his extensive experience as a mentor,
          inspirational speaker, and writer. Through real-life examples and
          anecdotes, Dr. Bako imparts wisdom on how to navigate complex
          political landscapes, build coalitions, and make a lasting impact in
          one's community. This book is an essential read for anyone seeking to
          deepen their understanding of politics, leadership, and citizenship,
          and to become a more effective force for positive change.
        </p>
      </div>
    </div>
  );
};

export default Introduction;

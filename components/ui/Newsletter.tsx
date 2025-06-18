import { Button, Input } from "@heroui/react";
import { LucideMailCheck } from 'lucide-react';
import React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

type NewsletterFormInputs = {
  firstname: string;
  lastname: string;
  email: string;
};


const Newsletter = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<NewsletterFormInputs>();

  const onSubmit: SubmitHandler<NewsletterFormInputs> = async (data) => {

    const formData = {
      name: `${data.firstname} ${data.lastname}`,
      email: data.email,
    };

    console.log('formData:', formData);

    await toast.promise(
      (async () => {
        const response = await fetch('/api/talk-to-us', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        });

        if (!response.ok) {
          throw new Error('Failed to send message');
        }

        const result = await response.json();
        console.log('Success:', result);

        reset();

        return result;
      })(),
      {
        loading: 'Subscribing for future updates ...',
        success: 'Subscribed successfully!',
        error: 'Failed to subscribe',
      }
    );
  };



  return (
    <section className={` bg-secondary`}>
      <div className=' flex flex-col md:flex-row  justify-center md:flex md:items-center md:justify-between 
    min-h-[500px]  w-full mx-auto py-12 px-4 sm:px-6 md:py-16 md:px-8 z-20 space-y-4  '>

        <div className='grid grid-cols-1 md:grid-cols-3 gap-x-8 md:pt-0 '>
          <div className='md:col-span-2'>
            <p className={` font-display text-4xl font-medium tracking-tighter  sm:text-5xl`}>
              Stay up to date
            </p>
            <p className='mt-4 text-lg tracking-tight '>
              Stay informed about all of our exciting events and never miss a moment by being among the very first to receive important updates, notifications, and announcements directly from us.
            </p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className='space-y-2 md:cols-span-1 ' >

            <div className='grid grid-cols-1 md:grid-cols-2 gap-2'>
              <Input
                variant='bordered'
                autoFocus
                {...register('firstname', { required: true })}
                name='firstname'
                label='First Name'
                // placeholder="Enter your First Name"
                className='md:cols-span-1 cols-span-1'
                isInvalid={errors.firstname ? true : false}
                isClearable
                color='success'
                size='sm'
                radius='sm'

              />

              <Input
                variant='bordered'
                {...register('lastname', { required: true })}
                name='lastname'
                label='Last Name'
                // placeholder="Enter your Last Name"
                className=' md:cols-span-1 cols-span-1'
                isInvalid={errors.lastname ? true : false}
                isClearable
                color='success'
                size='sm'
                radius='sm'

              />
              <Input
                variant='bordered'
                {...register('email', { required: true })}
                name='email'
                label='Email Address'
                // placeholder="Enter your Last Name"
                className='col-span-2'
                isInvalid={errors.email ? true : false}
                isClearable
                color='success'
                size='sm'
                radius='sm'
              />
              <Button
                size='sm'
                radius='sm'
                type='submit'
                variant="flat"
                color='success'
                className='px-6 py-6 font-semibold bg-green-950 text-white  col-span-2 rounded-lg uppercase '>
                <span>Sign up for Updates</span> <span><LucideMailCheck /></span>
              </Button>
            </div>

          </form>

        </div>
      </div>
    </section>
  );
};

export default Newsletter;

import Jumbotron from '@/components/ui/Jumbotron';
import { Toaster } from 'sonner' ;




export default function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
       <div className='block p-2'>
              <Toaster />
              <Jumbotron className='relative py-32 sm:py-48 lg:py-60 select-none bg-gradient-to-t from-blue-100 to-blue-200' heroImage='/images/contact2.jpg' coverPosition='object-bottom' />
           <div className='md:p-4 pt-4 max-w-8xl mx-auto space-y-4'>
                {children}
            </div>
          </div>

  );
}

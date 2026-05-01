import Jumbotron from '@/components/sections/Jumbotron';
import { Toaster } from 'sonner' ;




export default function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
       <div className=''>
              <Toaster />
                {children}

          </div>

  );
}

import Jumbotron from '@/components/ui/Jumbotron';
import { Toaster } from 'sonner';




export default function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
       <div className='block p-2 '>
              <Toaster />
              <Jumbotron />
            <div className='md:p-4 max-w-8xl mx-auto space-y-4'>
                {children}
            </div>
          </div>

  );
}

import Jumbotron from '@/components/ui/Jumbotron';
import { Toaster } from 'react-hot-toast';




export default function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
       <div className='block p-2'>
              <Toaster />
              <Jumbotron />
            <div className=''>
                {children}
            </div>
          </div>

  );
}

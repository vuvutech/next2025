'use client';
import React, { useEffect, useRef } from 'react';
import 'locomotive-scroll/dist/locomotive-scroll.css';
import { useRouter } from 'next/router';

const SmoothScroll: React.FC<React.PropsWithChildren<{}>> = ({ children }) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const locomotiveRef = useRef<any>(null);
  const router = useRouter();

  useEffect(() => {
    if (!containerRef.current) return;

    let scrollInstance: any = null;

    import('locomotive-scroll').then((LocomotiveModule) => {
      const LocomotiveScroll = LocomotiveModule.default;

      scrollInstance = new LocomotiveScroll({
        el: containerRef.current!,
        smooth: true,
      });

      locomotiveRef.current = scrollInstance;

      const routerChangeHandler = () => {
        scrollInstance?.update?.();
      };

      router.events.on('routeChangeComplete', routerChangeHandler);

      // Cleanup
      return () => {
        router.events.off('routeChangeComplete', routerChangeHandler);
        scrollInstance?.destroy();
      };
    });
  }, [router]);

  useEffect(() => {
    locomotiveRef.current?.update?.();
  }, [children]);

  return (
    <div className="app-container" data-scroll-container ref={containerRef}>
      {children}
    </div>
  );
};

export default SmoothScroll;

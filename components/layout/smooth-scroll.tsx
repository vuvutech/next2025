'use client';
import React, { useEffect, useRef } from 'react';
import 'locomotive-scroll/dist/locomotive-scroll.css';
import { usePathname } from 'next/navigation';

const SmoothScroll: React.FC<React.PropsWithChildren<{}>> = ({ children }) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const locomotiveRef = useRef<any>(null);
  const pathname = usePathname();

  useEffect(() => {
    if (!containerRef.current) return;

    let scrollInstance: any = null;

    import('locomotive-scroll').then((LocomotiveModule) => {
      const LocomotiveScroll = LocomotiveModule.default;

      scrollInstance = new LocomotiveScroll({
        el: containerRef.current!,
        smooth: true,
      } as any);

      locomotiveRef.current = scrollInstance;

      // Cleanup
      return () => {
        scrollInstance?.destroy();
      };
    });
  }, [pathname]);

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

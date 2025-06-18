// hooks/useDevice.ts
import { useMediaQuery } from 'react-responsive';

export const useDevice = () => {
  const isPortrait = useMediaQuery({ query: '(orientation: portrait)' });
  const isMobileWidth = useMediaQuery({ maxWidth: 1100 });
  const isMobile = isMobileWidth || isPortrait;
  const isDesktop = !isMobile;

  return { isMobile, isDesktop };
};

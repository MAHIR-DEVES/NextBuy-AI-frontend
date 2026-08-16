'use client';

import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';

const MetaPageView = () => {
  const pathname = usePathname();
  const isFirstRender = useRef(true);

  useEffect(() => {
    // Initial PageView is already tracked by MetaPixel
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    if (typeof window === 'undefined' || !window.fbq) {
      return;
    }

    window.fbq('track', 'PageView');
  }, [pathname]);

  return null;
};

export default MetaPageView;

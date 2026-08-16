'use client';

import { useEffect, useRef } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';

const MetaPageView = () => {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const isFirstRender = useRef(true);

  const searchParamsString = searchParams.toString();

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
  }, [pathname, searchParamsString]);

  return null;
};

export default MetaPageView;

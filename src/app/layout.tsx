import type { Metadata } from 'next';
import { Geist } from 'next/font/google';
import './globals.css';
import { cn } from '@/lib/utils';
import { Toaster } from 'sonner';
import MetaPixel from '@/components/layouts/shared/analytics/MetaPixel';
import MetaPageView from '@/components/layouts/shared/analytics/MetaPageView';

const geist = Geist({ subsets: ['latin'], variable: '--font-sans' });

export const metadata: Metadata = {
  title: 'Sera Place ',
  description:
    'Sera Place is a growing online shopping platform offering quality products at competitive prices, from fashion and footwear to electronics and more.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={cn('h-full', 'antialiased', 'font-sans', geist.variable)}
    >
      <body className="min-h-full flex flex-col">
        <MetaPixel />
        <MetaPageView />
        {children} {/*  Toast Provider */}
        <Toaster richColors position="top-right" />
      </body>
    </html>
  );
}

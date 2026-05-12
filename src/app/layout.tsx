import type { Metadata } from 'next';
import { Geist } from 'next/font/google';
import './globals.css';
import { cn } from '@/lib/utils';
import { Toaster } from 'sonner';

const geist = Geist({ subsets: ['latin'], variable: '--font-sans' });

export const metadata: Metadata = {
  title: 'NextBuy AI',
  description: 'E-commerce built with Next.js',
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
        {children} {/*  Toast Provider */}
        <Toaster richColors position="top-right" />
      </body>
    </html>
  );
}

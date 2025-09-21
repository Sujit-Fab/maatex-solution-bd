import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { cn } from '../lib/utils';
import { SiteHeader } from '../components/site/header';
import { SiteFooter } from '../components/site/footer';
import { Toaster } from '../components/ui/toaster';
import { WhatsAppButton } from '../components/site/whatsapp-button';

const inter = Inter({ subsets: ['latin'], variable: '--font-sans' });

export const metadata: Metadata = {
  title: 'Maatex Solution BD - Quality Fabrics, Trusted Supply',
  description: 'Your reliable partner in fabrics. We supply a wide variety of high-quality textiles for retailers, designers, and manufacturers.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body
        className={cn(
          'min-h-screen bg-background font-body antialiased',
          inter.variable
        )}
      >
        <div className="relative flex min-h-screen flex-col">
          <SiteHeader />
          <main className="flex-1">{children}</main>
          <SiteFooter />
          <WhatsAppButton />
        </div>
        <Toaster />
      </body>
    </html>
  );
}

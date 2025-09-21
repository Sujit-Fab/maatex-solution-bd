'use client';

import Link from 'next/link';
import { Menu, Package2 } from 'lucide-react';
import { usePathname } from 'next/navigation';

import { Button } from '../ui/button';
import { Sheet, SheetContent, SheetTrigger } from '../ui/sheet';
import { cn } from '../../lib/utils';
import { useIsMobile } from '../../hooks/use-mobile';

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About Us' },
  { href: '/fabrics', label: 'Fabrics' },
  { href: '/wholesale', label: 'Wholesale' },
  { href: '/gallery', label: 'Gallery' },
  { href: '/contact', label: 'Contact Us' },
];

export function SiteHeader() {
  const pathname = usePathname();
  const isMobile = useIsMobile();

  const renderNavLinks = (className?: string) => (
    <nav className={cn('flex items-center space-x-4 lg:space-x-6', className)}>
      {navLinks.map(({ href, label }) => (
        <Link
          key={href}
          href={href}
          className={cn(
            'text-sm font-medium transition-colors hover:text-primary',
            pathname === href ? 'text-primary' : 'text-muted-foreground'
          )}
        >
          {label}
        </Link>
      ))}
    </nav>
  );

  if (isMobile) {
    return (
      <header className="sticky top-0 z-40 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon" className="shrink-0">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle navigation menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left">
            <Link
              href="/"
              className="mb-6 flex items-center gap-2 text-lg font-semibold"
            >
              <Package2 className="h-6 w-6 text-primary" />
              <span>Maatex Solution BD</span>
            </Link>
            {renderNavLinks('flex-col space-x-0 space-y-4 items-start')}
          </SheetContent>
        </Sheet>
        <Link
          href="/"
          className="flex items-center gap-2 text-lg font-semibold md:text-base"
        >
          <Package2 className="h-6 w-6 text-primary" />
          <span className="sr-only">Maatex Solution BD</span>
        </Link>
      </header>
    );
  }

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background">
      <div className="container flex h-16 items-center space-x-4 sm:justify-between sm:space-x-0">
        <div className="flex gap-6 md:gap-10">
          <Link href="/" className="flex items-center space-x-2">
            <Package2 className="h-6 w-6 text-primary" />
            <span className="inline-block font-bold">Maatex Solution BD</span>
          </Link>
          {renderNavLinks('hidden md:flex')}
        </div>
      </div>
    </header>
  );
}

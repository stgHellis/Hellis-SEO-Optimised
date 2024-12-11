'use client';

import { usePathname } from 'next/navigation';
import { Navbar } from '@/components/shared/navbar';

export function NavigationProvider() {
  const pathname = usePathname();
  const isDashboard = pathname.startsWith('/dashboard');

  if (isDashboard) {
    return null;
  }

  return <Navbar />;
}

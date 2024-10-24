'use client';

import { Button } from '@/components/ui/button';
import clsx from 'clsx';
import { Heart, LayoutDashboard, List, User } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function DashboardSidebar({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <nav className="hidden sm:flex min-h-svh border rounded-s-xl p-6 flex-col gap-4">
      {[
        {
          icon: LayoutDashboard,
          label: 'Dashboard',
          href: '/dashboard',
        },
        {
          icon: Heart,
          label: 'Liked',
          href: '/dashboard/liked',
        },
        {
          icon: List,
          label: 'Collections',
          href: '/dashboard/collections',
        },
        {
          icon: User,
          label: 'Profile',
          href: '/dashboard/profile',
        },
      ].map((item) => (
        <Link href={item.href} key={item.label}>
          <Button
            className={clsx(
              'w-full flex justify-start border-2 border-zinc-950 shadow-[4px_4px_0_0_rgba(0,0,0,1)] bg-zinc-50 hover:bg-teal-500',
              pathname === item.href && 'bg-teal-500'
            )}
            variant="secondary"
          >
            <item.icon size={16} className="mr-2" />
            <span>{item.label}</span>
          </Button>
        </Link>
      ))}
      <div className="grow flex items-end">{children}</div>
    </nav>
  );
}

'use client';

import { Button } from '@/components/ui/button';
import clsx from 'clsx';
import { Boxes, LayoutDashboard, User } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function DashboardSidebar({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <nav className="max-w-[20%] min-h-svh border rounded-s-xl p-6 flex flex-col gap-4">
      {[
        {
          icon: LayoutDashboard,
          label: 'Dashboard',
          href: '/dashboard',
        },
        {
          icon: User,
          label: 'Profile',
          href: '/profile',
        },
        {
          icon: Boxes,
          label: 'Collections',
          href: '/collections',
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

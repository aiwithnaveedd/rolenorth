'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { LogOut, Upload, FileText, Home, CreditCard } from 'lucide-react';
import { createClient } from '@/lib/supabase/client';
import { LogoutButton } from '@/components/dashboard/LogoutButton';

const navItems = [
  { href: '/dashboard', label: 'Dashboard', icon: Home },
  { href: '/upload', label: 'New Analysis', icon: Upload },
  { href: '/reports', label: 'My Reports', icon: FileText },
  { href: '/pricing', label: 'Pricing', icon: CreditCard },
];

export function DashboardSidebar({ user }: { user: any }) {
  const pathname = usePathname();
  const supabase = createClient();


  return (
    <div className="w-72 border-r bg-white dark:bg-zinc-900 flex flex-col">
      <div className="p-6 border-b">
        <h1 className="text-2xl font-bold tracking-tight">RoleNorth</h1>
        <p className="text-xs text-zinc-500 mt-1">AI Career Intelligence</p>
      </div>

      <nav className="flex-1 p-4">
        <div className="space-y-1">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                  isActive
                    ? 'bg-black text-white dark:bg-white dark:text-black'
                    : 'hover:bg-zinc-100 dark:hover:bg-zinc-800'
                }`}
              >
                <item.icon size={20} />
                {item.label}
              </Link>
            );
          })}
        </div>
      </nav>

      <div className="p-4 border-t">
        <div className="flex items-center gap-3 mb-4 px-2">
          <div className="w-9 h-9 bg-zinc-200 dark:bg-zinc-700 rounded-full"></div>
          <div>
            <p className="font-medium text-sm">{user.user_metadata?.full_name || user.email}</p>
            <p className="text-xs text-zinc-500 truncate">{user.email}</p>
          </div>
        </div>

        <LogoutButton />
      </div>
    </div>
  );
}
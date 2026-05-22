"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { LogOut, Upload, FileText, Home, CreditCard } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { LogoutButton } from "./LogoutButton";

const navItems = [
  { href: "/dashboard", label: "Dashboard", icon: Home },
  { href: "/upload", label: "New Analysis", icon: Upload },
  { href: "/reports", label: "My Reports", icon: FileText },
  { href: "/pricing", label: "Pricing", icon: CreditCard },
];

export function DashboardSidebar({ user }: { user: any }) {
  const pathname = usePathname();
  const supabase = createClient();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    window.location.href = "/login";
  };

  return (
    <div className="w-72 border-r bg-white dark:bg-zinc-300 flex flex-col shadow-sm">
      <div className="p-6 border-b bg-gradient-to-r from-blue-50 to-purple-50 dark:from-zinc-800 dark:to-zinc-900">
        <h1 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          RoleNorth
        </h1>
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
                className={`flex items-center gap-3 px-4 py-3.5 rounded-2xl text-sm font-medium transition-all ${
                  isActive
                    ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-md"
                    : "hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-700 dark:text-zinc-300"
                }`}
              >
                <item.icon size={20} />
                {item.label}
              </Link>
            );
          })}
        </div>
      </nav>

      <div className="p-4 border-t mt-auto">
        <div className="flex items-center gap-3 mb-4 px-3 py-2">
          <div className="w-9 h-9 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-medium">
            {user?.user_metadata?.full_name?.[0] || "U"}
          </div>
          <div className="truncate">
            <p className="font-medium text-sm">
              {user?.user_metadata?.full_name || "User"}
            </p>
            <p className="text-xs text-zinc-500 truncate">{user?.email}</p>
          </div>
        </div>

        <LogoutButton />
      </div>
    </div>
  );
}
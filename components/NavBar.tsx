'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, User, LogOut, Shield } from 'lucide-react';
import { createClient } from '@/lib/supabase/client';
import { toast } from 'sonner';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const supabase = createClient();

  // Hide navbar on individual report pages
  if (pathname?.startsWith('/reports/') && pathname.length > 8) {
    return null;
  }

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    window.location.href = '/login';
  };

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <nav className="bg-white border-b sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="font-bold text-2xl tracking-tight">
            RoleNorth
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            <Link href="/dashboard" className="hover:text-black transition">Dashboard</Link>
            <Link href="/pricing" className="hover:text-black transition">Pricing</Link>
            <Link href="/dashboard/subscription" className="hover:text-black transition">Subscription</Link>
            <Link href="/admin" className="flex items-center gap-1 hover:text-black transition">
              <Shield className="w-4 h-4" /> Admin
            </Link>
            
            <button onClick={handleSignOut} className="flex items-center gap-2 text-sm">
              <LogOut className="w-4 h-4" /> Logout
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button onClick={toggleMenu} className="md:hidden">
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden py-6 border-t bg-white space-y-4">
            <Link href="/dashboard" onClick={toggleMenu} className="block py-2">Dashboard</Link>
            <Link href="/pricing" onClick={toggleMenu} className="block py-2">Pricing</Link>
            <Link href="/dashboard/subscription" onClick={toggleMenu} className="block py-2">Subscription</Link>
            <Link href="/admin" onClick={toggleMenu} className="block py-2 flex items-center gap-2">
              <Shield className="w-4 h-4" /> Admin
            </Link>
            <button onClick={() => { handleSignOut(); toggleMenu(); }} className="block w-full text-left py-2">
              Logout
            </button>
          </div>
        )}
      </div>
    </nav>
  );
}
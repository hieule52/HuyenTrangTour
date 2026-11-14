'use client';

import React, { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import AdminSidebar from './AdminSidebar';
import AdminHeader from './AdminHeader';
import AdminMobileBottomNav from './AdminMobileBottomNav';

interface AdminShellProps {
  user?: {
    name?: string | null;
    email?: string | null;
    image?: string | null;
    role?: string;
  };
  children: React.ReactNode;
}

export default function AdminShell({ user, children }: AdminShellProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  // Automatically close mobile drawer when route changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  // Prevent background scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen]);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans flex flex-col">
      {/* 1. Desktop Fixed Sidebar (visible only on lg screens >= 1024px) */}
      <div className="hidden lg:flex w-72 flex-col fixed inset-y-0 left-0 z-40">
        <AdminSidebar user={user} />
      </div>

      {/* 2. Mobile Drawer (visible only when opened on mobile < 1024px) */}
      {isMobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-50 flex">
          {/* Backdrop overlay */}
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity animate-fade-in"
            onClick={() => setIsMobileMenuOpen(false)}
            aria-hidden="true"
          />

          {/* Slide-over Panel */}
          <div className="relative flex-1 flex flex-col max-w-xs w-full bg-brand-900 shadow-2xl z-10 animate-fade-right">
            <AdminSidebar user={user} onClose={() => setIsMobileMenuOpen(false)} />
          </div>
        </div>
      )}

      {/* 3. Main Content Area */}
      <div className="lg:pl-72 flex flex-col flex-1 min-w-0">
        {/* Sticky Header with Hamburger button on mobile */}
        <AdminHeader
          user={user}
          onOpenMobileMenu={() => setIsMobileMenuOpen(true)}
        />

        {/* Main Body - Extra bottom padding on mobile for Mobile Bottom Nav */}
        <main className="flex-1 p-3 sm:p-6 lg:p-8 pb-24 lg:pb-8 overflow-y-auto">
          {children}
        </main>

        {/* 4. Mobile Bottom Navigation Bar (fixed at bottom on mobile) */}
        <AdminMobileBottomNav />
      </div>
    </div>
  );
}

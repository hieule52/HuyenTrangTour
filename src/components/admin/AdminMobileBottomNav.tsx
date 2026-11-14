'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  Car,
  MessageSquare,
  Users,
  Settings,
} from 'lucide-react';

const BOTTOM_NAV_ITEMS = [
  { href: '/admin', label: 'Tổng quan', icon: LayoutDashboard },
  { href: '/admin/services', label: 'Tuyến xe', icon: Car },
  { href: '/admin/reviews', label: 'Đánh giá', icon: MessageSquare },
  { href: '/admin/customers', label: 'Khách', icon: Users },
  { href: '/admin/settings', label: 'Cài đặt', icon: Settings },
];

export default function AdminMobileBottomNav() {
  const pathname = usePathname();

  return (
    <nav
      className="lg:hidden fixed bottom-0 left-0 right-0 z-30 bg-white/95 backdrop-blur-md border-t border-gray-200/90 shadow-[0_-4px_20px_rgba(0,0,0,0.06)] px-2 py-1.5 pb-[calc(0.5rem+env(safe-area-inset-bottom,0px))]"
      aria-label="Admin Mobile Navigation"
    >
      <div className="flex items-center justify-around max-w-lg mx-auto">
        {BOTTOM_NAV_ITEMS.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex flex-col items-center justify-center py-1 px-2.5 rounded-xl transition-all relative ${
                isActive
                  ? 'text-brand-900 font-bold'
                  : 'text-gray-500 hover:text-brand-700 font-medium'
              }`}
            >
              <div
                className={`p-1 rounded-lg transition-all ${
                  isActive
                    ? 'bg-gold-500/15 text-gold-600 scale-110'
                    : 'text-gray-400'
                }`}
              >
                <Icon className="w-5 h-5" />
              </div>
              <span className={`text-[10px] tracking-tight mt-0.5 ${isActive ? 'text-brand-900 font-extrabold' : 'text-gray-500'}`}>
                {item.label}
              </span>
              {isActive && (
                <span className="w-1.5 h-1.5 rounded-full bg-gold-500 absolute -bottom-1" />
              )}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}


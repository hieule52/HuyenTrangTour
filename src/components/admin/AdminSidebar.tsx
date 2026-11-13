'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { signOut } from 'next-auth/react';
import {
  LayoutDashboard,
  Car,
  MessageSquare,
  Users,
  Settings,
  LogOut,
  ExternalLink,
  ShieldCheck,
} from 'lucide-react';
import Image from 'next/image';

interface AdminSidebarProps {
  user?: {
    name?: string | null;
    email?: string | null;
    image?: string | null;
    role?: string;
  };
}

const NAV_ITEMS = [
  { href: '/admin', label: 'Tổng Quan', icon: LayoutDashboard },
  { href: '/admin/services', label: 'Quản Lý Dịch Vụ', icon: Car },
  { href: '/admin/reviews', label: 'Quản Lý Đánh Giá', icon: MessageSquare },
  { href: '/admin/customers', label: 'Khách Hàng', icon: Users },
  { href: '/admin/settings', label: 'Cấu Hình Hệ Thống', icon: Settings },
];

export default function AdminSidebar({ user }: AdminSidebarProps) {
  const pathname = usePathname();

  return (
    <aside className="w-full lg:w-72 bg-brand-900 text-white flex flex-col flex-shrink-0 lg:min-h-screen border-r border-brand-800">
      {/* Brand Header */}
      <div className="p-6 border-b border-brand-800/80 flex items-center justify-between">
        <Link href="/admin" className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-gold-600 to-gold-400 text-brand-900 flex items-center justify-center font-bold shadow-md">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <div>
            <h2 className="font-heading font-bold text-base tracking-wide text-white">
              HUYỀN TRANG
            </h2>
            <p className="text-[10px] tracking-widest uppercase font-bold text-gold-400">
              Admin Dashboard
            </p>
          </div>
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-1.5 overflow-y-auto">
        <div className="px-3 py-2 text-[11px] font-semibold uppercase tracking-wider text-gray-400">
          Quản Trị Hệ Thống
        </div>

        {NAV_ITEMS.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-3.5 py-3 rounded-xl text-sm font-semibold transition-all ${
                isActive
                  ? 'bg-gradient-to-r from-gold-500 to-gold-600 text-brand-950 shadow-md font-bold'
                  : 'text-gray-300 hover:text-white hover:bg-brand-800/60'
              }`}
            >
              <Icon className={`w-5 h-5 ${isActive ? 'text-brand-950' : 'text-gold-400'}`} />
              <span>{item.label}</span>
            </Link>
          );
        })}

        <div className="pt-6 px-3 py-2 text-[11px] font-semibold uppercase tracking-wider text-gray-400">
          Tiện Ích
        </div>

        <Link
          href="/vi"
          target="_blank"
          className="flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold text-gray-300 hover:text-white hover:bg-brand-800/60 transition-colors"
        >
          <span className="flex items-center gap-2.5">
            <ExternalLink className="w-4 h-4 text-emerald-400" />
            <span>Xem Website Khách Hàng</span>
          </span>
          <span className="text-[10px] bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded-full border border-emerald-500/30">
            Live
          </span>
        </Link>
      </nav>

      {/* User Footer */}
      <div className="p-4 border-t border-brand-800/80 bg-brand-950/40">
        <div className="flex items-center gap-3 mb-3">
          {user?.image ? (
            <Image
              src={user.image}
              alt={user.name || 'Admin'}
              width={38}
              height={38}
              className="w-9 h-9 rounded-full object-cover border border-gold-400/40"
            />
          ) : (
            <div className="w-9 h-9 rounded-full bg-brand-700 text-white font-bold flex items-center justify-center text-xs border border-gold-400/40">
              {user?.name?.charAt(0) || 'A'}
            </div>
          )}
          <div className="flex-1 min-w-0">
            <p className="text-xs font-bold text-white truncate">{user?.name || 'Administrator'}</p>
            <p className="text-[10px] text-gray-400 truncate">{user?.email}</p>
          </div>
          <span className="text-[9px] font-extrabold uppercase px-1.5 py-0.5 rounded bg-gold-500/20 text-gold-300 border border-gold-400/30">
            ADMIN
          </span>
        </div>

        <button
          onClick={() => signOut({ callbackUrl: '/admin/login' })}
          className="w-full flex items-center justify-center gap-2 py-2 px-3 rounded-lg text-xs font-semibold text-red-300 hover:text-white hover:bg-red-500/20 border border-red-500/20 transition-all"
        >
          <LogOut className="w-3.5 h-3.5" />
          <span>Đăng xuất</span>
        </button>
      </div>
    </aside>
  );
}

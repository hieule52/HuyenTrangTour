'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, ExternalLink, Bell, Shield, Sparkles } from 'lucide-react';

interface AdminHeaderProps {
  user?: {
    name?: string | null;
    email?: string | null;
    image?: string | null;
  };
}

const PAGE_TITLES: Record<string, { title: string; subtitle: string }> = {
  '/admin': { title: 'Bảng Điều Khiển Tổng Quan', subtitle: 'Thống kê dịch vụ, đánh giá và hoạt động' },
  '/admin/services': { title: 'Quản Lý Tuyến Xe & Dịch Vụ', subtitle: 'Thêm, sửa giá, ẩn hiện và cấu hình 13 tuyến' },
  '/admin/reviews': { title: 'Kiểm Duyệt Đánh Giá', subtitle: 'Phê duyệt, từ chối và quản lý review khách hàng' },
  '/admin/customers': { title: 'Danh Sách Khách Hàng', subtitle: 'Tài khoản khách hàng đăng nhập Google' },
  '/admin/settings': { title: 'Cấu Hình Hệ Thống', subtitle: 'Hotline, địa chỉ, kênh liên hệ và thương hiệu' },
};

export default function AdminHeader({ user }: AdminHeaderProps) {
  const pathname = usePathname();
  const current = PAGE_TITLES[pathname] || { title: 'Quản Trị', subtitle: 'Hệ thống quản trị HUYỀN TRANG TOUR' };

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-30 px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between shadow-xs">
      <div>
        <h1 className="text-lg md:text-xl font-bold font-sans text-brand-900 tracking-tight">
          {current.title}
        </h1>
        <p className="text-xs text-gray-500 mt-0.5 hidden sm:block">
          {current.subtitle}
        </p>
      </div>

      <div className="flex items-center gap-3">
        {/* Live web link */}
        <Link
          href="/vi"
          target="_blank"
          className="hidden sm:inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg border border-gray-200 text-xs font-semibold text-gray-700 hover:text-brand-600 hover:border-brand-300 transition-colors bg-gray-50/50"
        >
          <ExternalLink className="w-3.5 h-3.5" />
          <span>Xem Website</span>
        </Link>

        {/* Status tag */}
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs font-semibold">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span className="hidden md:inline">Hệ Thống Hoạt Động</span>
          <span className="md:hidden">Online</span>
        </div>
      </div>
    </header>
  );
}


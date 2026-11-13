'use client';

import React, { useState } from 'react';
import { signIn, useSession } from 'next-auth/react';
import { ShieldCheck, LogIn, AlertTriangle, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function AdminLoginPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  if (status === 'authenticated') {
    if (session?.user?.role === 'ADMIN') {
      router.push('/admin');
      return null;
    }
  }

  const isAccessDenied = status === 'authenticated' && session?.user?.role !== 'ADMIN';

  return (
    <div className="min-h-screen bg-gradient-to-br from-brand-900 via-brand-800 to-slate-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white/95 backdrop-blur-md rounded-3xl p-8 shadow-2xl border border-white/20">
        {/* Brand header */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 rounded-2xl bg-brand-500 text-gold-400 flex items-center justify-center mx-auto mb-4 shadow-lg">
            <ShieldCheck className="w-10 h-10" />
          </div>
          <h1 className="text-2xl font-bold font-heading text-brand-900">
            HUYỀN TRANG TOUR
          </h1>
          <p className="text-xs uppercase tracking-widest text-gold-600 font-bold mt-1">
            Admin Management Portal
          </p>
        </div>

        {isAccessDenied ? (
          <div className="p-4 bg-amber-50 border border-amber-200 rounded-2xl mb-6 text-center">
            <div className="w-10 h-10 rounded-full bg-amber-100 text-amber-600 flex items-center justify-center mx-auto mb-2">
              <AlertTriangle className="w-6 h-6" />
            </div>
            <h3 className="text-sm font-bold text-amber-900">Quyền truy cập bị từ chối</h3>
            <p className="text-xs text-amber-700 mt-1">
              Tài khoản <strong>{session?.user?.email}</strong> không thuộc danh sách quản trị viên (ADMIN). Vui lòng đăng nhập bằng email được cấp quyền.
            </p>
            <button
              onClick={() => signIn('google')}
              className="mt-3 text-xs font-bold text-brand-600 underline hover:text-brand-800"
            >
              Đổi tài khoản khác
            </button>
          </div>
        ) : (
          <p className="text-sm text-gray-600 text-center mb-6">
            Đăng nhập bằng tài khoản Google quản trị để truy cập bảng điều khiển hệ thống.
          </p>
        )}

        <button
          type="button"
          disabled={isLoading}
          onClick={() => {
            setIsLoading(true);
            signIn('google', { callbackUrl: '/admin' });
          }}
          className="w-full py-3.5 px-6 rounded-xl bg-white border border-gray-300 shadow-md hover:shadow-lg hover:bg-gray-50 text-gray-800 font-bold text-sm transition-all flex items-center justify-center gap-3 disabled:opacity-50"
        >
          <svg className="w-5 h-5" viewBox="0 0 24 24">
            <path
              fill="#4285F4"
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
            />
            <path
              fill="#34A853"
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
            />
            <path
              fill="#FBBC05"
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
            />
            <path
              fill="#EA4335"
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
            />
          </svg>
          <span>Đăng nhập với Google</span>
        </button>

        <div className="mt-8 text-center border-t border-gray-100 pt-6">
          <Link
            href="/vi"
            className="inline-flex items-center gap-2 text-xs font-semibold text-gray-500 hover:text-brand-600 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Quay lại trang chủ HUYỀN TRANG TOUR</span>
          </Link>
        </div>
      </div>
    </div>
  );
}


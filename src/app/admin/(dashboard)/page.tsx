'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import {
  Car,
  MessageSquare,
  Clock,
  CheckCircle,
  Star,
  Users,
  ArrowRight,
  Sparkles,
  TrendingUp,
  AlertCircle,
  RefreshCw,
} from 'lucide-react';

interface DashboardStats {
  totalServices: number;
  activeServices: number;
  totalReviews: number;
  pendingReviews: number;
  approvedReviews: number;
  rejectedReviews: number;
  averageRating: number;
  totalCustomers: number;
  starCounts: Record<number, number>;
  recentReviews: any[];
}

export default function AdminDashboardPage() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchStats = async () => {
    try {
      setIsLoading(true);
      const res = await fetch('/api/admin/stats');
      const data = await res.json();
      if (data.success) {
        setStats(data.stats);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  const handleUpdateStatus = async (reviewId: string, newStatus: 'APPROVED' | 'REJECTED') => {
    try {
      const res = await fetch('/api/admin/reviews', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: reviewId, status: newStatus }),
      });
      if (res.ok) {
        fetchStats();
      }
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="space-y-6 sm:space-y-8 max-w-7xl mx-auto">
      {/* Top Welcome Card */}
      <div className="bg-gradient-to-r from-brand-900 via-brand-800 to-brand-700 rounded-2xl sm:rounded-3xl p-5 sm:p-8 text-white shadow-xl relative overflow-hidden">
        <div className="absolute -right-10 -bottom-10 w-64 h-64 bg-gold-500/10 rounded-full blur-2xl pointer-events-none" />
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-5 sm:gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gold-400/20 text-gold-300 text-xs font-bold mb-3 border border-gold-400/30">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Huyền Trang Tour Management System</span>
            </div>
            <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold font-sans text-white">
              Chào mừng trở lại, Ban Quản Trị!
            </h2>
            <p className="text-xs sm:text-sm text-blue-100/80 mt-1 max-w-2xl leading-relaxed">
              Theo dõi hiệu suất vận hành, kiểm duyệt đánh giá khách hàng và quản lý toàn bộ 13 tuyến xe riêng miền Trung.
            </p>
          </div>

          <div className="flex items-center gap-2.5 sm:gap-3 flex-wrap sm:flex-nowrap">
            <button
              onClick={fetchStats}
              disabled={isLoading}
              className="inline-flex items-center gap-2 px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold transition-all border border-white/10 active:scale-95"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isLoading ? 'animate-spin' : ''}`} />
              <span>Làm mới</span>
            </button>
            <Link
              href="/admin/reviews"
              className="inline-flex items-center gap-2 px-4 sm:px-5 py-2 sm:py-2.5 rounded-xl bg-gradient-to-r from-gold-500 to-gold-600 hover:from-gold-400 hover:to-gold-500 text-brand-950 text-xs font-bold shadow-md transition-all active:scale-95"
            >
              <span>Duyệt đánh giá</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>

      {/* 4 Primary Stats Cards (2 cols on mobile, 4 cols on lg) */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-5">
        {/* Total Services */}
        <div className="bg-white rounded-2xl p-4 sm:p-6 shadow-sm border border-gray-100 hover:shadow-md transition-all flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-gray-500">Tuyến Xe</span>
              <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-blue-50 text-brand-600 flex items-center justify-center">
                <Car className="w-4 h-4 sm:w-5 sm:h-5" />
              </div>
            </div>
            <div className="text-2xl sm:text-3xl font-extrabold text-brand-900 font-sans">
              {stats?.totalServices ?? 13}
            </div>
          </div>
          <p className="text-[11px] sm:text-xs text-emerald-600 font-semibold mt-2 flex items-center gap-1 truncate">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 flex-shrink-0" />
            <span>{stats?.activeServices ?? 13} tuyến đang chạy</span>
          </p>
        </div>

        {/* Pending Reviews */}
        <div className="bg-white rounded-2xl p-4 sm:p-6 shadow-sm border border-gray-100 hover:shadow-md transition-all flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-gray-500">Chờ Duyệt</span>
              <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
                <Clock className="w-4 h-4 sm:w-5 sm:h-5" />
              </div>
            </div>
            <div className="text-2xl sm:text-3xl font-extrabold text-amber-600 font-sans">
              {stats?.pendingReviews ?? 0}
            </div>
          </div>
          <p className="text-[11px] sm:text-xs text-gray-500 mt-2 truncate">
            Tổng {stats?.totalReviews ?? 0} đánh giá
          </p>
        </div>

        {/* Average Rating */}
        <div className="bg-white rounded-2xl p-4 sm:p-6 shadow-sm border border-gray-100 hover:shadow-md transition-all flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-gray-500">Điểm ĐG</span>
              <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-gold-50 text-gold-600 flex items-center justify-center">
                <Star className="w-4 h-4 sm:w-5 sm:h-5 fill-current" />
              </div>
            </div>
            <div className="text-2xl sm:text-3xl font-extrabold text-brand-900 font-sans flex items-center gap-1.5">
              <span>{stats?.averageRating?.toFixed(1) ?? '5.0'}</span>
              <span className="text-xs sm:text-sm text-gold-500 font-normal">/ 5.0</span>
            </div>
          </div>
          <p className="text-[11px] sm:text-xs text-emerald-600 font-semibold mt-2 truncate">
            {stats?.approvedReviews ?? 0} đã duyệt
          </p>
        </div>

        {/* Total Customers */}
        <div className="bg-white rounded-2xl p-4 sm:p-6 shadow-sm border border-gray-100 hover:shadow-md transition-all flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-gray-500">Khách Hàng</span>
              <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
                <Users className="w-4 h-4 sm:w-5 sm:h-5" />
              </div>
            </div>
            <div className="text-2xl sm:text-3xl font-extrabold text-brand-900 font-sans">
              {stats?.totalCustomers ?? 0}
            </div>
          </div>
          <p className="text-[11px] sm:text-xs text-gray-500 mt-2 truncate">
            Tài khoản Google
          </p>
        </div>
      </div>

      {/* Middle Grid: Star distribution & Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Rating Breakdown */}
        <div className="lg:col-span-5 bg-white rounded-3xl p-6 sm:p-7 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-base font-bold text-brand-900 font-sans">
              Phân Bố Số Sao Đánh Giá
            </h3>
            <span className="text-xs text-gray-400 font-medium">Đã duyệt</span>
          </div>

          <div className="space-y-3.5">
            {[5, 4, 3, 2, 1].map((star) => {
              const count = stats?.starCounts?.[star] ?? 0;
              const total = stats?.approvedReviews || 1;
              const pct = stats?.approvedReviews ? (count / total) * 100 : 0;

              return (
                <div key={star} className="flex items-center gap-3 text-xs">
                  <span className="w-12 font-bold text-gray-700 flex items-center gap-1">
                    {star} <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                  </span>
                  <div className="flex-1 h-3 bg-gray-100 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-gold-400 to-amber-500 rounded-full transition-all duration-500"
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                  <span className="w-10 text-right font-bold text-gray-600">{count}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Quick Links & Tips */}
        <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-7 shadow-sm border border-gray-100 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-base font-bold text-brand-900 font-sans">
                Lối Tắt Quản Trị Nhanh
              </h3>
              <span className="text-xs font-semibold text-gold-600 bg-gold-50 px-2.5 py-1 rounded-md">
                Admin Shortcuts
              </span>
            </div>
            <p className="text-xs text-gray-500 mb-6">
              Các tính năng quản lý cốt lõi được cấu hình đồng bộ trực tiếp ra website chính.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Link
                href="/admin/services"
                className="p-4 rounded-2xl border border-gray-100 hover:border-brand-300 hover:shadow-md transition-all bg-gray-50/50 group"
              >
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-8 h-8 rounded-lg bg-brand-50 text-brand-600 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Car className="w-4 h-4" />
                  </div>
                  <span className="text-sm font-bold text-brand-900 group-hover:text-brand-600">
                    Chỉnh sửa giá 13 tuyến xe
                  </span>
                </div>
                <p className="text-xs text-gray-500">
                  Cập nhật giá xe 4 chỗ và 7 chỗ, điểm khởi hành, mô tả dịch vụ.
                </p>
              </Link>

              <Link
                href="/admin/reviews"
                className="p-4 rounded-2xl border border-gray-100 hover:border-gold-300 hover:shadow-md transition-all bg-gray-50/50 group"
              >
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-8 h-8 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <MessageSquare className="w-4 h-4" />
                  </div>
                  <span className="text-sm font-bold text-brand-900 group-hover:text-amber-600">
                    Kiểm duyệt đánh giá
                  </span>
                </div>
                <p className="text-xs text-gray-500">
                  Phê duyệt hình ảnh và bình luận khách hàng gửi qua Google.
                </p>
              </Link>

              <Link
                href="/admin/customers"
                className="p-4 rounded-2xl border border-gray-100 hover:border-indigo-300 hover:shadow-md transition-all bg-gray-50/50 group"
              >
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Users className="w-4 h-4" />
                  </div>
                  <span className="text-sm font-bold text-brand-900 group-hover:text-indigo-600">
                    Danh sách khách hàng
                  </span>
                </div>
                <p className="text-xs text-gray-500">
                  Xem thông tin khách hàng, số lượng đánh giá đã để lại.
                </p>
              </Link>

              <Link
                href="/admin/settings"
                className="p-4 rounded-2xl border border-gray-100 hover:border-emerald-300 hover:shadow-md transition-all bg-gray-50/50 group"
              >
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <TrendingUp className="w-4 h-4" />
                  </div>
                  <span className="text-sm font-bold text-brand-900 group-hover:text-emerald-600">
                    Cấu hình Hotline & Liên hệ
                  </span>
                </div>
                <p className="text-xs text-gray-500">
                  Cập nhật số điện thoại, Zalo, địa chỉ văn phòng 147 Phùng Quán.
                </p>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Reviews Table */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-gray-100">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-base sm:text-lg font-bold text-brand-900 font-sans">
              Đánh Giá Mới Nhận Gần Đây
            </h3>
            <p className="text-xs text-gray-500 mt-0.5">
              Các đánh giá từ khách hàng cần xem xét hoặc vừa gửi lên
            </p>
          </div>
          <Link
            href="/admin/reviews"
            className="text-xs font-bold text-brand-600 hover:text-brand-800 flex items-center gap-1"
          >
            <span>Xem tất cả</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {stats?.recentReviews && stats.recentReviews.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-gray-50 text-gray-600 uppercase tracking-wider font-semibold border-b border-gray-100">
                <tr>
                  <th className="py-3 px-4">Khách hàng</th>
                  <th className="py-3 px-4">Tuyến xe</th>
                  <th className="py-3 px-4">Số sao</th>
                  <th className="py-3 px-4">Nội dung</th>
                  <th className="py-3 px-4">Trạng thái</th>
                  <th className="py-3 px-4 text-right">Thao tác</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {stats.recentReviews.map((rev) => (
                  <tr key={rev.id} className="hover:bg-gray-50/80 transition-colors">
                    <td className="py-3.5 px-4 font-semibold text-gray-900">
                      {rev.user?.name || rev.user?.email}
                    </td>
                    <td className="py-3.5 px-4 text-gray-600">
                      {rev.service?.title || 'Dịch vụ chung'}
                    </td>
                    <td className="py-3.5 px-4">
                      <span className="flex items-center gap-1 font-bold text-amber-500">
                        {rev.rating} <Star className="w-3.5 h-3.5 fill-current" />
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-gray-700 max-w-xs truncate">
                      "{rev.content}"
                    </td>
                    <td className="py-3.5 px-4">
                      <span
                        className={`inline-flex px-2 py-0.5 rounded-full text-[10px] font-bold ${
                          rev.status === 'APPROVED'
                            ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                            : rev.status === 'REJECTED'
                            ? 'bg-red-50 text-red-700 border border-red-200'
                            : 'bg-amber-50 text-amber-700 border border-amber-200'
                        }`}
                      >
                        {rev.status}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-right space-x-1">
                      {rev.status === 'PENDING' && (
                        <>
                          <button
                            onClick={() => handleUpdateStatus(rev.id, 'APPROVED')}
                            className="px-2.5 py-1 rounded bg-emerald-600 text-white font-bold hover:bg-emerald-700 transition"
                          >
                            Duyệt
                          </button>
                          <button
                            onClick={() => handleUpdateStatus(rev.id, 'REJECTED')}
                            className="px-2.5 py-1 rounded bg-red-600 text-white font-bold hover:bg-red-700 transition"
                          >
                            Từ chối
                          </button>
                        </>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="py-8 text-center text-gray-400 text-xs">
            Chưa có đánh giá mới nào gần đây.
          </div>
        )}
      </div>
    </div>
  );
}


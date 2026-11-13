'use client';

import React, { useEffect, useState } from 'react';
import {
  MessageSquare,
  CheckCircle,
  XCircle,
  Trash2,
  Star,
  Search,
  Filter,
  Eye,
  X,
  AlertCircle,
  Calendar,
  Globe,
  Loader2,
} from 'lucide-react';
import Image from 'next/image';

interface ReviewAdminItem {
  id: string;
  rating: number;
  content: string;
  locale: string;
  status: 'PENDING' | 'APPROVED' | 'REJECTED';
  createdAt: string;
  user: {
    id: string;
    name: string | null;
    email: string;
    image: string | null;
  };
  service?: {
    id: string;
    title: string;
    slug: string;
  } | null;
  images: Array<{
    id: string;
    imageUrl: string;
  }>;
}

export default function AdminReviewsPage() {
  const [reviews, setReviews] = useState<ReviewAdminItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [ratingFilter, setRatingFilter] = useState('ALL');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedReview, setSelectedReview] = useState<ReviewAdminItem | null>(null);
  const [lightboxImg, setLightboxImg] = useState<string | null>(null);

  const fetchReviews = async () => {
    try {
      setIsLoading(true);
      const url = new URL('/api/admin/reviews', window.location.origin);
      if (statusFilter !== 'ALL') url.searchParams.set('status', statusFilter);
      if (ratingFilter !== 'ALL') url.searchParams.set('rating', ratingFilter);

      const res = await fetch(url.toString());
      const data = await res.json();
      if (data.success) {
        setReviews(data.reviews);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, [statusFilter, ratingFilter]);

  const handleUpdateStatus = async (id: string, newStatus: 'APPROVED' | 'REJECTED' | 'PENDING') => {
    try {
      const res = await fetch('/api/admin/reviews', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, status: newStatus }),
      });
      if (res.ok) {
        fetchReviews();
        if (selectedReview?.id === id) {
          setSelectedReview((prev) => (prev ? { ...prev, status: newStatus } : null));
        }
      }
    } catch (e) {
      console.error(e);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Bạn có chắc chắn muốn xóa đánh giá này khỏi hệ thống?')) return;
    try {
      const res = await fetch(`/api/admin/reviews?id=${id}`, { method: 'DELETE' });
      if (res.ok) {
        fetchReviews();
        setSelectedReview(null);
      }
    } catch (e) {
      console.error(e);
    }
  };

  const filtered = reviews.filter((r) => {
    const matchSearch =
      r.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
      r.user?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      r.user?.email.toLowerCase().includes(searchTerm.toLowerCase());
    return matchSearch;
  });

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Top Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
        <div>
          <h2 className="text-xl font-bold font-heading text-brand-900">
            Quản Lý & Kiểm Duyệt Đánh Giá ({reviews.length})
          </h2>
          <p className="text-xs text-gray-500 mt-0.5">
            Chỉ những đánh giá được phê duyệt (APPROVED) mới hiển thị công khai trên website
          </p>
        </div>

        {/* Status quick tabs */}
        <div className="flex items-center gap-1.5 p-1 bg-gray-100 rounded-xl">
          {['ALL', 'PENDING', 'APPROVED', 'REJECTED'].map((st) => (
            <button
              key={st}
              onClick={() => setStatusFilter(st)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition ${
                statusFilter === st
                  ? 'bg-white text-brand-900 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              {st === 'ALL' && 'Tất cả'}
              {st === 'PENDING' && 'Chờ duyệt'}
              {st === 'APPROVED' && 'Đã duyệt'}
              {st === 'REJECTED' && 'Từ chối'}
            </button>
          ))}
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-center gap-3">
        <div className="relative flex-1 w-full">
          <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Tìm theo tên khách hàng, email hoặc nội dung đánh giá..."
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 text-xs text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-brand-500 bg-white"
          />
        </div>

        <select
          value={ratingFilter}
          onChange={(e) => setRatingFilter(e.target.value)}
          className="w-full sm:w-auto px-4 py-2.5 rounded-xl border border-gray-200 text-xs text-gray-700 bg-white focus:outline-none focus:ring-2 focus:ring-brand-500 font-medium"
        >
          <option value="ALL">Tất cả số sao</option>
          <option value="5">5 Sao (Tuyệt vời)</option>
          <option value="4">4 Sao (Hài lòng)</option>
          <option value="3">3 Sao (Bình thường)</option>
          <option value="2">2 Sao (Chưa tốt)</option>
          <option value="1">1 Sao (Không hài lòng)</option>
        </select>
      </div>

      {/* Table */}
      <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
        {isLoading ? (
          <div className="py-20 flex flex-col items-center justify-center text-gray-400">
            <Loader2 className="w-8 h-8 animate-spin text-brand-500 mb-2" />
            <span className="text-xs">Đang tải danh sách đánh giá...</span>
          </div>
        ) : filtered.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-gray-50 text-gray-600 uppercase tracking-wider font-semibold border-b border-gray-100">
                <tr>
                  <th className="py-3.5 px-4">Khách hàng</th>
                  <th className="py-3.5 px-4">Tuyến xe</th>
                  <th className="py-3.5 px-4">Số sao</th>
                  <th className="py-3.5 px-4">Nội dung</th>
                  <th className="py-3.5 px-4 text-center">Ảnh</th>
                  <th className="py-3.5 px-4 text-center">Trạng thái</th>
                  <th className="py-3.5 px-4 text-right">Hành động</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filtered.map((rev) => (
                  <tr key={rev.id} className="hover:bg-gray-50/80 transition-colors">
                    {/* User */}
                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-2.5">
                        {rev.user.image ? (
                          <img
                            src={rev.user.image}
                            alt=""
                            className="w-8 h-8 rounded-full object-cover border border-gray-200"
                          />
                        ) : (
                          <div className="w-8 h-8 rounded-full bg-brand-600 text-white font-bold flex items-center justify-center text-xs">
                            {rev.user.name?.charAt(0) || 'U'}
                          </div>
                        )}
                        <div>
                          <div className="font-bold text-gray-900">{rev.user.name || 'Khách Google'}</div>
                          <div className="text-[10px] text-gray-400">{rev.user.email}</div>
                        </div>
                      </div>
                    </td>

                    {/* Service */}
                    <td className="py-3.5 px-4 font-semibold text-brand-800">
                      {rev.service?.title || 'Dịch vụ chung'}
                    </td>

                    {/* Rating */}
                    <td className="py-3.5 px-4">
                      <span className="inline-flex items-center gap-1 font-extrabold text-amber-500 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                        {rev.rating} <Star className="w-3.5 h-3.5 fill-current" />
                      </span>
                    </td>

                    {/* Content snippet */}
                    <td className="py-3.5 px-4 text-gray-700 max-w-sm">
                      <p className="line-clamp-2">"{rev.content}"</p>
                      <span className="text-[10px] text-gray-400 flex items-center gap-1 mt-1">
                        <Calendar className="w-3 h-3" />
                        {new Date(rev.createdAt).toLocaleString('vi-VN')}
                        <span className="ml-2 uppercase px-1.5 py-0.2 rounded bg-gray-100 font-mono text-[9px]">
                          {rev.locale}
                        </span>
                      </span>
                    </td>

                    {/* Images count */}
                    <td className="py-3.5 px-4 text-center">
                      {rev.images && rev.images.length > 0 ? (
                        <button
                          onClick={() => setSelectedReview(rev)}
                          className="px-2 py-1 bg-blue-50 text-brand-600 rounded-md font-bold text-[11px] hover:bg-blue-100 transition"
                        >
                          {rev.images.length} ảnh
                        </button>
                      ) : (
                        <span className="text-gray-300">-</span>
                      )}
                    </td>

                    {/* Status */}
                    <td className="py-3.5 px-4 text-center">
                      <span
                        className={`inline-flex px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                          rev.status === 'APPROVED'
                            ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                            : rev.status === 'REJECTED'
                            ? 'bg-red-50 text-red-700 border border-red-200'
                            : 'bg-amber-50 text-amber-700 border border-amber-200 animate-pulse'
                        }`}
                      >
                        {rev.status === 'APPROVED' && 'ĐÃ DUYỆT'}
                        {rev.status === 'REJECTED' && 'TỪ CHỐI'}
                        {rev.status === 'PENDING' && 'CHỜ DUYỆT'}
                      </span>
                    </td>

                    {/* Action buttons */}
                    <td className="py-3.5 px-4 text-right space-x-1.5">
                      <button
                        onClick={() => setSelectedReview(rev)}
                        title="Xem chi tiết"
                        className="p-1.5 rounded-lg text-gray-600 hover:bg-gray-100 transition"
                      >
                        <Eye className="w-4 h-4" />
                      </button>

                      {rev.status !== 'APPROVED' && (
                        <button
                          onClick={() => handleUpdateStatus(rev.id, 'APPROVED')}
                          title="Duyệt đăng công khai"
                          className="px-2 py-1 rounded bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-[11px] transition shadow-xs"
                        >
                          Duyệt
                        </button>
                      )}

                      {rev.status !== 'REJECTED' && (
                        <button
                          onClick={() => handleUpdateStatus(rev.id, 'REJECTED')}
                          title="Từ chối hiển thị"
                          className="px-2 py-1 rounded bg-amber-600 hover:bg-amber-700 text-white font-bold text-[11px] transition shadow-xs"
                        >
                          Từ chối
                        </button>
                      )}

                      <button
                        onClick={() => handleDelete(rev.id)}
                        title="Xóa đánh giá"
                        className="p-1.5 rounded-lg text-red-500 hover:bg-red-50 transition"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="py-16 text-center text-gray-400 text-xs">
            Không tìm thấy đánh giá nào.
          </div>
        )}
      </div>

      {/* Review Detail Modal */}
      {selectedReview && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-xl w-full p-6 sm:p-8 shadow-2xl border border-gray-100 my-8">
            <div className="flex items-center justify-between pb-4 border-b border-gray-100 mb-6">
              <h3 className="text-base font-bold font-heading text-brand-900">
                Chi Tiết Đánh Giá Của Khách Hàng
              </h3>
              <button
                onClick={() => setSelectedReview(null)}
                className="p-1 rounded-full text-gray-400 hover:text-gray-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Customer profile */}
            <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-2xl border border-gray-100 mb-4">
              {selectedReview.user.image ? (
                <img
                  src={selectedReview.user.image}
                  alt=""
                  className="w-11 h-11 rounded-full object-cover"
                />
              ) : (
                <div className="w-11 h-11 rounded-full bg-brand-600 text-white font-bold flex items-center justify-center">
                  {selectedReview.user.name?.charAt(0) || 'U'}
                </div>
              )}
              <div>
                <h4 className="font-bold text-gray-900 text-sm">{selectedReview.user.name}</h4>
                <p className="text-xs text-gray-500">{selectedReview.user.email}</p>
                <p className="text-[11px] text-gray-400 mt-0.5">
                  Gửi lúc: {new Date(selectedReview.createdAt).toLocaleString('vi-VN')} • Ngôn ngữ: {selectedReview.locale.toUpperCase()}
                </p>
              </div>
            </div>

            {/* Service & Rating */}
            <div className="flex items-center justify-between p-3 bg-amber-50/50 rounded-xl border border-amber-100 mb-4 text-xs">
              <div>
                <span className="text-gray-500">Tuyến xe: </span>
                <span className="font-bold text-brand-900">{selectedReview.service?.title || 'Dịch vụ chung'}</span>
              </div>
              <div className="flex items-center gap-1 font-bold text-amber-500">
                {selectedReview.rating} <Star className="w-4 h-4 fill-current" />
              </div>
            </div>

            {/* Content text */}
            <div className="mb-5">
              <div className="text-xs font-bold text-gray-600 mb-1">Nội dung đánh giá:</div>
              <div className="p-4 bg-gray-50 rounded-xl text-sm text-gray-800 leading-relaxed italic border border-gray-100">
                "{selectedReview.content}"
              </div>
            </div>

            {/* Attached Photos */}
            {selectedReview.images && selectedReview.images.length > 0 && (
              <div className="mb-6">
                <div className="text-xs font-bold text-gray-600 mb-2">
                  Hình ảnh đính kèm ({selectedReview.images.length} ảnh):
                </div>
                <div className="grid grid-cols-4 gap-2">
                  {selectedReview.images.map((img) => (
                    <button
                      key={img.id}
                      type="button"
                      onClick={() => setLightboxImg(img.imageUrl)}
                      className="relative aspect-square rounded-xl overflow-hidden border border-gray-200 hover:opacity-90 hover:scale-105 transition-all"
                    >
                      <img src={img.imageUrl} alt="" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Action buttons */}
            <div className="flex items-center justify-between pt-4 border-t border-gray-100">
              <button
                onClick={() => handleDelete(selectedReview.id)}
                className="px-4 py-2 rounded-xl text-xs font-bold text-red-600 hover:bg-red-50 border border-red-200"
              >
                Xóa đánh giá
              </button>

              <div className="flex items-center gap-2">
                {selectedReview.status !== 'REJECTED' && (
                  <button
                    onClick={() => handleUpdateStatus(selectedReview.id, 'REJECTED')}
                    className="px-4 py-2 rounded-xl bg-amber-600 text-white text-xs font-bold hover:bg-amber-700 shadow-sm"
                  >
                    Từ chối
                  </button>
                )}
                {selectedReview.status !== 'APPROVED' && (
                  <button
                    onClick={() => handleUpdateStatus(selectedReview.id, 'APPROVED')}
                    className="px-5 py-2 rounded-xl bg-emerald-600 text-white text-xs font-bold hover:bg-emerald-700 shadow-sm"
                  >
                    Phê duyệt hiển thị
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Lightbox Modal */}
      {lightboxImg && (
        <div
          className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4 backdrop-blur-sm"
          onClick={() => setLightboxImg(null)}
        >
          <div className="relative max-w-4xl max-h-[90vh]">
            <img src={lightboxImg} alt="Photo" className="max-w-full max-h-[85vh] rounded-2xl shadow-2xl object-contain" />
            <button
              onClick={() => setLightboxImg(null)}
              className="absolute top-2 right-2 p-2 bg-black/60 rounded-full text-white hover:bg-red-600"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}


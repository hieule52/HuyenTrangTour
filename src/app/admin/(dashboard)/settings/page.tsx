'use client';

import React, { useEffect, useState } from 'react';
import {
  Settings,
  Phone,
  Mail,
  MapPin,
  Save,
  CheckCircle2,
  AlertCircle,
  Loader2,
  ShieldAlert,
} from 'lucide-react';

interface SystemSettingsData {
  brandName: string;
  hotline1: string;
  hotline2: string;
  email: string;
  address: string;
  zaloUrl: string;
  messengerUrl: string;
  whatsappUrl: string;
}

export default function AdminSettingsPage() {
  const [formData, setFormData] = useState<SystemSettingsData>({
    brandName: 'HUYỀN TRANG TOUR',
    hotline1: '0364 483 597',
    hotline2: '0935 637 431',
    email: 'Lehuutienquoc97@gmail.com',
    address: '147 Phùng Quán, thành phố Huế',
    zaloUrl: 'https://zalo.me/0364483597',
    messengerUrl: 'https://m.me/huyentrangtour',
    whatsappUrl: 'https://wa.me/84364483597',
  });

  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        setIsLoading(true);
        const res = await fetch('/api/admin/settings');
        const data = await res.json();
        if (data.success && data.setting) {
          setFormData({
            brandName: data.setting.brandName || 'HUYỀN TRANG TOUR',
            hotline1: data.setting.hotline1 || '0364 483 597',
            hotline2: data.setting.hotline2 || '0935 637 431',
            email: data.setting.email || 'Lehuutienquoc97@gmail.com',
            address: data.setting.address || '147 Phùng Quán, thành phố Huế',
            zaloUrl: data.setting.zaloUrl || 'https://zalo.me/0364483597',
            messengerUrl: data.setting.messengerUrl || 'https://m.me/huyentrangtour',
            whatsappUrl: data.setting.whatsappUrl || 'https://wa.me/84364483597',
          });
        }
      } catch (e) {
        console.error(e);
      } finally {
        setIsLoading(false);
      }
    };

    fetchSettings();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setSuccessMsg('');
    setErrorMsg('');

    try {
      const res = await fetch('/api/admin/settings', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.message || 'Lỗi khi lưu cấu hình');
      }

      setSuccessMsg('Đã cập nhật cấu hình hệ thống thành công!');
      setTimeout(() => setSuccessMsg(''), 4000);
    } catch (err: any) {
      setErrorMsg(err.message || 'Có lỗi xảy ra, vui lòng thử lại.');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Top Header */}
      <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold font-heading text-brand-900">
            Cấu Hình Hệ Thống & Thông Tin Liên Hệ
          </h2>
          <p className="text-xs text-gray-500 mt-0.5">
            Cập nhật hotline, email, địa chỉ và các kênh liên lạc trên toàn website
          </p>
        </div>

        <div className="w-10 h-10 rounded-2xl bg-gold-50 text-gold-600 flex items-center justify-center">
          <Settings className="w-5 h-5" />
        </div>
      </div>

      {/* Security alert notice */}
      <div className="p-4 bg-amber-50 border border-amber-200 rounded-2xl flex items-start gap-3 text-xs text-amber-800">
        <ShieldAlert className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
        <div>
          <span className="font-bold">Lưu ý bảo mật:</span> Các biến môi trường nhạy cảm như{' '}
          <code className="bg-amber-100 px-1 py-0.5 rounded font-mono">AUTH_SECRET</code>,{' '}
          <code className="bg-amber-100 px-1 py-0.5 rounded font-mono">DATABASE_URL</code>,{' '}
          <code className="bg-amber-100 px-1 py-0.5 rounded font-mono">CLOUDINARY_API_SECRET</code>{' '}
          được bảo vệ an toàn trong file cấu hình máy chủ, không được phép chỉnh sửa qua giao diện web.
        </div>
      </div>

      {isLoading ? (
        <div className="py-20 flex flex-col items-center justify-center text-gray-400">
          <Loader2 className="w-8 h-8 animate-spin text-brand-500 mb-2" />
          <span className="text-xs">Đang tải cấu hình...</span>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-gray-100 space-y-6">
          {successMsg && (
            <div className="p-3.5 bg-emerald-50 border border-emerald-200 rounded-xl text-xs text-emerald-700 flex items-center gap-2 font-semibold">
              <CheckCircle2 className="w-4 h-4 flex-shrink-0 text-emerald-600" />
              <span>{successMsg}</span>
            </div>
          )}

          {errorMsg && (
            <div className="p-3.5 bg-red-50 border border-red-200 rounded-xl text-xs text-red-600 flex items-center gap-2 font-semibold">
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          {/* Brand Info */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-brand-900 border-b border-gray-100 pb-2 mb-4">
              1. Thông Tin Thương Hiệu
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Tên thương hiệu</label>
                <input
                  type="text"
                  value={formData.brandName}
                  onChange={(e) => setFormData({ ...formData, brandName: e.target.value })}
                  required
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-xs focus:ring-2 focus:ring-brand-500 outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Email nhận thông báo đặt xe</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-xs focus:ring-2 focus:ring-brand-500 outline-none"
                />
              </div>
            </div>
          </div>

          {/* Hotline & Address */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-brand-900 border-b border-gray-100 pb-2 mb-4">
              2. Đường Dây Nóng & Văn Phòng
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Hotline 1 (Chính)</label>
                <input
                  type="text"
                  value={formData.hotline1}
                  onChange={(e) => setFormData({ ...formData, hotline1: e.target.value })}
                  required
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-xs focus:ring-2 focus:ring-brand-500 outline-none font-bold text-brand-900"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Hotline 2 (Phụ)</label>
                <input
                  type="text"
                  value={formData.hotline2}
                  onChange={(e) => setFormData({ ...formData, hotline2: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-xs focus:ring-2 focus:ring-brand-500 outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">Địa chỉ văn phòng</label>
              <input
                type="text"
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                required
                className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-xs focus:ring-2 focus:ring-brand-500 outline-none"
              />
            </div>
          </div>

          {/* Social Channels */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-brand-900 border-b border-gray-100 pb-2 mb-4">
              3. Kênh Kết Nối Khách Hàng Trực Tuyến
            </h3>
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Đường dẫn Zalo Chat</label>
                <input
                  type="url"
                  value={formData.zaloUrl}
                  onChange={(e) => setFormData({ ...formData, zaloUrl: e.target.value })}
                  placeholder="https://zalo.me/0364483597"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-xs focus:ring-2 focus:ring-brand-500 outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Đường dẫn WhatsApp</label>
                <input
                  type="url"
                  value={formData.whatsappUrl}
                  onChange={(e) => setFormData({ ...formData, whatsappUrl: e.target.value })}
                  placeholder="https://wa.me/84364483597"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-xs focus:ring-2 focus:ring-brand-500 outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Đường dẫn Facebook Messenger</label>
                <input
                  type="url"
                  value={formData.messengerUrl}
                  onChange={(e) => setFormData({ ...formData, messengerUrl: e.target.value })}
                  placeholder="https://m.me/huyentrangtour"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-xs focus:ring-2 focus:ring-brand-500 outline-none"
                />
              </div>
            </div>
          </div>

          {/* Submit CTA */}
          <div className="pt-4 border-t border-gray-100 flex justify-end">
            <button
              type="submit"
              disabled={isSaving}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-gold-500 to-gold-600 text-brand-950 font-bold text-xs shadow-md hover:shadow-lg hover:from-gold-400 hover:to-gold-500 transition-all active:scale-95 disabled:opacity-50"
            >
              {isSaving ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Đang lưu...</span>
                </>
              ) : (
                <>
                  <Save className="w-4 h-4" />
                  <span>Lưu Cấu Hình Hệ Thống</span>
                </>
              )}
            </button>
          </div>
        </form>
      )}
    </div>
  );
}


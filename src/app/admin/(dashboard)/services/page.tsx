'use client';

import React, { useEffect, useState, useRef } from 'react';
import {
  Car,
  Plus,
  Search,
  Edit,
  Trash2,
  CheckCircle,
  XCircle,
  Star,
  Loader2,
  X,
  AlertCircle,
  Eye,
  EyeOff,
  Upload,
  Image as ImageIcon,
  Check,
} from 'lucide-react';
import Image from 'next/image';

interface ServiceItem {
  id: string;
  slug: string;
  title: string;
  description?: string;
  departure?: string;
  destination?: string;
  priceVnd: number;
  priceUsd: number;
  price4SeatsVnd?: number;
  price4SeatsUsd?: number;
  price7SeatsVnd?: number;
  price7SeatsUsd?: number;
  image: string;
  category: string;
  vehicle?: string;
  isActive: boolean;
  isFeatured: boolean;
  _count?: { reviews: number };
}

const PRESET_IMAGES = [
  { label: 'Huế – Đà Nẵng', url: '/images/hue-danang.jpg' },
  { label: 'Huế – Hội An', url: '/images/hue-hoian.jpg' },
  { label: 'Huế – Phong Nha', url: '/images/hue-phongnha.jpg' },
  { label: 'Sân bay Phú Bài', url: '/images/hue-sanbay.jpg' },
  { label: 'City Tour 3 điểm', url: '/images/hue3diem.jpg' },
  { label: 'City Tour 4 điểm', url: '/images/Hue4diem.jpg' },
  { label: 'Huế – Quảng Trị', url: '/images/hue-quangtri.jpg' },
  { label: 'Đà Nẵng – Phong Nha', url: '/images/danang-phongnha.jpg' },
  { label: 'Xe & Khách', url: '/images/sefiWithKhach.jpg' },
  { label: 'Đón tại Khách sạn', url: '/images/xeDuaDonTaiKhachSan.jpg' },
];

export default function AdminServicesPage() {
  const [services, setServices] = useState<ServiceItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('ALL');
  const [editingService, setEditingService] = useState<ServiceItem | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);

  // Image upload states
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [selectedImage, setSelectedImage] = useState<string>('/images/hue-danang.jpg');
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const [uploadMessage, setUploadMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      setUploadMessage({ type: 'error', text: 'Chỉ chấp nhận file hình ảnh (JPG, PNG, WEBP).' });
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      setUploadMessage({ type: 'error', text: 'Dung lượng ảnh tối đa 10MB.' });
      return;
    }

    try {
      setIsUploading(true);
      setUploadMessage(null);

      const formData = new FormData();
      formData.append('file', file);

      const res = await fetch('/api/admin/upload', {
        method: 'POST',
        body: formData,
      });

      const data = await res.json();
      if (data.success && data.url) {
        setSelectedImage(data.url);
        setUploadMessage({ type: 'success', text: 'Tải ảnh lên thành công!' });
      } else {
        setUploadMessage({ type: 'error', text: data.message || 'Lỗi khi tải ảnh lên.' });
      }
    } catch (err: any) {
      setUploadMessage({ type: 'error', text: err.message || 'Không thể kết nối máy chủ.' });
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const fetchServices = async () => {
    try {
      setIsLoading(true);
      const res = await fetch('/api/admin/services');
      const data = await res.json();
      if (data.success) {
        setServices(data.services);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchServices();
  }, []);

  const handleToggleActive = async (service: ServiceItem) => {
    try {
      const res = await fetch('/api/admin/services', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: service.id, isActive: !service.isActive }),
      });
      if (res.ok) fetchServices();
    } catch (e) {
      console.error(e);
    }
  };

  const handleToggleFeatured = async (service: ServiceItem) => {
    try {
      const res = await fetch('/api/admin/services', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: service.id, isFeatured: !service.isFeatured }),
      });
      if (res.ok) fetchServices();
    } catch (e) {
      console.error(e);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const res = await fetch(`/api/admin/services?id=${id}`, { method: 'DELETE' });
      if (res.ok) {
        setDeleteConfirmId(null);
        fetchServices();
      }
    } catch (e) {
      console.error(e);
    }
  };

  const handleSaveService = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    const payload = {
      slug: formData.get('slug') as string,
      title: formData.get('title') as string,
      description: formData.get('description') as string,
      priceVnd: parseInt(formData.get('priceVnd') as string, 10) || 0,
      priceUsd: parseInt(formData.get('priceUsd') as string, 10) || 0,
      price4SeatsVnd: parseInt(formData.get('price4SeatsVnd') as string, 10) || 0,
      price4SeatsUsd: parseInt(formData.get('price4SeatsUsd') as string, 10) || 0,
      price7SeatsVnd: parseInt(formData.get('price7SeatsVnd') as string, 10) || 0,
      price7SeatsUsd: parseInt(formData.get('price7SeatsUsd') as string, 10) || 0,
      image: (formData.get('image') as string) || selectedImage,
      category: formData.get('category') as string,
      vehicle: (formData.get('vehicle') as string) || 'Xe 4 chỗ & 7 chỗ',
      isActive: formData.get('isActive') === 'on',
      isFeatured: formData.get('isFeatured') === 'on',
    };

    try {
      if (editingService) {
        // Update
        await fetch('/api/admin/services', {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ id: editingService.id, ...payload }),
        });
      } else {
        // Create
        await fetch('/api/admin/services', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });
      }

      setIsModalOpen(false);
      setEditingService(null);
      setUploadMessage(null);
      fetchServices();
    } catch (err) {
      console.error(err);
    }
  };

  const filtered = services.filter((s) => {
    const matchSearch =
      s.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.slug.toLowerCase().includes(searchTerm.toLowerCase());
    const matchCat = categoryFilter === 'ALL' || s.category === categoryFilter;
    return matchSearch && matchCat;
  });

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Top Action Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-4 sm:p-6 rounded-2xl sm:rounded-3xl shadow-sm border border-gray-100">
        <div>
          <h2 className="text-lg sm:text-xl font-bold font-sans text-brand-900">
            Danh Sách Tuyến Xe & Dịch Vụ ({services.length})
          </h2>
          <p className="text-xs text-gray-500 mt-0.5">
            Đồng bộ bảng giá và thông tin tuyến xe ra toàn bộ website khách hàng
          </p>
        </div>

        <button
          onClick={() => {
            setEditingService(null);
            setSelectedImage('/images/hue-danang.jpg');
            setUploadMessage(null);
            setIsModalOpen(true);
          }}
          className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-gold-500 to-gold-600 text-brand-950 font-bold text-xs shadow-md hover:shadow-lg hover:from-gold-400 hover:to-gold-500 transition-all active:scale-95"
        >
          <Plus className="w-4 h-4" />
          <span>Thêm Tuyến Mới</span>
        </button>
      </div>

      {/* Filters & Search */}
      <div className="flex flex-col sm:flex-row items-center gap-3">
        <div className="relative flex-1 w-full">
          <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Tìm theo tên tuyến, địa danh, slug..."
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 text-xs text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-brand-500 bg-white"
          />
        </div>

        <select
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
          className="w-full sm:w-auto px-4 py-2.5 rounded-xl border border-gray-200 text-xs text-gray-700 bg-white focus:outline-none focus:ring-2 focus:ring-brand-500 font-medium"
        >
          <option value="ALL">Tất cả danh mục</option>
          <option value="city-tour">Huế City Tour</option>
          <option value="inter-city">Đưa đón liên tỉnh</option>
          <option value="airport">Sân bay Phú Bài</option>
          <option value="special-tour">Tour đặc biệt</option>
        </select>
      </div>

      {/* Table */}
      <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
        {isLoading ? (
          <div className="py-20 flex flex-col items-center justify-center text-gray-400">
            <Loader2 className="w-8 h-8 animate-spin text-brand-500 mb-2" />
            <span className="text-xs">Đang tải danh sách dịch vụ...</span>
          </div>
        ) : filtered.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-gray-50 text-gray-600 uppercase tracking-wider font-semibold border-b border-gray-100">
                <tr>
                  <th className="py-3.5 px-4 whitespace-nowrap">Tuyến xe</th>
                  <th className="py-3.5 px-4 whitespace-nowrap">Danh mục</th>
                  <th className="py-3.5 px-4 whitespace-nowrap">Giá 4 Chỗ</th>
                  <th className="py-3.5 px-4 whitespace-nowrap">Giá 7 Chỗ</th>
                  <th className="py-3.5 px-4 text-center whitespace-nowrap">Nổi bật</th>
                  <th className="py-3.5 px-4 text-center whitespace-nowrap">Trạng thái</th>
                  <th className="py-3.5 px-4 text-right whitespace-nowrap">Thao tác</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filtered.map((service) => (
                  <tr key={service.id} className="hover:bg-gray-50/80 transition-colors">
                    <td className="py-3.5 px-4 whitespace-nowrap">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-10 rounded-lg overflow-hidden relative flex-shrink-0 border border-gray-200">
                          <img
                            src={service.image}
                            alt={service.title}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div>
                          <div className="font-bold text-gray-900">{service.title}</div>
                          <div className="text-[10px] text-gray-400">{service.slug}</div>
                        </div>
                      </div>
                    </td>

                    <td className="py-3.5 px-4">
                      <span className="px-2.5 py-1 rounded-md bg-gray-100 text-gray-700 font-semibold text-[10px]">
                        {service.category}
                      </span>
                    </td>

                    <td className="py-3.5 px-4 font-bold text-brand-900">
                      {service.price4SeatsVnd ? service.price4SeatsVnd.toLocaleString('vi-VN') : service.priceVnd.toLocaleString('vi-VN')} đ
                      <span className="block text-[10px] text-gray-400 font-normal">
                        (${service.price4SeatsUsd ?? service.priceUsd})
                      </span>
                    </td>

                    <td className="py-3.5 px-4 font-bold text-gold-700">
                      {service.price7SeatsVnd ? service.price7SeatsVnd.toLocaleString('vi-VN') : service.priceVnd.toLocaleString('vi-VN')} đ
                      <span className="block text-[10px] text-gray-400 font-normal">
                        (${service.price7SeatsUsd ?? service.priceUsd})
                      </span>
                    </td>

                    <td className="py-3.5 px-4 text-center">
                      <button
                        onClick={() => handleToggleFeatured(service)}
                        className={`p-1.5 rounded-lg transition ${
                          service.isFeatured
                            ? 'text-amber-500 bg-amber-50'
                            : 'text-gray-300 hover:text-gray-400'
                        }`}
                      >
                        <Star className={`w-4 h-4 ${service.isFeatured ? 'fill-current' : ''}`} />
                      </button>
                    </td>

                    <td className="py-3.5 px-4 text-center">
                      <button
                        onClick={() => handleToggleActive(service)}
                        className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold transition ${
                          service.isActive
                            ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                            : 'bg-gray-100 text-gray-500 border border-gray-200'
                        }`}
                      >
                        {service.isActive ? (
                          <>
                            <CheckCircle className="w-3 h-3 text-emerald-600" />
                            <span>Hiển thị</span>
                          </>
                        ) : (
                          <>
                            <EyeOff className="w-3 h-3" />
                            <span>Đã ẩn</span>
                          </>
                        )}
                      </button>
                    </td>

                    <td className="py-3.5 px-4 text-right space-x-1.5">
                      <button
                        onClick={() => {
                          setEditingService(service);
                          setSelectedImage(service.image || '/images/hue-danang.jpg');
                          setUploadMessage(null);
                          setIsModalOpen(true);
                        }}
                        className="p-1.5 rounded-lg text-brand-600 hover:bg-brand-50 transition"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => setDeleteConfirmId(service.id)}
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
            Không tìm thấy tuyến xe nào phù hợp.
          </div>
        )}
      </div>

      {/* Add / Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl sm:rounded-3xl max-w-2xl w-full p-4 sm:p-8 shadow-2xl border border-gray-100 my-4 sm:my-8 max-h-[92vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-4 border-b border-gray-100 mb-6">
              <h3 className="text-lg font-bold font-sans text-brand-900">
                {editingService ? 'Chỉnh Sửa Tuyến Xe' : 'Thêm Tuyến Xe Mới'}
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-1 rounded-full text-gray-400 hover:text-gray-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveService} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">Tên tuyến xe</label>
                  <input
                    type="text"
                    name="title"
                    required
                    defaultValue={editingService?.title || ''}
                    placeholder="VD: Huế – Đà Nẵng"
                    className="w-full px-3.5 py-2 rounded-xl border border-gray-200 text-xs focus:ring-2 focus:ring-brand-500 outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">Mã Slug (URL duy nhất)</label>
                  <input
                    type="text"
                    name="slug"
                    required
                    defaultValue={editingService?.slug || ''}
                    placeholder="VD: hue-danang"
                    className="w-full px-3.5 py-2 rounded-xl border border-gray-200 text-xs focus:ring-2 focus:ring-brand-500 outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Danh mục tuyến</label>
                <select
                  name="category"
                  defaultValue={editingService?.category || 'inter-city'}
                  className="w-full px-3.5 py-2 rounded-xl border border-gray-200 text-xs focus:ring-2 focus:ring-brand-500 outline-none bg-white"
                >
                  <option value="city-tour">Huế City Tour</option>
                  <option value="inter-city">Đưa đón liên tỉnh</option>
                  <option value="airport">Sân bay Phú Bài</option>
                  <option value="special-tour">Tour đặc biệt</option>
                </select>
              </div>

              {/* Image upload from PC / Phone & Preview */}
              <div className="space-y-3 p-4 bg-slate-50/90 rounded-2xl border border-gray-200">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold text-gray-700 flex items-center gap-1.5">
                    <ImageIcon className="w-4 h-4 text-brand-600" />
                    <span>Hình ảnh đại diện tuyến xe</span>
                  </label>
                  <span className="text-[11px] text-gray-500 font-medium">Hỗ trợ PC & Điện thoại</span>
                </div>

                {/* Preview + Upload Action */}
                <div className="flex flex-col sm:flex-row items-center gap-4">
                  {/* Thumbnail Preview */}
                  <div className="relative w-full sm:w-36 h-28 rounded-xl overflow-hidden bg-gray-200 border border-gray-300 flex-shrink-0 shadow-xs group">
                    <img
                      src={selectedImage}
                      alt="Xem trước ảnh"
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = '/images/hue-danang.jpg';
                      }}
                    />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white text-[10px] font-bold">
                      Xem trước
                    </div>
                  </div>

                  {/* Upload button and input */}
                  <div className="flex-1 w-full space-y-2">
                    <div className="flex flex-wrap items-center gap-2">
                      <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/*"
                        onChange={handleFileUpload}
                        className="hidden"
                      />
                      <button
                        type="button"
                        onClick={() => fileInputRef.current?.click()}
                        disabled={isUploading}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-brand-500 hover:bg-brand-600 text-white text-xs font-bold shadow-sm transition active:scale-95 disabled:opacity-50"
                      >
                        {isUploading ? (
                          <>
                            <Loader2 className="w-3.5 h-3.5 animate-spin" />
                            <span>Đang tải lên...</span>
                          </>
                        ) : (
                          <>
                            <Upload className="w-3.5 h-3.5" />
                            <span>Tải ảnh từ máy / điện thoại</span>
                          </>
                        )}
                      </button>

                      <span className="text-[11px] text-gray-500">
                        hoặc chọn ảnh mẫu / dán link
                      </span>
                    </div>

                    {/* Feedback message */}
                    {uploadMessage && (
                      <p
                        className={`text-[11px] font-semibold flex items-center gap-1 ${
                          uploadMessage.type === 'success' ? 'text-emerald-600' : 'text-red-500'
                        }`}
                      >
                        {uploadMessage.type === 'success' ? (
                          <Check className="w-3 h-3" />
                        ) : (
                          <AlertCircle className="w-3 h-3" />
                        )}
                        <span>{uploadMessage.text}</span>
                      </p>
                    )}

                    {/* Direct URL input */}
                    <input
                      type="text"
                      name="image"
                      required
                      value={selectedImage}
                      onChange={(e) => setSelectedImage(e.target.value)}
                      placeholder="/images/hue-danang.jpg hoặc https://..."
                      className="w-full px-3 py-1.5 rounded-lg border border-gray-200 text-xs focus:ring-2 focus:ring-brand-500 outline-none bg-white font-mono text-gray-700"
                    />
                  </div>
                </div>

                {/* Preset Suggestions */}
                <div className="pt-1">
                  <p className="text-[11px] font-semibold text-gray-500 mb-1.5">
                    Ảnh mẫu có sẵn trên website (nhấp để chọn nhanh):
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {PRESET_IMAGES.map((preset) => (
                      <button
                        key={preset.url}
                        type="button"
                        onClick={() => {
                          setSelectedImage(preset.url);
                          setUploadMessage({ type: 'success', text: `Đã chọn: ${preset.label}` });
                        }}
                        className={`text-[11px] px-2.5 py-1 rounded-lg border transition ${
                          selectedImage === preset.url
                            ? 'bg-gold-50 border-gold-500 text-brand-900 font-bold'
                            : 'bg-white border-gray-200 text-gray-600 hover:border-brand-300'
                        }`}
                      >
                        {preset.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Prices grid */}
              <div className="p-4 bg-gray-50 rounded-2xl border border-gray-100 space-y-3">
                <div className="text-xs font-bold text-brand-900 uppercase">Bảng giá 4 chỗ & 7 chỗ</div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  <div>
                    <label className="block text-[11px] text-gray-600 mb-1">Xe 4 chỗ (VNĐ)</label>
                    <input
                      type="number"
                      name="price4SeatsVnd"
                      required
                      defaultValue={editingService?.price4SeatsVnd || editingService?.priceVnd || 1400000}
                      className="w-full px-3 py-1.5 rounded-lg border border-gray-200 text-xs outline-none bg-white font-bold"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] text-gray-600 mb-1">Xe 4 chỗ (USD)</label>
                    <input
                      type="number"
                      name="price4SeatsUsd"
                      required
                      defaultValue={editingService?.price4SeatsUsd || editingService?.priceUsd || 54}
                      className="w-full px-3 py-1.5 rounded-lg border border-gray-200 text-xs outline-none bg-white font-bold"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] text-gray-600 mb-1">Xe 7 chỗ (VNĐ)</label>
                    <input
                      type="number"
                      name="price7SeatsVnd"
                      required
                      defaultValue={editingService?.price7SeatsVnd || 1600000}
                      className="w-full px-3 py-1.5 rounded-lg border border-gray-200 text-xs outline-none bg-white font-bold text-gold-700"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] text-gray-600 mb-1">Xe 7 chỗ (USD)</label>
                    <input
                      type="number"
                      name="price7SeatsUsd"
                      required
                      defaultValue={editingService?.price7SeatsUsd || 62}
                      className="w-full px-3 py-1.5 rounded-lg border border-gray-200 text-xs outline-none bg-white font-bold text-gold-700"
                    />
                  </div>
                </div>

                {/* Legacy price base */}
                <input
                  type="hidden"
                  name="priceVnd"
                  value={editingService?.price4SeatsVnd || editingService?.priceVnd || 1400000}
                />
                <input
                  type="hidden"
                  name="priceUsd"
                  value={editingService?.price4SeatsUsd || editingService?.priceUsd || 54}
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Mô tả hành trình</label>
                <textarea
                  name="description"
                  rows={3}
                  defaultValue={editingService?.description || ''}
                  placeholder="Mô tả điểm dừng chân, cảnh đẹp..."
                  className="w-full px-3.5 py-2 rounded-xl border border-gray-200 text-xs focus:ring-2 focus:ring-brand-500 outline-none"
                />
              </div>

              <div className="flex items-center gap-6 pt-2">
                <label className="flex items-center gap-2 text-xs font-bold text-gray-700 cursor-pointer">
                  <input
                    type="checkbox"
                    name="isActive"
                    defaultChecked={editingService ? editingService.isActive : true}
                    className="w-4 h-4 rounded text-brand-600 focus:ring-brand-500"
                  />
                  <span>Hiển thị công khai trên web</span>
                </label>

                <label className="flex items-center gap-2 text-xs font-bold text-gray-700 cursor-pointer">
                  <input
                    type="checkbox"
                    name="isFeatured"
                    defaultChecked={editingService ? editingService.isFeatured : false}
                    className="w-4 h-4 rounded text-brand-600 focus:ring-brand-500"
                  />
                  <span>Đánh dấu tuyến nổi bật (Popular)</span>
                </label>
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-100">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded-xl border border-gray-200 text-xs font-bold text-gray-600 hover:bg-gray-50"
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 rounded-xl bg-brand-600 hover:bg-brand-700 text-white font-bold text-xs shadow-md"
                >
                  {editingService ? 'Lưu Thay Đổi' : 'Thêm Mới'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteConfirmId && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-sm w-full p-6 text-center shadow-2xl">
            <div className="w-12 h-12 rounded-full bg-red-100 text-red-600 flex items-center justify-center mx-auto mb-4">
              <AlertCircle className="w-6 h-6" />
            </div>
            <h4 className="text-base font-bold text-gray-900 mb-1">Xác nhận xóa tuyến xe?</h4>
            <p className="text-xs text-gray-500 mb-6">
              Hành động này sẽ xóa tuyến xe khỏi hệ thống. Các đánh giá liên quan sẽ được giữ an toàn.
            </p>
            <div className="flex items-center gap-3">
              <button
                onClick={() => setDeleteConfirmId(null)}
                className="flex-1 py-2.5 rounded-xl border border-gray-200 text-xs font-bold text-gray-700 hover:bg-gray-50"
              >
                Hủy bỏ
              </button>
              <button
                onClick={() => handleDelete(deleteConfirmId)}
                className="flex-1 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs font-bold shadow-md"
              >
                Xóa ngay
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}


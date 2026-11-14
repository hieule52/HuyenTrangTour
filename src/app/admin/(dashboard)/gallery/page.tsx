'use client';

import React, { useState, useEffect, useRef } from 'react';
import {
  Images,
  Plus,
  Pencil,
  Trash2,
  X,
  Eye,
  EyeOff,
  Upload,
  Search,
  Filter,
  Save,
  ImageIcon,
  Tag,
  ArrowUpDown,
  CheckCircle,
} from 'lucide-react';

interface GalleryImage {
  id: string;
  src: string;
  title: string;
  subtitle: string | null;
  category: string;
  sortOrder: number;
  isPublic: boolean;
  publicId: string | null;
  createdAt: string;
  updatedAt: string;
}

const CATEGORIES = [
  { value: 'all', label: 'Tất cả' },
  { value: 'general', label: 'Chung' },
  { value: 'vehicles', label: 'Phương tiện' },
  { value: 'customers', label: 'Khách hàng' },
  { value: 'cityTour', label: 'Nội thành' },
  { value: 'interCity', label: 'Liên tỉnh' },
  { value: 'destinations', label: 'Điểm đến' },
];

const CATEGORY_LABELS: Record<string, string> = {
  general: 'Chung',
  vehicles: 'Phương tiện',
  customers: 'Khách hàng',
  cityTour: 'Nội thành',
  interCity: 'Liên tỉnh',
  destinations: 'Điểm đến',
};

const CATEGORY_COLORS: Record<string, string> = {
  general: 'bg-gray-100 text-gray-700',
  vehicles: 'bg-blue-100 text-blue-700',
  customers: 'bg-green-100 text-green-700',
  cityTour: 'bg-purple-100 text-purple-700',
  interCity: 'bg-orange-100 text-orange-700',
  destinations: 'bg-teal-100 text-teal-700',
};

const PRESET_IMAGES = [
  { src: '/images/hue-danang.jpg', title: 'Huế - Đà Nẵng', category: 'interCity' },
  { src: '/images/hue-hoian.jpg', title: 'Huế - Hội An', category: 'interCity' },
  { src: '/images/danang-hoian.jpg', title: 'Đà Nẵng - Hội An', category: 'cityTour' },
  { src: '/images/phong-nha.jpg', title: 'Phong Nha', category: 'destinations' },
  { src: '/images/hue-city.jpg', title: 'Thành phố Huế', category: 'cityTour' },
];

type ModalMode = 'add' | 'edit' | null;

export default function AdminGalleryPage() {
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [filterCategory, setFilterCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [modalMode, setModalMode] = useState<ModalMode>(null);
  const [editingImage, setEditingImage] = useState<GalleryImage | null>(null);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState<string | null>(null);
  const [toast, setToast] = useState<{ msg: string; type: 'success' | 'error' } | null>(null);
  const [uploadingFile, setUploadingFile] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Form state
  const [form, setForm] = useState({
    src: '',
    title: '',
    subtitle: '',
    category: 'general',
    sortOrder: 0,
    isPublic: true,
  });
  const [previewSrc, setPreviewSrc] = useState('');

  const showToast = (msg: string, type: 'success' | 'error' = 'success') => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3000);
  };

  const fetchImages = async (cat?: string) => {
    setLoading(true);
    try {
      const url = cat && cat !== 'all' ? `/api/admin/gallery?category=${cat}` : '/api/admin/gallery';
      const res = await fetch(url);
      const data = await res.json();
      setImages(data.images || []);
    } catch {
      showToast('Không thể tải danh sách ảnh', 'error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchImages(filterCategory);
  }, [filterCategory]);

  const filteredImages = images.filter((img) => {
    const q = searchQuery.toLowerCase();
    return (
      img.title.toLowerCase().includes(q) ||
      (img.subtitle || '').toLowerCase().includes(q)
    );
  });

  const openAddModal = () => {
    setForm({ src: '', title: '', subtitle: '', category: 'general', sortOrder: images.length, isPublic: true });
    setPreviewSrc('');
    setEditingImage(null);
    setModalMode('add');
  };

  const openEditModal = (img: GalleryImage) => {
    setForm({
      src: img.src,
      title: img.title,
      subtitle: img.subtitle || '',
      category: img.category,
      sortOrder: img.sortOrder,
      isPublic: img.isPublic,
    });
    setPreviewSrc(img.src);
    setEditingImage(img);
    setModalMode('edit');
  };

  const closeModal = () => {
    setModalMode(null);
    setEditingImage(null);
    setPreviewSrc('');
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingFile(true);
    try {
      const fd = new FormData();
      fd.append('file', file);
      const res = await fetch('/api/admin/upload', { method: 'POST', body: fd });
      const data = await res.json();
      if (data.url) {
        setForm((f) => ({ ...f, src: data.url }));
        setPreviewSrc(data.url);
        // Auto fill title if empty
        if (!form.title) {
          const name = file.name.replace(/\.[^.]+$/, '').replace(/[-_]/g, ' ');
          setForm((f) => ({ ...f, title: name }));
        }
      } else {
        showToast('Upload thất bại', 'error');
      }
    } catch {
      showToast('Lỗi khi upload ảnh', 'error');
    } finally {
      setUploadingFile(false);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  const handleSrcChange = (val: string) => {
    setForm((f) => ({ ...f, src: val }));
    if (val.startsWith('/') || val.startsWith('http')) {
      setPreviewSrc(val);
    }
  };

  const handleSave = async () => {
    if (!form.src || !form.title) {
      showToast('Vui lòng nhập đường dẫn ảnh và tiêu đề', 'error');
      return;
    }
    setSaving(true);
    try {
      const isEdit = modalMode === 'edit' && editingImage;
      const res = await fetch('/api/admin/gallery', {
        method: isEdit ? 'PUT' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(isEdit ? { id: editingImage.id, ...form } : form),
      });
      const data = await res.json();
      if (res.ok) {
        showToast(isEdit ? 'Đã cập nhật ảnh' : 'Đã thêm ảnh mới');
        closeModal();
        fetchImages(filterCategory);
      } else {
        showToast(data.error || 'Có lỗi xảy ra', 'error');
      }
    } catch {
      showToast('Lỗi kết nối', 'error');
    } finally {
      setSaving(false);
    }
  };

  const handleTogglePublic = async (img: GalleryImage) => {
    try {
      const res = await fetch('/api/admin/gallery', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: img.id, isPublic: !img.isPublic }),
      });
      if (res.ok) {
        setImages((prev) => prev.map((i) => (i.id === img.id ? { ...i, isPublic: !i.isPublic } : i)));
        showToast(img.isPublic ? 'Đã ẩn ảnh' : 'Đã hiển thị ảnh');
      }
    } catch {
      showToast('Lỗi cập nhật', 'error');
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Bạn chắc chắn muốn xóa ảnh này?')) return;
    setDeleting(id);
    try {
      const res = await fetch(`/api/admin/gallery?id=${id}`, { method: 'DELETE' });
      if (res.ok) {
        showToast('Đã xóa ảnh');
        setImages((prev) => prev.filter((i) => i.id !== id));
      } else {
        showToast('Xóa thất bại', 'error');
      }
    } catch {
      showToast('Lỗi kết nối', 'error');
    } finally {
      setDeleting(null);
    }
  };

  const handlePresetSelect = (preset: typeof PRESET_IMAGES[0]) => {
    setForm((f) => ({
      ...f,
      src: preset.src,
      title: preset.title,
      category: preset.category,
    }));
    setPreviewSrc(preset.src);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Toast */}
      {toast && (
        <div
          className={`fixed top-4 right-4 z-50 flex items-center gap-2 px-4 py-3 rounded-xl shadow-lg text-white text-sm font-semibold transition-all ${
            toast.type === 'success' ? 'bg-emerald-600' : 'bg-red-600'
          }`}
        >
          {toast.type === 'success' ? <CheckCircle className="w-4 h-4" /> : <X className="w-4 h-4" />}
          {toast.msg}
        </div>
      )}

      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-4 sm:px-6 py-4 sm:py-5">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div>
            <h1 className="text-xl sm:text-2xl font-bold text-gray-900 flex items-center gap-2">
              <Images className="w-6 h-6 text-gold-600" />
              Quản Lý Khoảnh Khắc
            </h1>
            <p className="text-xs sm:text-sm text-gray-500 mt-0.5">
              Thư viện ảnh thực tế từ các chuyến đi — {images.length} ảnh
            </p>
          </div>
          <button
            onClick={openAddModal}
            className="flex items-center justify-center gap-2 bg-gold-600 hover:bg-gold-700 text-white font-semibold text-sm px-4 py-2.5 rounded-xl shadow transition-all"
          >
            <Plus className="w-4 h-4" />
            Thêm ảnh mới
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white border-b border-gray-200 px-4 sm:px-6 py-3">
        <div className="flex flex-col sm:flex-row gap-3">
          {/* Search */}
          <div className="relative flex-1 max-w-xs">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Tìm kiếm ảnh..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold-500/40 focus:border-gold-400"
            />
          </div>
          {/* Category filter */}
          <div className="flex items-center gap-1.5 flex-wrap">
            <Filter className="w-3.5 h-3.5 text-gray-400 flex-shrink-0" />
            {CATEGORIES.map((cat) => (
              <button
                key={cat.value}
                onClick={() => setFilterCategory(cat.value)}
                className={`text-xs font-semibold px-3 py-1.5 rounded-full border transition-all whitespace-nowrap ${
                  filterCategory === cat.value
                    ? 'bg-gold-600 text-white border-gold-600 shadow-sm'
                    : 'bg-white text-gray-600 border-gray-200 hover:border-gold-400'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Gallery Grid */}
      <div className="p-4 sm:p-6">
        {loading ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="bg-gray-200 animate-pulse rounded-xl aspect-[4/3]" />
            ))}
          </div>
        ) : filteredImages.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <div className="w-16 h-16 rounded-2xl bg-gray-100 flex items-center justify-center mb-4">
              <ImageIcon className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-base font-semibold text-gray-700 mb-1">Chưa có ảnh nào</h3>
            <p className="text-sm text-gray-500 mb-4">
              {searchQuery ? 'Không tìm thấy ảnh phù hợp' : 'Hãy thêm ảnh đầu tiên vào thư viện'}
            </p>
            {!searchQuery && (
              <button
                onClick={openAddModal}
                className="flex items-center gap-2 bg-gold-600 hover:bg-gold-700 text-white font-semibold text-sm px-4 py-2 rounded-xl transition"
              >
                <Plus className="w-4 h-4" />
                Thêm ảnh đầu tiên
              </button>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
            {filteredImages.map((img) => (
              <div
                key={img.id}
                className={`group relative bg-white rounded-xl overflow-hidden shadow-sm border border-gray-200 hover:shadow-md transition-all ${
                  !img.isPublic ? 'opacity-60' : ''
                }`}
              >
                {/* Image */}
                <div className="relative aspect-[4/3] bg-gray-100 overflow-hidden">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={img.src}
                    alt={img.title}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = '/images/placeholder.jpg';
                    }}
                  />
                  {/* Hidden badge */}
                  {!img.isPublic && (
                    <div className="absolute top-2 left-2 bg-gray-800/80 text-white text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
                      <EyeOff className="w-3 h-3" /> Ẩn
                    </div>
                  )}
                  {/* Category badge */}
                  <div className={`absolute top-2 right-2 text-[10px] font-bold px-2 py-0.5 rounded-full ${CATEGORY_COLORS[img.category] || 'bg-gray-100 text-gray-700'}`}>
                    {CATEGORY_LABELS[img.category] || img.category}
                  </div>
                  {/* Actions overlay */}
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                    <button
                      onClick={() => openEditModal(img)}
                      className="p-2 bg-white rounded-xl text-gray-700 hover:text-gold-600 shadow transition"
                      title="Chỉnh sửa"
                    >
                      <Pencil className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleTogglePublic(img)}
                      className="p-2 bg-white rounded-xl text-gray-700 hover:text-blue-600 shadow transition"
                      title={img.isPublic ? 'Ẩn ảnh' : 'Hiện ảnh'}
                    >
                      {img.isPublic ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                    <button
                      onClick={() => handleDelete(img.id)}
                      disabled={deleting === img.id}
                      className="p-2 bg-white rounded-xl text-gray-700 hover:text-red-600 shadow transition"
                      title="Xóa"
                    >
                      {deleting === img.id ? (
                        <span className="w-4 h-4 border-2 border-red-400 border-t-transparent rounded-full animate-spin inline-block" />
                      ) : (
                        <Trash2 className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                </div>
                {/* Info */}
                <div className="p-2.5">
                  <p className="text-xs font-semibold text-gray-800 truncate">{img.title}</p>
                  {img.subtitle && (
                    <p className="text-[10px] text-gray-500 truncate mt-0.5">{img.subtitle}</p>
                  )}
                  <div className="flex items-center gap-1 mt-1.5">
                    <ArrowUpDown className="w-3 h-3 text-gray-400" />
                    <span className="text-[10px] text-gray-400">#{img.sortOrder}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Add/Edit Modal */}
      {modalMode && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-end sm:items-center justify-center p-0 sm:p-4">
          <div className="bg-white w-full sm:max-w-lg sm:rounded-2xl rounded-t-2xl max-h-[90vh] overflow-y-auto shadow-2xl">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-5 border-b border-gray-100 sticky top-0 bg-white z-10 rounded-t-2xl">
              <h2 className="text-base font-bold text-gray-900 flex items-center gap-2">
                <ImageIcon className="w-5 h-5 text-gold-600" />
                {modalMode === 'add' ? 'Thêm ảnh mới' : 'Chỉnh sửa ảnh'}
              </h2>
              <button onClick={closeModal} className="p-2 rounded-xl hover:bg-gray-100 text-gray-500 transition">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-5 space-y-4">
              {/* Image Preview */}
              <div className="relative w-full aspect-video bg-gray-100 rounded-xl overflow-hidden border border-gray-200">
                {previewSrc ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={previewSrc}
                    alt="Preview"
                    className="w-full h-full object-cover"
                    onError={() => setPreviewSrc('')}
                  />
                ) : (
                  <div className="flex flex-col items-center justify-center h-full text-gray-400 gap-2">
                    <ImageIcon className="w-10 h-10" />
                    <span className="text-xs">Xem trước ảnh</span>
                  </div>
                )}
              </div>

              {/* Upload from device */}
              <div>
                <label className="text-xs font-semibold text-gray-700 block mb-1.5">
                  Upload từ máy tính / điện thoại
                </label>
                <div
                  onClick={() => fileInputRef.current?.click()}
                  className="flex items-center gap-2 border-2 border-dashed border-gray-300 hover:border-gold-400 rounded-xl p-3 cursor-pointer transition-colors"
                >
                  <Upload className="w-4 h-4 text-gray-400" />
                  <span className="text-sm text-gray-500">
                    {uploadingFile ? 'Đang upload...' : 'Chọn ảnh từ thiết bị'}
                  </span>
                  {uploadingFile && (
                    <span className="ml-auto w-4 h-4 border-2 border-gold-500 border-t-transparent rounded-full animate-spin" />
                  )}
                </div>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleFileUpload}
                />
              </div>

              {/* Or enter URL */}
              <div>
                <label className="text-xs font-semibold text-gray-700 block mb-1.5">
                  Hoặc nhập đường dẫn ảnh
                </label>
                <input
                  type="text"
                  value={form.src}
                  onChange={(e) => handleSrcChange(e.target.value)}
                  placeholder="/images/ten-anh.jpg hoặc https://..."
                  className="w-full px-3 py-2.5 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-gold-500/40 focus:border-gold-400"
                />
              </div>

              {/* Preset images */}
              {modalMode === 'add' && (
                <div>
                  <label className="text-xs font-semibold text-gray-700 block mb-1.5">Ảnh có sẵn</label>
                  <div className="grid grid-cols-5 gap-1.5">
                    {PRESET_IMAGES.map((p) => (
                      <button
                        key={p.src}
                        onClick={() => handlePresetSelect(p)}
                        className={`aspect-square rounded-lg overflow-hidden border-2 transition-all ${
                          form.src === p.src ? 'border-gold-500 ring-2 ring-gold-300' : 'border-transparent hover:border-gray-300'
                        }`}
                        title={p.title}
                      >
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={p.src} alt={p.title} className="w-full h-full object-cover" onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }} />
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Title */}
              <div>
                <label className="text-xs font-semibold text-gray-700 block mb-1.5">
                  Tiêu đề <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={form.title}
                  onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))}
                  placeholder="Vd: Hoàng Thành Huế, Hội An..."
                  className="w-full px-3 py-2.5 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-gold-500/40 focus:border-gold-400"
                />
              </div>

              {/* Subtitle */}
              <div>
                <label className="text-xs font-semibold text-gray-700 block mb-1.5">
                  Mô tả ngắn (không bắt buộc)
                </label>
                <input
                  type="text"
                  value={form.subtitle}
                  onChange={(e) => setForm((f) => ({ ...f, subtitle: e.target.value }))}
                  placeholder="Vd: Khám phá di sản văn hóa..."
                  className="w-full px-3 py-2.5 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-gold-500/40 focus:border-gold-400"
                />
              </div>

              {/* Category & Sort */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-semibold text-gray-700 block mb-1.5">
                    <Tag className="w-3 h-3 inline mr-1" />Danh mục
                  </label>
                  <select
                    value={form.category}
                    onChange={(e) => setForm((f) => ({ ...f, category: e.target.value }))}
                    className="w-full px-3 py-2.5 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-gold-500/40 focus:border-gold-400 bg-white"
                  >
                    {CATEGORIES.filter((c) => c.value !== 'all').map((cat) => (
                      <option key={cat.value} value={cat.value}>{cat.label}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="text-xs font-semibold text-gray-700 block mb-1.5">
                    <ArrowUpDown className="w-3 h-3 inline mr-1" />Thứ tự (sort)
                  </label>
                  <input
                    type="number"
                    value={form.sortOrder}
                    onChange={(e) => setForm((f) => ({ ...f, sortOrder: parseInt(e.target.value) || 0 }))}
                    className="w-full px-3 py-2.5 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-gold-500/40 focus:border-gold-400"
                    min={0}
                  />
                </div>
              </div>

              {/* isPublic toggle */}
              <div className="flex items-center justify-between p-3.5 bg-gray-50 rounded-xl">
                <div>
                  <p className="text-sm font-semibold text-gray-700">Hiển thị công khai</p>
                  <p className="text-xs text-gray-500">Ảnh sẽ hiện trên website khách hàng</p>
                </div>
                <button
                  type="button"
                  onClick={() => setForm((f) => ({ ...f, isPublic: !f.isPublic }))}
                  className={`relative w-11 h-6 rounded-full transition-all ${form.isPublic ? 'bg-gold-500' : 'bg-gray-300'}`}
                >
                  <span
                    className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform ${form.isPublic ? 'translate-x-5' : 'translate-x-0'}`}
                  />
                </button>
              </div>

              {/* Actions */}
              <div className="flex gap-3 pt-2">
                <button
                  onClick={closeModal}
                  className="flex-1 py-2.5 text-sm font-semibold text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-xl transition"
                >
                  Hủy
                </button>
                <button
                  onClick={handleSave}
                  disabled={saving || uploadingFile}
                  className="flex-1 flex items-center justify-center gap-2 py-2.5 text-sm font-semibold text-white bg-gold-600 hover:bg-gold-700 disabled:opacity-60 rounded-xl transition"
                >
                  {saving ? (
                    <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <Save className="w-4 h-4" />
                  )}
                  {modalMode === 'add' ? 'Thêm ảnh' : 'Lưu thay đổi'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}


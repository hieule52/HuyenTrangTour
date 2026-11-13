'use client';

import React, { useState, useRef } from 'react';
import { useSession, signIn } from 'next-auth/react';
import { Star, Upload, X, Loader2, CheckCircle2, AlertCircle, LogIn, Image as ImageIcon } from 'lucide-react';
import Image from 'next/image';

interface ServiceOption {
  id: string;
  slug: string;
  title: string;
}

interface ReviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  services: ServiceOption[];
  locale?: string;
}

const STAR_LABELS: Record<string, Record<number, string>> = {
  vi: {
    1: 'Không hài lòng',
    2: 'Chưa tốt',
    3: 'Bình thường',
    4: 'Hài lòng',
    5: 'Tuyệt vời',
  },
  en: {
    1: 'Poor',
    2: 'Fair',
    3: 'Average',
    4: 'Good',
    5: 'Excellent',
  },
  fr: {
    1: 'Médiocre',
    2: 'Moyen',
    3: 'Correct',
    4: 'Très bien',
    5: 'Excellent',
  },
  zh: {
    1: '不满意',
    2: '一般',
    3: '普通',
    4: '满意',
    5: '非常棒',
  },
  ko: {
    1: '불만족',
    2: '보통 이하',
    3: '보통',
    4: '만족',
    5: '매우 훌륭함',
  },
  ja: {
    1: '不満',
    2: 'やや不満',
    3: '普通',
    4: '満足',
    5: '大変満足',
  },
};

export default function ReviewModal({
  isOpen,
  onClose,
  onSuccess,
  services,
  locale = 'vi',
}: ReviewModalProps) {
  const { data: session, status } = useSession();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [rating, setRating] = useState<number>(5);
  const [hoverRating, setHoverRating] = useState<number>(0);
  const [content, setContent] = useState<string>('');
  const [selectedServiceId, setSelectedServiceId] = useState<string>('');
  const [images, setImages] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [isSuccess, setIsSuccess] = useState<boolean>(false);

  if (!isOpen) return null;

  const currentLabels = STAR_LABELS[locale] || STAR_LABELS.vi;
  const activeRating = hoverRating || rating;

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    if (images.length + files.length > 5) {
      setErrorMessage(locale === 'vi' ? 'Bạn chỉ có thể tải lên tối đa 5 hình ảnh.' : 'You can only upload up to 5 photos.');
      return;
    }

    setErrorMessage('');
    Array.from(files).forEach((file) => {
      if (!file.type.startsWith('image/')) {
        setErrorMessage(locale === 'vi' ? 'Chỉ hỗ trợ file hình ảnh (JPG, PNG, WEBP).' : 'Only image files are allowed.');
        return;
      }
      if (file.size > 5 * 1024 * 1024) {
        setErrorMessage(locale === 'vi' ? 'Mỗi ảnh tối đa 5MB.' : 'Each image must be under 5MB.');
        return;
      }

      const reader = new FileReader();
      reader.onload = (uploadEvent) => {
        if (uploadEvent.target?.result) {
          setImages((prev) => [...prev, uploadEvent.target!.result as string].slice(0, 5));
        }
      };
      reader.readAsDataURL(file);
    });
  };

  const removeImage = (index: number) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (!session) {
      setErrorMessage(locale === 'vi' ? 'Vui lòng đăng nhập Google để gửi đánh giá.' : 'Please sign in with Google to submit.');
      return;
    }

    if (content.trim().length < 10) {
      setErrorMessage(locale === 'vi' ? 'Nội dung đánh giá cần tối thiểu 10 ký tự.' : 'Review must be at least 10 characters.');
      return;
    }

    setIsSubmitting(true);

    try {
      const res = await fetch('/api/reviews', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          rating,
          content: content.trim(),
          serviceId: selectedServiceId || null,
          locale,
          images,
        }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.message || 'Lỗi khi gửi đánh giá');
      }

      setIsSuccess(true);
      setTimeout(() => {
        setIsSuccess(false);
        setContent('');
        setImages([]);
        onSuccess();
        onClose();
      }, 2500);
    } catch (err: any) {
      setErrorMessage(err.message || 'Có lỗi xảy ra, vui lòng thử lại.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in overflow-y-auto">
      <div
        className="relative w-full max-w-xl bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden my-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-6 py-5 bg-gradient-to-r from-brand-700 via-brand-600 to-brand-800 text-white flex items-center justify-between">
          <div>
            <h3 className="text-lg md:text-xl font-heading font-bold text-gold-400">
              {locale === 'vi' && 'Viết Đánh Giá Dịch Vụ'}
              {locale === 'en' && 'Write a Review'}
              {locale === 'fr' && 'Donner un Avis'}
              {locale === 'zh' && '写下您的评价'}
              {locale === 'ko' && '이용 후기 작성'}
              {locale === 'ja' && 'レビューを投稿する'}
            </h3>
            <p className="text-xs text-blue-100/80 mt-0.5">
              HUYỀN TRANG TOUR • VinFast Limo Green & Sedan
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-white/10 text-white/80 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 max-h-[80vh] overflow-y-auto">
          {isSuccess ? (
            <div className="py-12 text-center flex flex-col items-center">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mb-4 animate-bounce">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <h4 className="text-xl font-bold text-gray-900 mb-2 font-heading">
                {locale === 'vi' ? 'Cảm ơn bạn đã gửi đánh giá!' : 'Thank you for your review!'}
              </h4>
              <p className="text-sm text-gray-600 max-w-md">
                {locale === 'vi'
                  ? 'Đánh giá của bạn đã được tiếp nhận và sẽ xuất hiện công khai sau khi được ban quản trị phê duyệt.'
                  : 'Your review has been received and will be published once approved by our moderation team.'}
              </p>
            </div>
          ) : !session ? (
            /* Google Login prompt */
            <div className="py-8 text-center flex flex-col items-center">
              <div className="w-16 h-16 rounded-full bg-gold-50 text-gold-600 flex items-center justify-center mb-4">
                <LogIn className="w-8 h-8" />
              </div>
              <h4 className="text-lg font-bold text-gray-900 mb-2 font-heading">
                {locale === 'vi' ? 'Đăng nhập để gửi đánh giá' : 'Sign in to write a review'}
              </h4>
              <p className="text-sm text-gray-600 max-w-sm mb-6">
                {locale === 'vi'
                  ? 'Để đảm bảo tính xác thực và khách quan, quý khách vui lòng đăng nhập tài khoản Google để gửi đánh giá.'
                  : 'To ensure authenticity and transparency, please sign in with your Google account.'}
              </p>

              <button
                type="button"
                onClick={() => signIn('google')}
                className="inline-flex items-center gap-3 px-6 py-3 rounded-xl bg-white border border-gray-300 shadow-sm hover:shadow-md hover:bg-gray-50 text-gray-800 font-semibold text-sm transition-all"
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
                {locale === 'vi' ? 'Tiếp tục với Google' : 'Continue with Google'}
              </button>
            </div>
          ) : (
            /* Review Form */
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* User profile preview */}
              <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl border border-gray-100">
                {session.user?.image ? (
                  <img
                    src={session.user.image}
                    alt={session.user.name || 'User'}
                    className="w-10 h-10 rounded-full object-cover border border-gray-200"
                  />
                ) : (
                  <div className="w-10 h-10 rounded-full bg-brand-500 text-white font-bold flex items-center justify-center text-sm">
                    {session.user?.name?.charAt(0) || 'U'}
                  </div>
                )}
                <div>
                  <div className="text-sm font-bold text-gray-900">{session.user?.name}</div>
                  <div className="text-xs text-gray-500">{session.user?.email} (bảo mật)</div>
                </div>
              </div>

              {/* Service Selection */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-gray-700 mb-1.5">
                  {locale === 'vi' ? 'Tuyến đường / Dịch vụ đã trải nghiệm' : 'Route / Service experienced'}
                </label>
                <select
                  value={selectedServiceId}
                  onChange={(e) => setSelectedServiceId(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 bg-white text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-brand-500"
                >
                  <option value="">
                    {locale === 'vi' ? '-- Chọn tuyến đường (không bắt buộc) --' : '-- Choose route (optional) --'}
                  </option>
                  {services.map((svc) => (
                    <option key={svc.id} value={svc.id}>
                      {svc.title}
                    </option>
                  ))}
                </select>
              </div>

              {/* Rating selection */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-gray-700 mb-1.5">
                  {locale === 'vi' ? 'Đánh giá số sao' : 'Rating'}
                </label>
                <div className="flex items-center gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setRating(star)}
                      onMouseEnter={() => setHoverRating(star)}
                      onMouseLeave={() => setHoverRating(0)}
                      className="p-1 transition-transform hover:scale-110 focus:outline-none"
                    >
                      <Star
                        className={`w-8 h-8 transition-colors ${
                          star <= activeRating
                            ? 'fill-amber-400 text-amber-400 drop-shadow-sm'
                            : 'text-gray-300'
                        }`}
                      />
                    </button>
                  ))}
                  <span className="ml-3 text-sm font-bold text-brand-600 bg-amber-50 px-2.5 py-1 rounded-md border border-amber-200">
                    {currentLabels[activeRating]}
                  </span>
                </div>
              </div>

              {/* Content textarea */}
              <div>
                <div className="flex justify-between items-center mb-1.5">
                  <label className="text-xs font-semibold uppercase tracking-wider text-gray-700">
                    {locale === 'vi' ? 'Nội dung chia sẻ trải nghiệm' : 'Your Experience'}
                  </label>
                  <span className={`text-xs ${content.length > 2000 ? 'text-red-600 font-bold' : 'text-gray-400'}`}>
                    {content.length}/2.000
                  </span>
                </div>
                <textarea
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  rows={4}
                  maxLength={2000}
                  placeholder={
                    locale === 'vi'
                      ? 'Hãy chia sẻ trải nghiệm của bạn về dịch vụ HUYỀN TRANG TOUR (tài xế, chất lượng xe, sự đúng giờ, độ êm ái...)'
                      : 'Share your genuine experience with HUYEN TRANG TOUR (driver, vehicle comfort, punctuality...)'
                  }
                  className="w-full px-3.5 py-3 rounded-xl border border-gray-200 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent resize-y"
                />
              </div>

              {/* Photos upload */}
              <div>
                <div className="flex justify-between items-center mb-1.5">
                  <label className="text-xs font-semibold uppercase tracking-wider text-gray-700 flex items-center gap-1.5">
                    <ImageIcon className="w-4 h-4 text-brand-500" />
                    {locale === 'vi' ? 'Hình ảnh thực tế (Tối đa 5 ảnh)' : 'Photos (Max 5 photos)'}
                  </label>
                  <span className="text-xs text-gray-400">{images.length}/5 ảnh</span>
                </div>

                {/* Thumbnails */}
                {images.length > 0 && (
                  <div className="grid grid-cols-5 gap-2 mb-3">
                    {images.map((img, idx) => (
                      <div key={idx} className="relative aspect-square rounded-lg overflow-hidden border border-gray-200 group">
                        <img src={img} alt="Preview" className="w-full h-full object-cover" />
                        <button
                          type="button"
                          onClick={() => removeImage(idx)}
                          className="absolute top-1 right-1 p-1 bg-black/60 rounded-full text-white hover:bg-red-600 transition-colors"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}

                {images.length < 5 && (
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="w-full py-4 border-2 border-dashed border-gray-300 hover:border-brand-500 rounded-xl flex flex-col items-center justify-center text-gray-500 hover:text-brand-600 transition-colors bg-gray-50/50 hover:bg-blue-50/30"
                  >
                    <Upload className="w-5 h-5 mb-1" />
                    <span className="text-xs font-semibold">
                      {locale === 'vi' ? 'Tải ảnh từ điện thoại / máy tính' : 'Upload photos from device'}
                    </span>
                    <span className="text-[10px] text-gray-400 mt-0.5">JPG, PNG, WEBP (tối đa 5MB/ảnh)</span>
                  </button>
                )}
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/jpeg,image/png,image/webp"
                  multiple
                  onChange={handleImageChange}
                  className="hidden"
                />
              </div>

              {/* Error notice */}
              {errorMessage && (
                <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-xs text-red-600 flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 flex-shrink-0" />
                  <span>{errorMessage}</span>
                </div>
              )}

              {/* Submit CTA */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3.5 px-6 rounded-xl font-bold text-sm tracking-wide bg-gradient-to-r from-gold-500 to-gold-600 text-brand-900 shadow-lg hover:shadow-xl hover:from-gold-400 hover:to-gold-500 active:scale-[0.99] transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>{locale === 'vi' ? 'Đang gửi đánh giá...' : 'Submitting review...'}</span>
                    </>
                  ) : (
                    <span>{locale === 'vi' ? 'GỬI ĐÁNH GIÁ' : 'SUBMIT REVIEW'}</span>
                  )}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}


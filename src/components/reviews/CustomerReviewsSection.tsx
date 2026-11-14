'use client';

import React, { useState, useEffect } from 'react';
import { Star, MessageSquare, ThumbsUp, Calendar, CheckCircle, ChevronDown, Filter, Sparkles, Globe, X } from 'lucide-react';
import Image from 'next/image';
import ReviewModal from './ReviewModal';

interface ReviewItem {
  id: string;
  rating: number;
  content: string;
  locale: string;
  createdAt: string;
  user: {
    name: string | null;
    image: string | null;
  };
  service?: {
    id: string;
    slug: string;
    title: string;
    titleI18n?: any;
  } | null;
  images: Array<{
    id: string;
    imageUrl: string;
  }>;
}

interface CustomerReviewsSectionProps {
  locale?: string;
  serviceId?: string;
  services?: Array<{ id: string; slug: string; title: string }>;
}

export default function CustomerReviewsSection({
  locale = 'vi',
  serviceId,
  services = [],
}: CustomerReviewsSectionProps) {
  const [reviews, setReviews] = useState<ReviewItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedRating, setSelectedRating] = useState<string>('all');
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [stats, setStats] = useState({
    totalApproved: 0,
    averageRating: 5.0,
    starCounts: { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 } as Record<number, number>,
  });
  const [visibleCount, setVisibleCount] = useState<number>(6);
  const [lightboxImg, setLightboxImg] = useState<string | null>(null);

  const fetchReviews = async () => {
    try {
      setLoading(true);
      const url = new URL('/api/reviews', window.location.origin);
      if (serviceId) url.searchParams.set('serviceId', serviceId);
      if (selectedRating !== 'all') url.searchParams.set('rating', selectedRating);

      const res = await fetch(url.toString(), { cache: 'no-store' });
      const data = await res.json();

      if (data.success) {
        setReviews(data.reviews || []);
        if (data.stats) {
          setStats(data.stats);
        }
      } else {
        setReviews([]);
      }
    } catch (e) {
      console.error('Error fetching reviews:', e);
      setReviews([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, [selectedRating, serviceId]);

  const filteredReviews = reviews.filter((r) => {
    if (selectedRating === 'all') return true;
    return r.rating === parseInt(selectedRating, 10);
  });

  return (
    <section className="py-16 md:py-24 bg-gradient-to-b from-white via-amber-50/20 to-white relative overflow-hidden scroll-mt-20" id="reviews">
      {/* Decorative background glow */}
      <div className="absolute top-1/2 left-0 w-72 h-72 bg-gold-400/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-brand-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-gold-50 border border-gold-200 text-gold-800 text-xs font-bold tracking-wider uppercase mb-3.5 shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-gold-600" />
            <span>Customer Experiences</span>
          </div>

          <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-extrabold text-brand-900 tracking-tight">
            {locale === 'vi' && 'Trải Nghiệm Của Khách Hàng'}
            {locale === 'en' && 'Customer Experiences'}
            {locale === 'fr' && 'Témoignages de Nos Voyageurs'}
            {locale === 'zh' && '旅客真实好评与体验'}
            {locale === 'ko' && '고객 이용 후기 & 만족도'}
            {locale === 'ja' && 'お客様の声・体験談'}
          </h2>

          <p className="mt-3 text-sm md:text-base text-gray-600">
            {locale === 'vi' &&
              'Những chia sẻ chân thực từ khách hàng đã đồng hành cùng HUYỀN TRANG TOUR trên các hành trình khám phá miền Trung.'}
            {locale === 'en' &&
              'Genuine reviews from travelers who experienced our private car service across Central Vietnam.'}
            {locale === 'fr' &&
              'Les retours authentiques de nos passagers ayant voyagé en toute sérénité à Hué et au Centre du Vietnam.'}
            {locale === 'zh' && '来自全球各地旅客的真实行程分享与评价，见证每一次贴心与专业的接送体验。'}
            {locale === 'ko' && 'HUYEN TRANG TOUR와 함께 베트남 중부를 여행하신 소중한 고객님들의 솔직한 후기입니다.'}
            {locale === 'ja' && 'HUYEN TRANG TOUR をご利用いただいたお客様からの心温まるご感想と評価をご紹介します。'}
          </p>
        </div>

        {/* Rating Summary Box */}
        <div className="bg-white rounded-3xl p-6 md:p-8 shadow-xl border border-gold-100/60 mb-12">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            {/* Score box */}
            <div className="md:col-span-4 flex flex-col items-center md:items-start text-center md:text-left md:border-r md:border-gray-100 md:pr-8">
              <div className="text-5xl md:text-6xl font-extrabold text-brand-900 font-heading">
                {stats.averageRating.toFixed(1)}
              </div>
              <div className="flex items-center gap-1 my-2">
                {[1, 2, 3, 4, 5].map((s) => (
                  <Star
                    key={s}
                    className={`w-5 h-5 ${
                      s <= Math.round(stats.averageRating)
                        ? 'fill-amber-400 text-amber-400'
                        : 'text-gray-200'
                    }`}
                  />
                ))}
              </div>
              <p className="text-xs text-gray-500 font-medium">
                {locale === 'vi' && `Dựa trên ${stats.totalApproved} đánh giá đã xác minh`}
                {locale === 'en' && `Based on ${stats.totalApproved} verified reviews`}
                {locale === 'fr' && `Basé sur ${stats.totalApproved} avis vérifiés`}
                {locale === 'zh' && `基于 ${stats.totalApproved} 条真实用户评价`}
                {locale === 'ko' && `${stats.totalApproved}개의 인증된 후기 기준`}
                {locale === 'ja' && `${stats.totalApproved}件の承認済みレビューに基づく`}
              </p>

              <button
                onClick={() => setIsModalOpen(true)}
                className="mt-5 w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-gold-500 to-gold-600 text-brand-900 font-bold text-sm shadow-md hover:shadow-lg hover:from-gold-400 hover:to-gold-500 transition-all active:scale-95"
              >
                <MessageSquare className="w-4 h-4" />
                <span>
                  {locale === 'vi' && 'Viết đánh giá'}
                  {locale === 'en' && 'Write a review'}
                  {locale === 'fr' && 'Donner un avis'}
                  {locale === 'zh' && '撰写评价'}
                  {locale === 'ko' && '후기 작성하기'}
                  {locale === 'ja' && 'レビューを書く'}
                </span>
              </button>
            </div>

            {/* Distribution bars */}
            <div className="md:col-span-8 space-y-2">
              {[5, 4, 3, 2, 1].map((star) => {
                const count = stats.starCounts[star] || 0;
                const percentage = stats.totalApproved > 0 ? (count / stats.totalApproved) * 100 : 0;

                return (
                  <div key={star} className="flex items-center gap-3 text-xs">
                    <span className="w-10 font-bold text-gray-700 flex items-center gap-1">
                      {star} <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400 inline" />
                    </span>
                    <div className="flex-1 h-2.5 bg-gray-100 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-amber-400 to-gold-500 rounded-full transition-all duration-500"
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                    <span className="w-8 text-right text-gray-400 font-medium">{count}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-8">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-semibold text-gray-500 flex items-center gap-1 mr-1">
              <Filter className="w-3.5 h-3.5" />
              {locale === 'vi' ? 'Lọc:' : 'Filter:'}
            </span>
            <button
              onClick={() => setSelectedRating('all')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
                selectedRating === 'all'
                  ? 'bg-brand-600 text-white shadow-sm'
                  : 'bg-white border border-gray-200 text-gray-700 hover:bg-gray-50'
              }`}
            >
              {locale === 'vi' ? 'Tất cả' : 'All'}
            </button>
            {[5, 4, 3, 2, 1].map((s) => (
              <button
                key={s}
                onClick={() => setSelectedRating(s.toString())}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1 transition-all ${
                  selectedRating === s.toString()
                    ? 'bg-amber-400 text-brand-900 font-bold shadow-sm'
                    : 'bg-white border border-gray-200 text-gray-700 hover:bg-gray-50'
                }`}
              >
                <span>{s}</span>
                <Star className="w-3 h-3 fill-current" />
              </button>
            ))}
          </div>

          <div className="text-xs text-gray-500">
            {locale === 'vi' && `Hiển thị ${filteredReviews.length} đánh giá`}
            {locale === 'en' && `Showing ${filteredReviews.length} reviews`}
            {locale === 'fr' && `Affichage de ${filteredReviews.length} avis`}
            {locale === 'zh' && `显示 ${filteredReviews.length} 条评价`}
            {locale === 'ko' && `${filteredReviews.length}개의 후기 표시`}
            {locale === 'ja' && `${filteredReviews.length}件のレビューを表示`}
          </div>
        </div>

        {/* Reviews Grid */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 animate-pulse space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-full bg-gray-200" />
                  <div className="space-y-2 flex-1">
                    <div className="h-4 bg-gray-200 rounded w-1/2" />
                    <div className="h-3 bg-gray-100 rounded w-1/3" />
                  </div>
                </div>
                <div className="h-3 bg-gray-100 rounded w-full" />
                <div className="h-3 bg-gray-100 rounded w-4/5" />
              </div>
            ))}
          </div>
        ) : filteredReviews.length === 0 ? (
          <div className="text-center py-14 px-4 bg-white/80 backdrop-blur-sm rounded-3xl border border-dashed border-gray-200 max-w-xl mx-auto shadow-sm">
            <div className="w-14 h-14 rounded-2xl bg-amber-50 text-gold-600 flex items-center justify-center mx-auto mb-3.5 shadow-sm">
              <MessageSquare className="w-7 h-7" />
            </div>
            <h4 className="text-base font-bold text-gray-800 mb-1">
              {locale === 'vi' && 'Chưa có đánh giá nào'}
              {locale === 'en' && 'No reviews yet'}
              {locale === 'fr' && 'Aucun avis pour le moment'}
              {locale === 'zh' && '暂无评价'}
              {locale === 'ko' && '아직 등록된 후기가 없습니다'}
              {locale === 'ja' && 'まだレビューがありません'}
            </h4>
            <p className="text-xs text-gray-500 mb-5 max-w-sm mx-auto leading-relaxed">
              {locale === 'vi' && 'Hãy là người đầu tiên chia sẻ trải nghiệm của bạn cùng HUYỀN TRANG TOUR!'}
              {locale === 'en' && 'Be the first to share your experience with HUYEN TRANG TOUR!'}
              {locale === 'fr' && 'Soyez le premier à partager votre expérience avec nous!'}
              {locale === 'zh' && '成为第一个分享您旅行体验的旅客！'}
              {locale === 'ko' && '첫 번째 여행 후기를 남겨주세요!'}
              {locale === 'ja' && '最初のご感想をぜひお聞かせください！'}
            </p>
            <button
              onClick={() => setIsModalOpen(true)}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gold-600 hover:bg-gold-700 text-white font-bold text-xs shadow-md transition-all active:scale-95"
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span>{locale === 'vi' ? 'Viết đánh giá ngay' : 'Write a review'}</span>
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredReviews.slice(0, visibleCount).map((review) => (
              <div
                key={review.id}
                className="bg-white rounded-2xl p-6 shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 flex flex-col justify-between group"
              >
                <div>
                  {/* Header: User avatar + info */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      {review.user.image ? (
                        <img
                          src={review.user.image}
                          alt={review.user.name || 'Khách hàng'}
                          className="w-11 h-11 rounded-full object-cover border-2 border-gold-200 shadow-sm"
                        />
                      ) : (
                        <div className="w-11 h-11 rounded-full bg-gradient-to-br from-brand-600 to-brand-700 text-white font-bold flex items-center justify-center text-sm shadow-sm">
                          {review.user.name?.charAt(0) || 'K'}
                        </div>
                      )}
                      <div>
                        <h4 className="text-sm font-bold text-gray-900 group-hover:text-brand-600 transition-colors">
                          {review.user.name || 'Khách du lịch'}
                        </h4>
                        <div className="flex items-center gap-1.5 text-[11px] text-gray-400">
                          <Calendar className="w-3 h-3" />
                          <span>{new Date(review.createdAt).toLocaleDateString(locale === 'vi' ? 'vi-VN' : 'en-US')}</span>
                        </div>
                      </div>
                    </div>

                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-100">
                      <CheckCircle className="w-3 h-3 text-emerald-600" />
                      <span>Verified</span>
                    </span>
                  </div>

                  {/* Stars + Route Tag */}
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <div className="flex items-center gap-0.5">
                      {[1, 2, 3, 4, 5].map((s) => (
                        <Star
                          key={s}
                          className={`w-4 h-4 ${
                            s <= review.rating ? 'fill-amber-400 text-amber-400' : 'text-gray-200'
                          }`}
                        />
                      ))}
                    </div>

                    {review.service && (
                      <span className="text-[11px] font-semibold text-brand-700 bg-brand-50 px-2.5 py-0.5 rounded-md border border-brand-100 truncate max-w-[150px]">
                        {review.service.title}
                      </span>
                    )}
                  </div>

                  {/* Review text */}
                  <p className="text-sm text-gray-700 leading-relaxed line-clamp-4">
                    "{review.content}"
                  </p>

                  {/* Photos if any */}
                  {review.images && review.images.length > 0 && (
                    <div className="mt-4 grid grid-cols-4 gap-2">
                      {review.images.map((img) => (
                        <button
                          key={img.id}
                          type="button"
                          onClick={() => setLightboxImg(img.imageUrl)}
                          className="relative aspect-square rounded-lg overflow-hidden border border-gray-100 hover:opacity-90 hover:scale-105 transition-all"
                        >
                          <img src={img.imageUrl} alt="Review attachment" className="w-full h-full object-cover" />
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {/* Bottom footer: Locale badge */}
                <div className="mt-4 pt-3 border-t border-gray-50 flex items-center justify-between text-[11px] text-gray-400">
                  <span className="flex items-center gap-1">
                    <Globe className="w-3 h-3" />
                    <span>{review.locale.toUpperCase()}</span>
                  </span>
                  <span className="text-gold-600 font-medium">HUYỀN TRANG TOUR</span>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Load More Button */}
        {filteredReviews.length > visibleCount && (
          <div className="text-center mt-10">
            <button
              onClick={() => setVisibleCount((prev) => prev + 6)}
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl border border-gray-300 bg-white hover:bg-gray-50 text-gray-700 font-semibold text-sm shadow-sm transition-all"
            >
              <span>{locale === 'vi' ? 'Xem thêm đánh giá' : 'Load more reviews'}</span>
              <ChevronDown className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>

      {/* Review Modal */}
      <ReviewModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSuccess={() => {
          fetchReviews();
        }}
        services={services}
        locale={locale}
      />

      {/* Lightbox Preview Modal */}
      {lightboxImg && (
        <div
          className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4 backdrop-blur-sm animate-fade-in"
          onClick={() => setLightboxImg(null)}
        >
          <div className="relative max-w-4xl max-h-[90vh]">
            <img src={lightboxImg} alt="Enlarged review photo" className="max-w-full max-h-[85vh] rounded-xl shadow-2xl object-contain" />
            <button
              onClick={() => setLightboxImg(null)}
              className="absolute top-2 right-2 p-2 bg-black/60 rounded-full text-white hover:bg-red-600 transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>
      )}
    </section>
  );
}


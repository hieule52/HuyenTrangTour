"use client";

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { useLocale, useTranslations } from 'next-intl';
import { Link, usePathname, useRouter } from '@/i18n/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Globe, Phone, ChevronDown, Check, ShieldCheck, LogOut, User as UserIcon } from 'lucide-react';
import FlagIcon from '@/components/ui/FlagIcon';
import { useSession, signIn, signOut } from 'next-auth/react';

const NAV_ITEMS = [
  { key: 'home', href: '/' },
  { key: 'about', href: '/about' },
  { key: 'services', href: '/services' },
  { key: 'pricing', href: '/pricing' },
  { key: 'gallery', href: '/gallery' },
  { key: 'reviews', href: '/#reviews' },
  { key: 'contact', href: '/contact' },
];

const LANGUAGES = [
  { code: 'vi', label: 'Tiếng Việt', short: 'VI' },
  { code: 'en', label: 'English', short: 'EN' },
  { code: 'fr', label: 'Français', short: 'FR' },
  { code: 'zh', label: '中文', short: 'ZH' },
  { code: 'ko', label: '한국어', short: 'KO' },
  { code: 'ja', label: '日本語', short: 'JA' },
];

export default function Header() {
  const t = useTranslations('nav');
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isLangOpen, setIsLangOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const { data: session } = useSession();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (isMobileOpen) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileOpen]);

  const handleLanguageChange = (newLocale: string) => {
    router.replace(pathname, { locale: newLocale });
    setIsLangOpen(false);
    setIsMobileOpen(false);
  };

  const isActive = (href: string) => {
    if (href.includes('#')) return false;
    if (href === '/') return pathname === '/';
    return pathname.startsWith(href);
  };

  const currentLang = LANGUAGES.find((l) => l.code === locale) || LANGUAGES[0];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          isScrolled
            ? 'bg-white/95 backdrop-blur-md shadow-nav'
            : 'bg-white/90 backdrop-blur-sm'
        }`}
      >
        <div className="section-container">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-3 flex-shrink-0">
              <Image
                src="/images/logoHT.png"
                alt="HUYỀN TRANG TOUR"
                width={130}
                height={52}
                className="h-10 md:h-12 w-auto object-contain"
                priority
              />
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-1">
              {NAV_ITEMS.map((item) => (
                <Link
                  key={item.key}
                  href={item.href}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors duration-150 ${
                    isActive(item.href)
                      ? 'text-brand-500 bg-brand-50 font-semibold'
                      : 'text-gray-700 hover:text-brand-500 hover:bg-gray-50'
                  }`}
                >
                  {t(item.key)}
                </Link>
              ))}
            </nav>

            {/* Right Side */}
            <div className="flex items-center gap-2 sm:gap-3">
              {/* Language Switcher */}
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setIsLangOpen(!isLangOpen)}
                  className="flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3 py-1.5 sm:py-2 rounded-xl text-xs sm:text-sm font-semibold text-gray-700 hover:text-brand-600 hover:bg-gray-100/80 transition-all border border-gray-200/80 bg-white shadow-sm"
                  aria-label="Change language"
                >
                  <FlagIcon country={currentLang.code} size={18} />
                  <span className="text-[11px] sm:text-xs font-bold tracking-wider">{currentLang.short}</span>
                  <ChevronDown
                    size={12}
                    className={`text-gray-500 transition-transform duration-200 ${isLangOpen ? 'rotate-180' : ''}`}
                  />
                </button>

                <AnimatePresence>
                  {isLangOpen && (
                    <>
                      <div className="fixed inset-0 z-10" onClick={() => setIsLangOpen(false)} />
                      <motion.div
                        initial={{ opacity: 0, y: -6, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -6, scale: 0.95 }}
                        transition={{ duration: 0.15 }}
                        className="absolute right-0 top-full mt-2 w-48 sm:w-52 bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden z-20 py-1.5"
                      >
                        <div className="px-3.5 py-1.5 text-[11px] font-bold uppercase tracking-wider text-gray-400 border-b border-gray-100 mb-1">
                          Ngôn ngữ / Language
                        </div>
                        {LANGUAGES.map((lang) => (
                          <button
                            key={lang.code}
                            type="button"
                            onClick={() => handleLanguageChange(lang.code)}
                            className={`w-full flex items-center justify-between px-3.5 py-2.5 text-sm text-left transition-colors ${
                              locale === lang.code
                                ? 'bg-gold-50/60 text-brand-600 font-bold'
                                : 'text-gray-700 hover:bg-gray-50'
                            }`}
                          >
                            <span className="flex items-center gap-3">
                              <FlagIcon country={lang.code} size={20} />
                              <span className="text-xs font-medium">{lang.label}</span>
                            </span>
                            {locale === lang.code && (
                              <Check size={14} className="text-gold-600 font-bold" />
                            )}
                          </button>
                        ))}
                      </motion.div>
                    </>
                  )}
                </AnimatePresence>
              </div>

              {/* User Google Session / Login */}
              {session?.user ? (
                <div className="relative">
                  <button
                    type="button"
                    onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                    className="flex items-center gap-1.5 p-1 rounded-full hover:ring-2 hover:ring-gold-400 transition"
                  >
                    {session.user.image ? (
                      <img
                        src={session.user.image}
                        alt={session.user.name || 'User'}
                        className="w-8 h-8 rounded-full object-cover border border-gray-200"
                      />
                    ) : (
                      <div className="w-8 h-8 rounded-full bg-brand-600 text-white font-bold flex items-center justify-center text-xs">
                        {session.user.name?.charAt(0) || 'U'}
                      </div>
                    )}
                  </button>

                  <AnimatePresence>
                    {isUserMenuOpen && (
                      <>
                        <div className="fixed inset-0 z-10" onClick={() => setIsUserMenuOpen(false)} />
                        <motion.div
                          initial={{ opacity: 0, y: -6, scale: 0.95 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: -6, scale: 0.95 }}
                          className="absolute right-0 top-full mt-2 w-56 bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden z-20 py-2"
                        >
                          <div className="px-4 py-2 border-b border-gray-100">
                            <p className="text-xs font-bold text-gray-900 truncate">{session.user.name}</p>
                            <p className="text-[10px] text-gray-400 truncate">{session.user.email}</p>
                          </div>

                          {session.user.role === 'ADMIN' && (
                            <Link
                              href="/admin"
                              onClick={() => setIsUserMenuOpen(false)}
                              className="flex items-center gap-2 px-4 py-2.5 text-xs font-bold text-brand-900 hover:bg-gold-50 transition text-left w-full"
                            >
                              <ShieldCheck className="w-4 h-4 text-gold-600" />
                              <span>Trang Quản Trị (Admin)</span>
                            </Link>
                          )}

                          <button
                            type="button"
                            onClick={() => {
                              setIsUserMenuOpen(false);
                              signOut();
                            }}
                            className="flex items-center gap-2 px-4 py-2 text-xs font-semibold text-red-600 hover:bg-red-50 transition text-left w-full"
                          >
                            <LogOut className="w-3.5 h-3.5" />
                            <span>Đăng xuất</span>
                          </button>
                        </motion.div>
                      </>
                    )}
                  </AnimatePresence>
                </div>
              ) : null}

              {/* CTA Button */}
              <Link href="/contact" className="hidden sm:flex btn-gold text-xs md:text-sm">
                <Phone size={15} />
                {t('bookNow')}
              </Link>

              {/* Mobile Menu Button */}
              <button
                type="button"
                onClick={() => setIsMobileOpen(true)}
                className="lg:hidden p-2 rounded-md text-gray-700 hover:bg-gray-100 transition-colors"
                aria-label="Open menu"
              >
                <Menu size={22} />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Spacer */}
      <div className="h-16 md:h-20" />

      {/* Mobile Menu Drawer */}
      <AnimatePresence>
        {isMobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/60 z-[60] lg:hidden backdrop-blur-sm"
              onClick={() => setIsMobileOpen(false)}
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'tween', duration: 0.25 }}
              className="fixed top-0 right-0 bottom-0 w-80 max-w-[85vw] bg-brand-700 z-[70] flex flex-col lg:hidden text-white shadow-2xl h-[100dvh]"
            >
              {/* Mobile Header */}
              <div className="flex-shrink-0 flex items-center justify-between p-4 border-b border-white/10">
                <Link
                  href="/"
                  onClick={() => setIsMobileOpen(false)}
                  className="bg-white rounded-xl px-2.5 py-1 inline-flex items-center shadow-sm"
                >
                  <Image
                    src="/images/logoHT.png"
                    alt="HUYỀN TRANG TOUR"
                    width={110}
                    height={44}
                    className="h-8 w-auto object-contain"
                  />
                </Link>
                <button
                  type="button"
                  onClick={() => setIsMobileOpen(false)}
                  className="p-2 rounded-lg text-white/80 hover:text-white hover:bg-white/10 transition-colors"
                  aria-label="Close menu"
                >
                  <X size={22} />
                </button>
              </div>

              {/* Mobile Nav Links - min-h-0 allows overflow scroll to work properly */}
              <nav className="flex-1 min-h-0 overflow-y-auto py-4 px-3 space-y-1">
                {NAV_ITEMS.map((item) => (
                  <Link
                    key={item.key}
                    href={item.href}
                    onClick={() => setIsMobileOpen(false)}
                    className={`flex items-center px-4 py-3 rounded-xl text-base font-medium transition-colors ${
                      isActive(item.href)
                        ? 'text-gold-300 bg-white/10 font-bold'
                        : 'text-white/80 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    {t(item.key)}
                  </Link>
                ))}

                {/* Mobile Language Switcher */}
                <div className="pt-6 pb-2 px-3 border-t border-white/10 mt-4">
                  <p className="text-xs font-semibold text-gold-400 uppercase tracking-widest mb-3 flex items-center gap-1.5">
                    <Globe size={14} />
                    <span>Ngôn ngữ / Language</span>
                  </p>
                  <div className="grid grid-cols-2 gap-2 pb-2">
                    {LANGUAGES.map((lang) => (
                      <button
                        key={lang.code}
                        type="button"
                        onClick={() => handleLanguageChange(lang.code)}
                        className={`flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-xs font-medium transition-all ${
                          locale === lang.code
                            ? 'bg-gold-500 text-brand-900 font-bold shadow-md'
                            : 'bg-white/10 text-white/80 hover:bg-white/20 hover:text-white'
                        }`}
                      >
                        <FlagIcon country={lang.code} size={18} />
                        <span>{lang.label}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </nav>

              {/* Mobile CTA - always pinned at the bottom, safe area aware */}
              <div className="flex-shrink-0 p-4 border-t border-white/10 bg-brand-800/95 pb-[max(1rem,env(safe-area-inset-bottom))]">
                <a
                  href="tel:0364483597"
                  className="flex items-center justify-center gap-2 w-full py-3.5 rounded-xl font-bold text-brand-900 bg-gradient-to-r from-gold-500 to-gold-400 shadow-md hover:brightness-105 active:scale-98 transition-all"
                >
                  <Phone size={18} />
                  <span>0364 483 597</span>
                </a>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

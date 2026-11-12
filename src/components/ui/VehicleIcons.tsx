import React from 'react';

interface IconProps {
  className?: string;
  size?: number;
}

/**
 * Icon xe 4 chỗ (Sedan) cao cấp, đường nét thanh lịch chuẩn UI Vector
 */
export function Sedan4Icon({ className = 'w-4 h-4', size }: IconProps) {
  const style = size ? { width: size, height: size } : undefined;
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      style={style}
    >
      {/* Thân xe Sedan 4 chỗ */}
      <path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.4-1.7-1.1-2.2L18 8.5C17.4 7.6 16.2 7 15 7H9C7.8 7 6.6 7.6 6 8.5L3.1 10.8C2.4 11.3 2 12.1 2 13v3c0 .6.4 1 1 1h2" />
      {/* Cửa kính trước, sau và giữa */}
      <path d="M6 9.5l2.2-2.5h7.6L18 9.5" />
      <line x1="12" y1="7" x2="12" y2="13" />
      {/* Bánh xe trước và sau */}
      <circle cx="7" cy="17" r="2.2" />
      <circle cx="17" cy="17" r="2.2" />
      {/* Đèn xe */}
      <path d="M2 13.5h2.5" />
      <path d="M19.5 13.5H22" />
    </svg>
  );
}

/**
 * Icon xe 7 chỗ (SUV / VinFast Limo Green) khoang rộng, trần cao sang trọng
 */
export function Suv7Icon({ className = 'w-4 h-4', size }: IconProps) {
  const style = size ? { width: size, height: size } : undefined;
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      style={style}
    >
      {/* Dáng xe SUV/Limo 7 chỗ gầm cao, nóc dài */}
      <path d="M20 16h1.5c.8 0 1.5-.7 1.5-1.5v-3c0-.8-.5-1.5-1.2-1.8L18.5 8C18 7.4 17.2 7 16.3 7H6.5C5.7 7 4.9 7.4 4.4 8.1L2.3 11c-.2.3-.3.7-.3 1v2.5c0 .8.7 1.5 1.5 1.5H5" />
      {/* Kính xe 3 khoang (khoang tài xế, khoang giữa, khoang thứ 3 cho 7 chỗ) */}
      <path d="M5.5 11l1.5-3.5h9.5l2 3.5" />
      <line x1="10.5" y1="7.5" x2="10.5" y2="12" />
      <line x1="15" y1="7.5" x2="15" y2="12" />
      {/* Bánh xe gầm cao */}
      <circle cx="7" cy="16.5" r="2.3" />
      <circle cx="17.5" cy="16.5" r="2.3" />
      {/* Ký hiệu điện EV tia sét nhỏ tinh tế ở góc */}
      <path d="M12 2l-1.5 3h2L11 8" strokeWidth="1.4" className="text-emerald-500" />
    </svg>
  );
}

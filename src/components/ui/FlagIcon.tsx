interface FlagIconProps {
  country: 'vi' | 'en' | 'fr' | 'zh' | 'ko' | 'ja' | string;
  className?: string;
  size?: number;
}

export default function FlagIcon({ country, className = "", size = 20 }: FlagIconProps) {
  const width = size;
  const height = Math.round((size * 3) / 4);

  switch (country.toLowerCase()) {
    case 'vi':
      // Cờ Việt Nam: Nền đỏ, sao vàng 5 cánh ở giữa
      return (
        <svg
          width={width}
          height={height}
          viewBox="0 0 30 20"
          className={`rounded-[3px] shadow-sm flex-shrink-0 ${className}`}
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect width="30" height="20" fill="#DA251D" />
          <polygon
            points="15,4 16.5,8.8 21.6,8.8 17.5,11.8 19,16.5 15,13.5 11,16.5 12.5,11.8 8.4,8.8 13.5,8.8"
            fill="#FFFF00"
          />
        </svg>
      );

    case 'en':
      // Cờ Anh / Vương Quốc Anh (Union Jack)
      return (
        <svg
          width={width}
          height={height}
          viewBox="0 0 30 20"
          className={`rounded-[3px] shadow-sm flex-shrink-0 ${className}`}
          xmlns="http://www.w3.org/2000/svg"
        >
          <clipPath id="en-clip">
            <rect width="30" height="20" />
          </clipPath>
          <g clipPath="url(#en-clip)">
            <rect width="30" height="20" fill="#012169" />
            <path d="M0,0 L30,20 M30,0 L0,20" stroke="#FFFFFF" strokeWidth="4" />
            <path d="M0,0 L30,20 M30,0 L0,20" stroke="#C8102E" strokeWidth="2.4" />
            <path d="M15,0 V20 M0,10 H30" stroke="#FFFFFF" strokeWidth="6.5" />
            <path d="M15,0 V20 M0,10 H30" stroke="#C8102E" strokeWidth="4" />
          </g>
        </svg>
      );

    case 'fr':
      // Cờ Pháp: 3 dải dọc Xanh - Trắng - Đỏ
      return (
        <svg
          width={width}
          height={height}
          viewBox="0 0 30 20"
          className={`rounded-[3px] shadow-sm flex-shrink-0 ${className}`}
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect width="10" height="20" fill="#002395" />
          <rect x="10" width="10" height="20" fill="#FFFFFF" />
          <rect x="20" width="10" height="20" fill="#ED2939" />
        </svg>
      );

    case 'zh':
      // Cờ Trung Quốc: Nền đỏ, 5 ngôi sao vàng
      return (
        <svg
          width={width}
          height={height}
          viewBox="0 0 30 20"
          className={`rounded-[3px] shadow-sm flex-shrink-0 ${className}`}
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect width="30" height="20" fill="#DE2910" />
          {/* Ngôi sao lớn */}
          <polygon
            points="5,2.5 5.8,5 8.4,5 6.3,6.5 7.1,9 5,7.4 2.9,9 3.7,6.5 1.6,5 4.2,5"
            fill="#FFDE00"
          />
          {/* 4 ngôi sao nhỏ */}
          <circle cx="10" cy="2.5" r="0.8" fill="#FFDE00" />
          <circle cx="12" cy="4.5" r="0.8" fill="#FFDE00" />
          <circle cx="12" cy="7.5" r="0.8" fill="#FFDE00" />
          <circle cx="10" cy="9.5" r="0.8" fill="#FFDE00" />
        </svg>
      );

    case 'ko':
      // Cờ Hàn Quốc: Nền trắng, vòng tròn thái cực xanh đỏ
      return (
        <svg
          width={width}
          height={height}
          viewBox="0 0 30 20"
          className={`rounded-[3px] shadow-sm flex-shrink-0 ${className}`}
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect width="30" height="20" fill="#FFFFFF" />
          {/* Quẻ 4 góc màu đen */}
          <rect x="4" y="2" width="4" height="1" fill="#000000" />
          <rect x="4" y="4" width="4" height="1" fill="#000000" />
          <rect x="22" y="2" width="4" height="1" fill="#000000" />
          <rect x="22" y="4" width="4" height="1" fill="#000000" />
          <rect x="4" y="15" width="4" height="1" fill="#000000" />
          <rect x="4" y="17" width="4" height="1" fill="#000000" />
          <rect x="22" y="15" width="4" height="1" fill="#000000" />
          <rect x="22" y="17" width="4" height="1" fill="#000000" />
          {/* Vòng tròn thái cực Taegeuk */}
          <path d="M15,5 A5,5 0 0,1 15,15 A2.5,2.5 0 0,1 15,10 A2.5,2.5 0 0,0 15,5 Z" fill="#CD2E3A" />
          <path d="M15,15 A5,5 0 0,1 15,5 A2.5,2.5 0 0,1 15,10 A2.5,2.5 0 0,0 15,15 Z" fill="#0047A0" />
        </svg>
      );

    case 'ja':
      // Cờ Nhật Bản: Nền trắng, mặt trời đỏ ở giữa
      return (
        <svg
          width={width}
          height={height}
          viewBox="0 0 30 20"
          className={`rounded-[3px] shadow-sm flex-shrink-0 ${className}`}
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect width="30" height="20" fill="#FFFFFF" />
          <circle cx="15" cy="10" r="6" fill="#BC002D" />
        </svg>
      );

    default:
      return null;
  }
}


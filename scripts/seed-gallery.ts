import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const SEED_IMAGES = [
  {
    src: '/images/XeDuaDonResort.jpg',
    title: 'VinFast Limo Green Resort Transfer',
    subtitle: 'Đưa đón tận nơi tại các resort Huế & Lăng Cô',
    category: 'vehicles',
    sortOrder: 1,
    isPublic: true,
  },
  {
    src: '/images/sefiWithKhach.jpg',
    title: 'Happy Travelers - Nụ cười khách hàng',
    subtitle: 'Khoảnh khắc vui vẻ cùng du khách khám phá Huế',
    category: 'customers',
    sortOrder: 2,
    isPublic: true,
  },
  {
    src: '/images/XeDuaDonLangTam.jpg',
    title: 'Imperial Tombs of Hue - Lăng tẩm triều Nguyễn',
    subtitle: 'Tour tham quan di sản lăng Khải Định, Minh Mạng, Tự Đức',
    category: 'cityTour',
    sortOrder: 3,
    isPublic: true,
  },
  {
    src: '/images/xeDuaDonTaiKhachSan.jpg',
    title: 'Hotel Pick-up Service - Đón tại khách sạn',
    subtitle: 'Đúng giờ, chu đáo và thân thiện',
    category: 'vehicles',
    sortOrder: 4,
    isPublic: true,
  },
  {
    src: '/images/XeDuaDonTaiKhachSan2.jpg',
    title: 'VinFast Limo Green 7-Seater',
    subtitle: 'Khoang xe rộng rãi, máy lạnh êm ái, bảo vệ môi trường',
    category: 'vehicles',
    sortOrder: 5,
    isPublic: true,
  },
  {
    src: '/images/hue3diem.jpg',
    title: 'Hue Imperial Citadel - Đại Nội Huế',
    subtitle: 'Kinh thành cổ kính hơn 200 năm tuổi',
    category: 'destinations',
    sortOrder: 6,
    isPublic: true,
  },
  {
    src: '/images/hue-danang.jpg',
    title: 'Hai Van Pass Coastline - Đèo Hải Vân',
    subtitle: 'Cung đường ven biển đẹp bậc nhất Việt Nam',
    category: 'interCity',
    sortOrder: 7,
    isPublic: true,
  },
  {
    src: '/images/hue-hoian.jpg',
    title: 'Hoi An Ancient Lantern Town - Phố cổ Hội An',
    subtitle: 'Di sản văn hóa thế giới lung linh về đêm',
    category: 'interCity',
    sortOrder: 8,
    isPublic: true,
  },
  {
    src: '/images/hue-phongnha.jpg',
    title: 'Phong Nha - Ke Bang National Park',
    subtitle: 'Kỳ quan hang động đệ nhất thế giới',
    category: 'destinations',
    sortOrder: 9,
    isPublic: true,
  },
];

async function main() {
  console.log('🖼️ Seeding Gallery Images...');
  
  for (const img of SEED_IMAGES) {
    const existing = await prisma.galleryImage.findFirst({
      where: { src: img.src },
    });

    if (!existing) {
      await prisma.galleryImage.create({
        data: img,
      });
      console.log(`✅ Created: ${img.title}`);
    } else {
      console.log(`ℹ️ Already exists: ${img.title}`);
    }
  }

  const count = await prisma.galleryImage.count();
  console.log(`🎉 Total gallery images in DB: ${count}`);
}

main()
  .catch((e) => {
    console.error('❌ Error seeding gallery:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });


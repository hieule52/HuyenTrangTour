import { PrismaClient } from '@prisma/client';
import { routes } from '../src/data/routes';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting database seed for HUYỀN TRANG TOUR...');

  // 1. Seed System Settings
  await prisma.systemSetting.upsert({
    where: { id: 'default' },
    update: {},
    create: {
      id: 'default',
      brandName: 'HUYỀN TRANG TOUR',
      hotline1: '0364 483 597',
      hotline2: '0935 637 431',
      email: 'Lehuutienquoc97@gmail.com',
      address: '147 Phùng Quán, thành phố Huế',
      zaloUrl: 'https://zalo.me/0364483597',
      messengerUrl: 'https://m.me/huyentrangtour',
      whatsappUrl: 'https://wa.me/84364483597',
    },
  });
  console.log('✅ System settings seeded');

  // 2. Seed 13 Services / Routes
  for (const route of routes) {
    await prisma.service.upsert({
      where: { slug: route.id },
      update: {
        title: route.name,
        description: route.description ?? '',
        priceVnd: route.priceVND,
        priceUsd: route.priceUSD,
        price4SeatsVnd: route.price4SeatsVND ?? route.priceVND,
        price4SeatsUsd: route.price4SeatsUSD ?? route.priceUSD,
        price7SeatsVnd: route.price7SeatsVND ?? route.priceVND,
        price7SeatsUsd: route.price7SeatsUSD ?? route.priceUSD,
        image: route.image,
        category: route.category,
        vehicle: route.vehicle ?? 'Xe 4 chỗ & 7 chỗ',
        isFeatured: route.popular ?? false,
        isActive: true,
        titleI18n: route.nameI18n ?? {},
        descI18n: route.descriptionI18n ?? {},
      },
      create: {
        slug: route.id,
        title: route.name,
        description: route.description ?? '',
        priceVnd: route.priceVND,
        priceUsd: route.priceUSD,
        price4SeatsVnd: route.price4SeatsVND ?? route.priceVND,
        price4SeatsUsd: route.price4SeatsUSD ?? route.priceUSD,
        price7SeatsVnd: route.price7SeatsVND ?? route.priceVND,
        price7SeatsUsd: route.price7SeatsUSD ?? route.priceUSD,
        image: route.image,
        category: route.category,
        vehicle: route.vehicle ?? 'Xe 4 chỗ & 7 chỗ',
        isFeatured: route.popular ?? false,
        isActive: true,
        titleI18n: route.nameI18n ?? {},
        descI18n: route.descriptionI18n ?? {},
      },
    });
  }
  console.log(`✅ Seeded ${routes.length} services successfully`);

  // 3. Seed Default Admin if ADMIN_EMAILS is provided
  const adminEmails = (process.env.ADMIN_EMAILS || 'admin@huyentrangtour.com')
    .split(',')
    .map((e) => e.trim().toLowerCase())
    .filter(Boolean);

  for (const email of adminEmails) {
    await prisma.user.upsert({
      where: { email },
      update: { role: 'ADMIN' },
      create: {
        email,
        name: 'Huyền Trang Tour Admin',
        role: 'ADMIN',
      },
    });
    console.log(`👑 Admin configured: ${email}`);
  }

  console.log('🎉 Seeding completed successfully!');
}

main()
  .catch((e) => {
    console.error('❌ Error seeding database:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });


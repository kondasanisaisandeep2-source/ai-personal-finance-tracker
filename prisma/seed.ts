import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const sampleUser = await prisma.user.upsert({
    where: { email: 'demo@fintrack.app' },
    update: {},
    create: {
      email: 'demo@fintrack.app',
      name: 'Demo User',
      passwordHash: '$2a$10$N2G8zQ9t9UxXwb2qYAsD8u8jNNwA1qm0a6X2X1o1V7lJkE5mU3X.C',
    },
  });

  await prisma.income.createMany({
    data: [
      { userId: sampleUser.id, source: 'Salary', amount: 5200, receivedAt: new Date('2026-10-01'), note: 'Primary income' },
      { userId: sampleUser.id, source: 'Freelance', amount: 700, receivedAt: new Date('2026-10-15'), note: 'Design work' },
    ],
    skipDuplicates: true,
  });

  await prisma.expense.createMany({
    data: [
      { userId: sampleUser.id, category: 'food', amount: 420, spentAt: new Date('2026-10-12'), description: 'Groceries and dining', note: 'Higher than usual' },
      { userId: sampleUser.id, category: 'travel', amount: 260, spentAt: new Date('2026-10-08'), description: 'Fuel and commute', note: 'Office commute' },
      { userId: sampleUser.id, category: 'shopping', amount: 330, spentAt: new Date('2026-10-21'), description: 'Home items', note: 'Seasonal purchase' },
      { userId: sampleUser.id, category: 'bills', amount: 610, spentAt: new Date('2026-10-05'), description: 'Rent and utilities', note: 'Monthly fixed bills' },
    ],
    skipDuplicates: true,
  });

  await prisma.savingsGoal.createMany({
    data: [
      { userId: sampleUser.id, title: 'Emergency Fund', targetAmount: 10000, savedAmount: 4200, deadline: new Date('2027-12-31') },
      { userId: sampleUser.id, title: 'Vacation', targetAmount: 2500, savedAmount: 950, deadline: new Date('2027-06-30') },
    ],
    skipDuplicates: true,
  });

  await prisma.productWatch.createMany({
    data: [
      { userId: sampleUser.id, name: 'Noise Cancelling Headphones', category: 'electronics', desiredPrice: 180, currentPrice: 220, rating: 4.6, seller: 'BrandCart', productUrl: 'https://example.com/headphones', notes: 'Check price drop' },
      { userId: sampleUser.id, name: 'Portable Blender', category: 'home', desiredPrice: 70, currentPrice: 95, rating: 4.3, seller: 'DailyDeals', productUrl: 'https://example.com/blender', notes: 'Good value target' },
    ],
    skipDuplicates: true,
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

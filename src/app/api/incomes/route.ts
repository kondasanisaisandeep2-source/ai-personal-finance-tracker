import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { getSessionUserId } from '@/lib/session';
import { buildDashboardSummary } from '@/lib/finance';

export async function GET() {
  const userId = await getSessionUserId();

  if (!userId) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  const user = await db.user.findUnique({ where: { id: userId } });

  if (!user) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  const [income, expenses, savingsGoals, productWatches] = await Promise.all([
    db.income.findMany({ where: { userId }, orderBy: { receivedAt: 'desc' } }),
    db.expense.findMany({ where: { userId }, orderBy: { spentAt: 'desc' } }),
    db.savingsGoal.findMany({ where: { userId }, orderBy: { createdAt: 'desc' } }),
    db.productWatch.findMany({ where: { userId }, orderBy: { createdAt: 'desc' } }),
  ]);

  const summary = buildDashboardSummary({ income, expenses, savingsGoals });

  return NextResponse.json({
    user: { name: user.name, email: user.email },
    income,
    expenses,
    savingsGoals,
    productWatches,
    summary,
  });
}

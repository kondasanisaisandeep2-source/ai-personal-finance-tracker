import type { Prisma } from '@prisma/client';

export type DashboardData = {
  incomeTotal: number;
  expenseTotal: number;
  savingsTotal: number;
  balance: number;
  insight: string;
  categoryBreakdown: Array<{ label: string; value: number; }>;
  monthlyTrend: Array<{ label: string; income: number; expenses: number; savings: number; }>;
  nextMonthPlan: {
    extraExpense: number;
    recoveryPlan: number;
    remainingBudget: number;
  };
};

export function buildDashboardSummary(data: {
  income: Array<{ amount: number; receivedAt: Date | string }>; 
  expenses: Array<{ category: string; amount: number; spentAt: Date | string }>; 
  savingsGoals: Array<{ savedAmount: number; targetAmount: number }>; 
}): DashboardData {
  const incomeTotal = data.income.reduce((sum, item) => sum + Number(item.amount || 0), 0);
  const expenseTotal = data.expenses.reduce((sum, item) => sum + Number(item.amount || 0), 0);
  const savingsTotal = data.savingsGoals.reduce((sum, item) => sum + Number(item.savedAmount || 0), 0);
  const balance = incomeTotal - expenseTotal - savingsTotal;

  const categoryBreakdown = Object.entries(
    data.expenses.reduce<Record<string, number>>((acc, item) => {
      const key = String(item.category || 'other');
      acc[key] = (acc[key] || 0) + Number(item.amount || 0);
      return acc;
    }, {}),
  ).map(([label, value]) => ({ label, value }));

  const monthlyTrend = [
    { label: 'Jan', income: 4200, expenses: 2800, savings: 1200 },
    { label: 'Feb', income: 4300, expenses: 2900, savings: 1250 },
    { label: 'Mar', income: 4400, expenses: 3100, savings: 1300 },
    { label: 'Apr', income: 4700, expenses: 3300, savings: 1400 },
    { label: 'May', income: 4900, expenses: 3400, savings: 1450 },
    { label: 'Jun', income: 5000, expenses: 3500, savings: 1500 },
  ];

  const extraExpense = Math.max(0, expenseTotal - 3600);
  const recoveryPlan = extraExpense > 0 ? extraExpense / 2 : 0;
  const remainingBudget = Math.max(0, incomeTotal - expenseTotal - recoveryPlan - savingsTotal);

  const insight = expenseTotal > incomeTotal * 0.8
    ? 'Your spending is nearing a high-risk threshold. Consider trimming discretionary categories.'
    : 'Your finances are stable. Keep a strong emergency cushion and maintain your savings plan.';

  return {
    incomeTotal,
    expenseTotal,
    savingsTotal,
    balance,
    insight,
    categoryBreakdown,
    monthlyTrend,
    nextMonthPlan: {
      extraExpense,
      recoveryPlan,
      remainingBudget,
    },
  };
}

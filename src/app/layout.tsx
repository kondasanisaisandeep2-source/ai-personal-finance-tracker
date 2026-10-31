'use client';

import { useEffect, useMemo, useState } from 'react';
import { ArrowDownRight, ArrowUpRight, BadgeDollarSign, LogOut, PlusCircle, ShoppingCart, Sparkles, TrendingUp } from 'lucide-react';
import { formatCurrency } from '@/lib/utils';

type Income = {
  id: string;
  source: string;
  amount: number;
  receivedAt: string;
  note?: string | null;
};

type Expense = {
  id: string;
  category: string;
  amount: number;
  spentAt: string;
  description: string;
  note?: string | null;
};

type SavingsGoal = {
  id: string;
  title: string;
  targetAmount: number;
  savedAmount: number;
  deadline?: string | null;
  description?: string | null;
};

type ProductWatch = {
  id: string;
  name: string;
  category: string;
  desiredPrice?: number | null;
  currentPrice?: number | null;
  rating?: number | null;
  seller?: string | null;
  productUrl?: string | null;
  notes?: string | null;
};

type DashboardResponse = {
  user: { name: string; email: string };
  income: Income[];
  expenses: Expense[];
  savingsGoals: SavingsGoal[];
  productWatches: ProductWatch[];
  summary: {
    incomeTotal: number;
    expenseTotal: number;
    savingsTotal: number;
    balance: number;
    insight: string;
    categoryBreakdown: Array<{ label: string; value: number }>;
    nextMonthPlan: {
      extraExpense: number;
      recoveryPlan: number;
      remainingBudget: number;
    };
  };
};

const categoryOptions = ['food', 'travel', 'shopping', 'education', 'bills', 'entertainment'];

export default function DashboardShell() {
  const [data, setData] = useState<DashboardResponse | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const [incomeForm, setIncomeForm] = useState({ source: '', amount: '', receivedAt: '', note: '' });
  const [expenseForm, setExpenseForm] = useState({ category: 'food', amount: '', spentAt: '', description: '', note: '' });
  const [goalForm, setGoalForm] = useState({ title: '', targetAmount: '', savedAmount: '0', deadline: '', description: '' });
  const [shoppingForm, setShoppingForm] = useState({ name: '', category: 'electronics', desiredPrice: '', currentPrice: '', rating: '', seller: '', productUrl: '', notes: '' });

  async function loadDashboard() {
    setIsLoading(true);
    const response = await fetch('/api/dashboard');
    const payload = await response.json();
    setData(payload);
    setIsLoading(false);
  }

  useEffect(() => {
    loadDashboard();
  }, []);

  async function submitIncome(event: React.FormEvent) {
    event.preventDefault();
    await fetch('/api/incomes', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(incomeForm),
    });
    setIncomeForm({ source: '', amount: '', receivedAt: '', note: '' });
    await loadDashboard();
  }

  async function submitExpense(event: React.FormEvent) {
    event.preventDefault();
    await fetch('/api/expenses', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(expenseForm),
    });
    setExpenseForm({ category: 'food', amount: '', spentAt: '', description: '', note: '' });
    await loadDashboard();
  }

  async function submitGoal(event: React.FormEvent) {
    event.preventDefault();
    await fetch('/api/savings', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(goalForm),
    });
    setGoalForm({ title: '', targetAmount: '', savedAmount: '0', deadline: '', description: '' });
    await loadDashboard();
  }

  async function submitProduct(event: React.FormEvent) {
    event.preventDefault();
    await fetch('/api/shopping', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(shoppingForm),
    });
    setShoppingForm({ name: '', category: 'electronics', desiredPrice: '', currentPrice: '', rating: '', seller: '', productUrl: '', notes: '' });
    await loadDashboard();
  }

  async function logout() {
    await fetch('/api/auth/logout', { method: 'POST' });
    window.location.href = '/login';
  }

  const topCategories = useMemo(() => {
    return data?.summary.categoryBreakdown.slice(0, 5) ?? [];
  }, [data]);

  if (isLoading || !data) {
    return <div className="flex min-h-screen items-center justify-center text-slate-700">Loading dashboard...</div>;
  }

  return (
    <main className="min-h-screen bg-slate-50 p-4 text-slate-900 dark:bg-slate-950 dark:text-white md:p-8">
      <div className="mx-auto max-w-7xl">
        <header className="mb-8 flex flex-col gap-4 rounded-3xl border border-slate-200 bg-white p-5 shadow-soft dark:border-slate-800 dark:bg-slate-900 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-600">FinTrack AI</p>
            <h1 className="mt-2 text-3xl font-bold">Welcome, {data.user.name}</h1>
          </div>

          <button onClick={logout} className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-100 px-4 py-2 text-sm font-medium text-slate-700 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100">
            <LogOut className="h-4 w-4" />
            Logout
          </button>
        </header>

        <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          <SummaryCard title="Monthly income" value={formatCurrency(data.summary.incomeTotal)} icon={<ArrowUpRight className="h-5 w-5 text-emerald-500" />} />
          <SummaryCard title="Total expenses" value={formatCurrency(data.summary.expenseTotal)} icon={<ArrowDownRight className="h-5 w-5 text-red-500" />} />
          <SummaryCard title="Total savings" value={formatCurrency(data.summary.savingsTotal)} icon={<BadgeDollarSign className="h-5 w-5 text-brand-500" />} />
          <SummaryCard title="Remaining balance" value={formatCurrency(data.summary.balance)} icon={<TrendingUp className="h-5 w-5 text-violet-500" />} />
        </section>

        <section className="mt-8 grid gap-6 xl:grid-cols-[1.5fr_1fr]">
          <div className="space-y-6">
            <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-soft dark:border-slate-800 dark:bg-slate-900">
              <div className="mb-4 flex items-center justify-between">
                <h2 className="text-xl font-semibold">AI financial insight</h2>
                <Sparkles className="h-5 w-5 text-brand-500" />
              </div>
              <p className="text-slate-600 dark:text-slate-300">{data.summary.insight}</p>
              <div className="mt-5 grid gap-4 md:grid-cols-3">
                <MetricBox label="Unexpected expense" value={formatCurrency(data.summary.nextMonthPlan.extraExpense)} tone="amber" />
                <MetricBox label="Recovery plan" value={formatCurrency(data.summary.nextMonthPlan.recoveryPlan)} tone="blue" />
                <MetricBox label="Remaining budget" value={formatCurrency(data.summary.nextMonthPlan.remainingBudget)} tone="emerald" />
              </div>
            </div>

            <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-soft dark:border-slate-800 dark:bg-slate-900">
              <h2 className="mb-4 text-xl font-semibold">Spending by category</h2>
              <div className="space-y-3">
                {topCategories.length === 0 ? (
                  <p className="text-sm text-slate-500">No expenses yet. Add your first expense to create a category summary.</p>
                ) : (
                  topCategories.map((item) => (
                    <div key={item.label}>
                      <div className="mb-1 flex justify-between text-sm">
                        <span className="capitalize text-slate-600 dark:text-slate-300">{item.label}</span>
                        <span className="font-medium text-slate-900 dark:text-white">{formatCurrency(item.value)}</span>
                      </div>
                      <div className="h-2.5 rounded-full bg-slate-200 dark:bg-slate-700">
                        <div className="h-full rounded-full bg-gradient-to-r from-brand-500 to-emerald-500" style={{ width: `${Math.min((item.value / Math.max(data.summary.expenseTotal || 1, 1)) * 100, 100)}%` }} />
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-soft dark:border-slate-800 dark:bg-slate-900">
              <h2 className="mb-4 text-xl font-semibold">Recent entries</h2>
              <div className="space-y-4">
                {data.income.slice(0, 3).map((item) => (
                  <div key={item.id} className="rounded-2xl bg-slate-50 p-3 dark:bg-slate-800">
                    <div className="flex items-center justify-between">
                      <span className="font-medium">{item.source}</span>
                      <span className="text-emerald-500">+{formatCurrency(item.amount)}</span>
                    </div>
                    <p className="text-xs text-slate-500">{new Date(item.receivedAt).toLocaleDateString()}</p>
                  </div>
                ))}
                {data.expenses.slice(0, 3).map((item) => (
                  <div key={item.id} className="rounded-2xl bg-slate-50 p-3 dark:bg-slate-800">
                    <div className="flex items-center justify-between">
                      <span className="font-medium capitalize">{item.category}</span>
                      <span className="text-red-500">-{formatCurrency(item.amount)}</span>
                    </div>
                    <p className="text-xs text-slate-500">{item.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="mt-8 grid gap-6 xl:grid-cols-2">
          <FormCard title="Add income" action={submitIncome}>
            <div className="space-y-3">
              <input value={incomeForm.source} onChange={(e) => setIncomeForm({ ...incomeForm, source: e.target.value })} placeholder="Source" className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 dark:border-slate-700 dark:bg-slate-800" />
              <input type="number" value={incomeForm.amount} onChange={(e) => setIncomeForm({ ...incomeForm, amount: e.target.value })} placeholder="Amount" className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 dark:border-slate-700 dark:bg-slate-800" />
              <input type="date" value={incomeForm.receivedAt} onChange={(e) => setIncomeForm({ ...incomeForm, receivedAt: e.target.value })} className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 dark:border-slate-700 dark:bg-slate-800" />
              <textarea value={incomeForm.note} onChange={(e) => setIncomeForm({ ...incomeForm, note: e.target.value })} placeholder="Notes" className="min-h-20 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 dark:border-slate-700 dark:bg-slate-800" />
            </div>
          </FormCard>

          <FormCard title="Add expense" action={submitExpense}>
            <div className="space-y-3">
              <select value={expenseForm.category} onChange={(e) => setExpenseForm({ ...expenseForm, category: e.target.value })} className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 dark:border-slate-700 dark:bg-slate-800">
                {categoryOptions.map((category) => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
              <input type="number" value={expenseForm.amount} onChange={(e) => setExpenseForm({ ...expenseForm, amount: e.target.value })} placeholder="Amount" className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 dark:border-slate-700 dark:bg-slate-800" />
              <input type="date" value={expenseForm.spentAt} onChange={(e) => setExpenseForm({ ...expenseForm, spentAt: e.target.value })} className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 dark:border-slate-700 dark:bg-slate-800" />
              <input value={expenseForm.description} onChange={(e) => setExpenseForm({ ...expenseForm, description: e.target.value })} placeholder="Description" className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 dark:border-slate-700 dark:bg-slate-800" />
              <textarea value={expenseForm.note} onChange={(e) => setExpenseForm({ ...expenseForm, note: e.target.value })} placeholder="Notes" className="min-h-20 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 dark:border-slate-700 dark:bg-slate-800" />
            </div>
          </FormCard>

          <FormCard title="Savings goal" action={submitGoal}>
            <div className="space-y-3">
              <input value={goalForm.title} onChange={(e) => setGoalForm({ ...goalForm, title: e.target.value })} placeholder="Goal title" className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 dark:border-slate-700 dark:bg-slate-800" />
              <input type="number" value={goalForm.targetAmount} onChange={(e) => setGoalForm({ ...goalForm, targetAmount: e.target.value })} placeholder="Target amount" className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 dark:border-slate-700 dark:bg-slate-800" />
              <input type="number" value={goalForm.savedAmount} onChange={(e) => setGoalForm({ ...goalForm, savedAmount: e.target.value })} placeholder="Current savings" className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 dark:border-slate-700 dark:bg-slate-800" />
              <input type="date" value={goalForm.deadline} onChange={(e) => setGoalForm({ ...goalForm, deadline: e.target.value })} className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 dark:border-slate-700 dark:bg-slate-800" />
              <textarea value={goalForm.description} onChange={(e) => setGoalForm({ ...goalForm, description: e.target.value })} placeholder="Goal description" className="min-h-20 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 dark:border-slate-700 dark:bg-slate-800" />
            </div>
          </FormCard>

          <FormCard title="Smart shopping watch" action={submitProduct}>
            <div className="space-y-3">
              <input value={shoppingForm.name} onChange={(e) => setShoppingForm({ ...shoppingForm, name: e.target.value })} placeholder="Product name" className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 dark:border-slate-700 dark:bg-slate-800" />
              <input value={shoppingForm.category} onChange={(e) => setShoppingForm({ ...shoppingForm, category: e.target.value })} placeholder="Category" className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 dark:border-slate-700 dark:bg-slate-800" />
              <div className="grid gap-3 sm:grid-cols-2">
                <input type="number" value={shoppingForm.desiredPrice} onChange={(e) => setShoppingForm({ ...shoppingForm, desiredPrice: e.target.value })} placeholder="Target price" className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 dark:border-slate-700 dark:bg-slate-800" />
                <input type="number" value={shoppingForm.currentPrice} onChange={(e) => setShoppingForm({ ...shoppingForm, currentPrice: e.target.value })} placeholder="Current price" className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 dark:border-slate-700 dark:bg-slate-800" />
              </div>
              <div className="grid gap-3 sm:grid-cols-2">
                <input type="number" value={shoppingForm.rating} onChange={(e) => setShoppingForm({ ...shoppingForm, rating: e.target.value })} placeholder="Rating" className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 dark:border-slate-700 dark:bg-slate-800" />
                <input value={shoppingForm.seller} onChange={(e) => setShoppingForm({ ...shoppingForm, seller: e.target.value })} placeholder="Seller" className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 dark:border-slate-700 dark:bg-slate-800" />
              </div>
              <input value={shoppingForm.productUrl} onChange={(e) => setShoppingForm({ ...shoppingForm, productUrl: e.target.value })} placeholder="Product URL" className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 dark:border-slate-700 dark:bg-slate-800" />
              <textarea value={shoppingForm.notes} onChange={(e) => setShoppingForm({ ...shoppingForm, notes: e.target.value })} placeholder="Notes" className="min-h-20 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 dark:border-slate-700 dark:bg-slate-800" />
            </div>
          </FormCard>
        </section>

        <section className="mt-8 grid gap-6 lg:grid-cols-2">
          <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-soft dark:border-slate-800 dark:bg-slate-900">
            <h2 className="mb-4 text-xl font-semibold">Savings goals</h2>
            <div className="space-y-4">
              {data.savingsGoals.length === 0 ? (
                <p className="text-sm text-slate-500">No savings goals yet. Add one to start tracking.</p>
              ) : (
                data.savingsGoals.map((goal) => {
                  const progress = Math.min((goal.savedAmount / Math.max(goal.targetAmount, 1)) * 100, 100);
                  return (
                    <div key={goal.id} className="rounded-2xl bg-slate-50 p-4 dark:bg-slate-800">
                      <div className="mb-2 flex items-center justify-between">
                        <span className="font-medium">{goal.title}</span>
                        <span className="text-sm text-slate-500">{Math.round(progress)}%</span>
                      </div>
                      <div className="mb-2 h-2.5 rounded-full bg-slate-200 dark:bg-slate-700">
                        <div className="h-full rounded-full bg-gradient-to-r from-emerald-500 to-brand-500" style={{ width: `${progress}%` }} />
                      </div>
                      <div className="flex justify-between text-sm text-slate-600 dark:text-slate-300">
                        <span>{formatCurrency(goal.savedAmount)}</span>
                        <span>{formatCurrency(goal.targetAmount)}</span>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-soft dark:border-slate-800 dark:bg-slate-900">
            <h2 className="mb-4 text-xl font-semibold">Smart shopping list</h2>
            <div className="space-y-4">
              {data.productWatches.length === 0 ? (
                <p className="text-sm text-slate-500">No products added yet. Create a shopping watch to compare value.</p>
              ) : (
                data.productWatches.map((item) => (
                  <div key={item.id} className="rounded-2xl bg-slate-50 p-4 dark:bg-slate-800">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">{item.name}</p>
                        <p className="text-xs text-slate-500">{item.category}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-brand-600">{item.currentPrice ? formatCurrency(item.currentPrice) : 'N/A'}</p>
                        <p className="text-xs text-slate-500">Target {item.desiredPrice ? formatCurrency(item.desiredPrice) : 'N/A'}</p>
                      </div>
                    </div>
                    <div className="mt-2 flex items-center justify-between text-xs text-slate-500">
                      <span>Seller: {item.seller || 'Local pick'}</span>
                      <span>Rating: {item.rating ?? '—'}</span>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}

function SummaryCard({ title, value, icon }: { title: string; value: string; icon: React.ReactNode }) {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-soft dark:border-slate-800 dark:bg-slate-900">
      <div className="flex items-center justify-between">
        <p className="text-sm text-slate-500 dark:text-slate-400">{title}</p>
        <div className="rounded-full bg-slate-100 p-2 dark:bg-slate-800">{icon}</div>
      </div>
      <p className="mt-5 text-3xl font-bold text-slate-900 dark:text-white">{value}</p>
    </div>
  );
}

function MetricBox({ label, value, tone }: { label: string; value: string; tone: 'amber' | 'blue' | 'emerald' }) {
  const toneClasses = {
    amber: 'bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-200',
    blue: 'bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-200',
    emerald: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-200',
  };

  return (
    <div className={`rounded-2xl p-4 ${toneClasses[tone]}`}>
      <p className="text-xs uppercase tracking-[0.12em]">{label}</p>
      <p className="mt-2 text-xl font-bold">{value}</p>
    </div>
  );
}

function FormCard({ title, children, action }: { title: string; children: React.ReactNode; action: (event: React.FormEvent) => void }) {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-soft dark:border-slate-800 dark:bg-slate-900">
      <h2 className="mb-4 text-xl font-semibold">{title}</h2>
      <form onSubmit={action} className="space-y-3">
        {children}
        <button type="submit" className="inline-flex items-center gap-2 rounded-xl bg-brand-600 px-4 py-2.5 font-medium text-white hover:bg-brand-700">
          <PlusCircle className="h-4 w-4" />
          Save
        </button>
      </form>
    </div>
  );
}

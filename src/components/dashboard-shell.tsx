'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { BarChart3, Lightbulb, PiggyBank, ShieldCheck, ShoppingBag, Sparkles } from 'lucide-react';

const featureCards = [
  { icon: PiggyBank, title: 'Savings planning', text: 'Track goals, monthly progress, and money left after expenses.' },
  { icon: BarChart3, title: 'Smart budgeting', text: 'Review real monthly trends and spending categories.' },
  { icon: ShoppingBag, title: 'Smart shopping', text: 'Compare products and identify value-for-money purchases.' },
  { icon: Lightbulb, title: 'AI guidance', text: 'Get useful suggestions to reduce waste and improve your budget.' },
];

export default function LandingPage() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(59,130,246,0.16),_transparent_40%),linear-gradient(180deg,#f8fafc_0%,#e2e8f0_100%)] text-slate-900 dark:bg-slate-950 dark:text-white">
      <div className="mx-auto max-w-7xl px-6 py-8">
        <header className="flex items-center justify-between rounded-full border border-slate-200 bg-white/70 px-5 py-3 shadow-soft backdrop-blur dark:border-slate-800 dark:bg-slate-900/70">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-600 text-white">
              <PiggyBank className="h-5 w-5" />
            </div>
            <div>
              <p className="text-sm font-semibold tracking-[0.2em] text-brand-600 uppercase">FinTrack AI</p>
            </div>
          </div>

          <nav className="hidden items-center gap-6 md:flex">
            <Link href="#features" className="text-sm font-medium text-slate-700 dark:text-slate-200">Features</Link>
            <Link href="#dashboard" className="text-sm font-medium text-slate-700 dark:text-slate-200">Dashboard</Link>
            <Link href="#security" className="text-sm font-medium text-slate-700 dark:text-slate-200">Privacy</Link>
          </nav>

          <div className="flex items-center gap-3">
            <Link href="/login" className="rounded-full border border-slate-200 px-4 py-2 text-sm font-medium text-slate-800 dark:border-slate-700 dark:text-slate-100">
              Login
            </Link>
            <Link href="/register" className="rounded-full bg-brand-600 px-4 py-2 text-sm font-medium text-white shadow-lg shadow-brand-600/30">
              Get started
            </Link>
          </div>
        </header>

        <section className="grid items-center gap-12 py-18 md:grid-cols-2 md:py-20">
          <div>
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-brand-200 bg-brand-50 px-3 py-1 text-sm font-medium text-brand-700 dark:border-brand-900 dark:bg-brand-950/40 dark:text-brand-200">
              <Sparkles className="h-4 w-4" />
              Smart personal finance assistant
            </div>
            <h1 className="max-w-xl text-5xl font-black tracking-tight text-slate-900 dark:text-white md:text-6xl">
              Budget better. Save more. Shop smarter.
            </h1>
            <p className="mt-6 max-w-lg text-lg text-slate-600 dark:text-slate-300">
              Track income, expenses, monthly goals, and smart product decisions from one modern dashboard built for everyday financial clarity.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link href="/register" className="rounded-full bg-brand-600 px-6 py-3 text-base font-semibold text-white shadow-lg shadow-brand-600/30 hover:bg-brand-700">
                Start free
              </Link>
              <Link href="#features" className="rounded-full border border-slate-200 bg-white px-6 py-3 text-base font-semibold text-slate-800 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100">
                Explore features
              </Link>
            </div>
            <div className="mt-8 flex items-center gap-3 text-sm text-slate-600 dark:text-slate-300">
              <ShieldCheck className="h-4 w-4 text-emerald-500" />
              Private finance tracking with secure login
            </div>
          </div>

          <div className="relative">
            <div className="absolute -left-8 top-12 h-48 w-48 rounded-full bg-brand-500/20 blur-3xl" />
            <div className="absolute -right-8 bottom-16 h-48 w-48 rounded-full bg-violet-500/20 blur-3xl" />
            <div className="relative overflow-hidden rounded-[2rem] border border-slate-200 bg-white/80 p-6 shadow-soft dark:border-slate-800 dark:bg-slate-900/80">
              <div className="mb-5 flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-500 dark:text-slate-400">Overview</p>
                  <h3 className="text-2xl font-bold text-slate-900 dark:text-white">October</h3>
                </div>
                <div className="rounded-full bg-emerald-100 px-3 py-1 text-sm font-semibold text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300">
                  +12.4% net gain
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="rounded-2xl bg-slate-50 p-4 dark:bg-slate-800">
                  <p className="text-sm text-slate-500 dark:text-slate-400">Income</p>
                  <p className="mt-2 text-3xl font-bold text-slate-900 dark:text-white">$5,900</p>
                </div>
                <div className="rounded-2xl bg-slate-50 p-4 dark:bg-slate-800">
                  <p className="text-sm text-slate-500 dark:text-slate-400">Expenses</p>
                  <p className="mt-2 text-3xl font-bold text-slate-900 dark:text-white">$3,250</p>
                </div>
                <div className="rounded-2xl bg-slate-50 p-4 dark:bg-slate-800">
                  <p className="text-sm text-slate-500 dark:text-slate-400">Savings</p>
                  <p className="mt-2 text-3xl font-bold text-slate-900 dark:text-white">$1,980</p>
                </div>
                <div className="rounded-2xl bg-slate-50 p-4 dark:bg-slate-800">
                  <p className="text-sm text-slate-500 dark:text-slate-400">Remaining</p>
                  <p className="mt-2 text-3xl font-bold text-slate-900 dark:text-white">$670</p>
                </div>
              </div>

              <div className="mt-6 rounded-2xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-700 dark:bg-slate-800">
                <div className="mb-3 flex items-center justify-between text-sm">
                  <span className="font-medium text-slate-600 dark:text-slate-300">Budget progress</span>
                  <span className="font-semibold text-slate-900 dark:text-white">68%</span>
                </div>
                <div className="h-3 w-full overflow-hidden rounded-full bg-slate-200 dark:bg-slate-700">
                  <div className="h-full w-[68%] rounded-full bg-gradient-to-r from-brand-500 to-emerald-500" />
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="features" className="py-10 md:py-16">
          <div className="mb-8 text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-600">Core features</p>
            <h2 className="mt-3 text-3xl font-bold text-slate-900 dark:text-white">Designed for modern money management</h2>
          </div>

          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {featureCards.map((card) => {
              const Icon = card.icon;
              return (
                <div key={card.title} className="rounded-3xl border border-slate-200 bg-white/70 p-6 shadow-soft dark:border-slate-800 dark:bg-slate-900/70">
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-100 text-brand-600 dark:bg-brand-950 dark:text-brand-200">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="text-xl font-semibold text-slate-900 dark:text-white">{card.title}</h3>
                  <p className="mt-3 text-sm leading-6 text-slate-600 dark:text-slate-300">{card.text}</p>
                </div>
              );
            })}
          </div>
        </section>

        <section id="security" className="py-10 md:py-16">
          <div className="rounded-3xl border border-slate-200 bg-slate-900 p-8 text-white shadow-soft dark:border-slate-700">
            <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-200">Privacy first</p>
                <h3 className="mt-2 text-3xl font-bold">Your financial data stays private.</h3>
              </div>
              <div className="rounded-full bg-white/10 px-4 py-2 text-sm font-medium text-brand-100">
                Secure user accounts • Private records • No automatic purchases
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}

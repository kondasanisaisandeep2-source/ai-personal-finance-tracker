import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { getSessionUserId } from '@/lib/session';
import { incomeSchema } from '@/lib/validators';

export async function POST(request: Request) {
  const userId = await getSessionUserId();
  if (!userId) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  const body = await request.json();
  const parsed = incomeSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json({ message: parsed.error.issues[0]?.message || 'Invalid input' }, { status: 400 });
  }

  const data = parsed.data;

  const income = await db.income.create({
    data: {
      userId,
      source: data.source,
      amount: Number(data.amount),
      receivedAt: new Date(data.receivedAt),
      note: data.note || null,
    },
  });

  return NextResponse.json({ income }, { status: 201 });
}

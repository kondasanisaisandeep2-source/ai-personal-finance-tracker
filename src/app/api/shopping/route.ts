import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { getSessionUserId } from '@/lib/session';
import { savingsGoalSchema } from '@/lib/validators';

export async function POST(request: Request) {
  const userId = await getSessionUserId();
  if (!userId) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  const body = await request.json();
  const parsed = savingsGoalSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json({ message: parsed.error.issues[0]?.message || 'Invalid input' }, { status: 400 });
  }

  const data = parsed.data;

  const goal = await db.savingsGoal.create({
    data: {
      userId,
      title: data.title,
      targetAmount: Number(data.targetAmount),
      savedAmount: Number(data.savedAmount || 0),
      deadline: data.deadline ? new Date(data.deadline) : null,
      description: data.description || null,
    },
  });

  return NextResponse.json({ goal }, { status: 201 });
}

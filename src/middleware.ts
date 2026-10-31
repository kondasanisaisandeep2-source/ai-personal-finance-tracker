import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { getSessionUserId } from '@/lib/session';
import { shoppingItemSchema } from '@/lib/validators';

export async function POST(request: Request) {
  const userId = await getSessionUserId();
  if (!userId) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  const body = await request.json();
  const parsed = shoppingItemSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json({ message: parsed.error.issues[0]?.message || 'Invalid input' }, { status: 400 });
  }

  const data = parsed.data;

  const item = await db.productWatch.create({
    data: {
      userId,
      name: data.name,
      category: data.category,
      desiredPrice: data.desiredPrice ?? null,
      currentPrice: data.currentPrice ?? null,
      rating: data.rating ?? null,
      seller: data.seller || null,
      productUrl: data.productUrl || null,
      notes: data.notes || null,
    },
  });

  return NextResponse.json({ item }, { status: 201 });
}

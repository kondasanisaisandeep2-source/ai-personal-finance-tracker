import type { NextRequest } from 'next/server';

export async function getJsonBody(request: NextRequest) {
  return request.json();
}

export function getErrorMessage(error: unknown) {
  if (error instanceof Error) return error.message;
  return 'Something went wrong';
}

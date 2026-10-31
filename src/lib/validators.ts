import { z } from 'zod';

export const registerSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Use a valid email'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

export const loginSchema = z.object({
  email: z.string().email('Use a valid email'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

export const incomeSchema = z.object({
  source: z.string().min(1, 'Source is required'),
  amount: z.coerce.number().positive('Amount must be greater than zero'),
  receivedAt: z.string().min(1, 'Date is required'),
  note: z.string().optional(),
});

export const expenseSchema = z.object({
  category: z.string().min(1, 'Category is required'),
  amount: z.coerce.number().positive('Amount must be greater than zero'),
  spentAt: z.string().min(1, 'Date is required'),
  description: z.string().min(1, 'Description is required'),
  note: z.string().optional(),
});

export const savingsGoalSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  targetAmount: z.coerce.number().positive('Target amount must be greater than zero'),
  savedAmount: z.coerce.number().min(0, 'Saved amount cannot be negative').default(0),
  deadline: z.string().optional().or(z.literal('')),
  description: z.string().optional(),
});

export const shoppingItemSchema = z.object({
  name: z.string().min(1, 'Product name is required'),
  category: z.string().min(1, 'Category is required'),
  desiredPrice: z.coerce.number().min(0, 'Desired price cannot be negative').nullable().optional(),
  currentPrice: z.coerce.number().min(0, 'Current price cannot be negative').nullable().optional(),
  rating: z.coerce.number().min(0).max(5).nullable().optional(),
  seller: z.string().optional(),
  productUrl: z.string().optional(),
  notes: z.string().optional(),
});

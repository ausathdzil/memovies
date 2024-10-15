'use server';

import { db } from '@/db';
import { users } from '@/db/schema';
import bcrypt from 'bcrypt';
import { z } from 'zod';
import { createSession } from './session';
import { redirect } from 'next/navigation';
import { eq } from 'drizzle-orm';

const SignUpFormSchema = z.object({
  name: z
    .string()
    .min(2, { message: 'Name must be at least 2 characters long.' })
    .trim(),
  email: z.string().email({ message: 'Invalid email address.' }).trim(),
  password: z
    .string()
    .min(8, { message: 'Be at least 8 characters long.' })
    .regex(/[a-zA-Z]/, { message: 'Contain at least one letter.' })
    .regex(/[0-9]/, { message: 'Contain at least one number.' })
    .trim(),
});

export type SignUpState =
  | {
      success: boolean;
      message?: string | null;
      errors?: {
        name?: string[];
        email?: string[];
        password?: string[];
      };
    }
  | undefined;

export async function signup(prevState: SignUpState, formData: FormData) {
  const validatedFields = SignUpFormSchema.safeParse({
    name: formData.get('name'),
    email: formData.get('email'),
    password: formData.get('password'),
  });

  if (!validatedFields.success) {
    return {
      success: false,
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }
  const { name, email, password } = validatedFields.data;
  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    const data = await db
      .insert(users)
      .values({ name, email, password: hashedPassword })
      .returning({ id: users.id });
    const user = data[0];
    await createSession(user.id);
    redirect('/dashboard');
  } catch (error) {
    return {
      success: false,
      message: 'Sign up failed.',
    };
  }
}

export type LoginState =
  | {
      success: boolean;
      message?: string | null;
      errors?: {
        email?: string[];
        password?: string[];
      };
    }
  | undefined;

const LoginFormSchema = z.object({
  email: z
    .string()
    .email({
      message: 'Please enter your email.',
    })
    .trim(),
  password: z
    .string()
    .min(1, {
      message: 'Please enter your password.',
    })
    .trim(),
});

export async function login(prevState: LoginState, formData: FormData) {
  const validatedFields = LoginFormSchema.safeParse({
    email: formData.get('email'),
    password: formData.get('password'),
  });

  if (!validatedFields.success) {
    return {
      success: false,
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  const { email, password } = validatedFields.data;

  const user = await db.select().from(users).where(eq(users.email, email));
  if (!user) {
    return {
      success: false,
      message: 'Invalid login credentials',
    };
  }

  const passwordMatch = await bcrypt.compare(password, user[0].password);
  if (!passwordMatch) {
    return {
      success: false,
      message: 'Invalid login credentials',
    };
  }

  await createSession(user[0].id);
}

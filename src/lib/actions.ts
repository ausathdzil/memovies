'use server';

import { z } from 'zod';
import bcrypt from 'bcrypt';

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

export type State = {
  success: boolean;
  message?: string | null;
  errors?: {
    name?: string[];
    email?: string[];
    password?: string[];
  };
};

export async function signup(prevState: State, formData: FormData) {
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
    console.log('User signed up:', { name, email, password: hashedPassword });
  } catch (error) {
    return {
      success: false,
      message: 'Sign up failed.',
    };
  }

  return {
    success: true,
    message: 'Sign up successful.',
  };
}

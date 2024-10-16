'use server';

import { db } from '@/db';
import {
  collectionMedia,
  collections,
  movies,
  userMedia,
  users,
} from '@/db/schema';
import { createSession } from '@/lib/session';
import bcrypt from 'bcrypt';
import { and, eq } from 'drizzle-orm';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { z } from 'zod';

const SignUpFormSchema = z.object({
  name: z
    .string()
    .min(2, { message: 'Name must be at least 2 characters long.' })
    .max(50, { message: 'Name should not exceed 50 characters.' })
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

  const existingUser = await db
    .select()
    .from(users)
    .where(eq(users.email, email))
    .limit(1);

  if (existingUser.length > 0) {
    return {
      success: false,
      errors: {
        email: ['Email already exists, please use a different email or login.'],
      },
    };
  }

  const user = await db
    .insert(users)
    .values({ name, email, password: hashedPassword })
    .returning({ id: users.id });

  if (!user[0]) {
    return {
      success: false,
      message: 'Sign up failed.',
    };
  }

  await createSession(user[0].id);
  redirect('/dashboard');
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

  const user = await db
    .select()
    .from(users)
    .where(eq(users.email, email))
    .limit(1);

  if (!user[0]) {
    return {
      success: false,
      errors: {
        email: ['Email not found.'],
      },
    };
  }

  const passwordMatch = await bcrypt.compare(password, user[0].password);
  if (!passwordMatch) {
    return {
      success: false,
      errors: {
        password: ['Incorrect password.'],
      },
    };
  }

  await createSession(user[0].id);
}

export async function addMoviesToLiked(userId: string, formData: FormData) {
  const tmdbId = Number(formData.get('tmdbId'));
  const title = formData.get('title') as string;
  const mediaType = formData.get('mediaType') as string;
  const posterPath = formData.get('posterPath') as string;

  const existingCollection = await db
    .select()
    .from(collections)
    .where(and(eq(collections.userId, userId), eq(collections.name, 'Liked')))
    .limit(1);

  let collectionId: string;

  if (existingCollection.length > 0) {
    collectionId = existingCollection[0].id;
  } else {
    const newCollection = await db
      .insert(collections)
      .values({
        name: 'Liked',
        userId,
      })
      .returning({ id: collections.id });

    collectionId = newCollection[0].id;
  }

  const exisitngMedia = await db
    .select()
    .from(userMedia)
    .where(and(eq(userMedia.tmdbId, tmdbId), eq(userMedia.userId, userId)))
    .limit(1);

  if (exisitngMedia.length > 0) {
    return;
  }

  const media = await db
    .insert(userMedia)
    .values({
      tmdbId,
      title,
      mediaType,
      userId,
    })
    .returning({ mediaId: userMedia.id });

  const mediaId = media[0].mediaId;

  await db.insert(movies).values({
    tmdbId,
    posterPath,
    title,
    mediaId,
  });

  await db.insert(collectionMedia).values({
    collectionId,
    mediaId,
  });

  revalidatePath(`/dashboard`);
}

export async function removeMoviesFromLiked(
  userId: string,
  formData: FormData
) {
  const movieId = Number(formData.get('tmdbId'));

  const media = await db
    .select()
    .from(userMedia)
    .where(and(eq(userMedia.tmdbId, movieId), eq(userMedia.userId, userId)));

  if (!media[0]) {
    return;
  }

  await db.delete(movies).where(eq(movies.mediaId, media[0].id));
  await db
    .delete(collectionMedia)
    .where(eq(collectionMedia.mediaId, media[0].id));
  await db.delete(userMedia).where(eq(userMedia.id, media[0].id));

  revalidatePath(`/dashboard`);
}

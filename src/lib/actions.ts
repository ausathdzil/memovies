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
import { revalidatePath, revalidateTag } from 'next/cache';
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

  await db
    .insert(collections)
    .values({ userId: user[0].id, name: 'Liked' })
    .returning({ id: collections.id });

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

export async function addMovieToLiked(userId: string, formData: FormData) {
  const movieData = {
    tmdbId: Number(formData.get('tmdbId')),
    title: formData.get('title') as string,
    mediaType: formData.get('mediaType') as string,
    posterPath: formData.get('posterPath') as string,
  };

  const [likedCollection] = await db
    .select()
    .from(collections)
    .where(and(eq(collections.userId, userId), eq(collections.name, 'Liked')))
    .limit(1);

  const [userMediaEntry] = await db
    .insert(userMedia)
    .values({
      userId,
      tmdbId: movieData.tmdbId,
      title: movieData.title,
      mediaType: movieData.mediaType,
    })
    .returning({
      id: userMedia.id,
    });

  await db.insert(movies).values({
    tmdbId: movieData.tmdbId,
    posterPath: movieData.posterPath,
    title: movieData.title,
    mediaId: userMediaEntry.id,
  });

  await db.insert(collectionMedia).values({
    collectionId: likedCollection.id,
    mediaId: userMediaEntry.id,
  });

  revalidateTag(`user-${userId}-media-${movieData.tmdbId}`);
  revalidatePath('/dashboard');
}

export async function removeMovieFromLiked(userId: string, formData: FormData) {
  const tmdbId = Number(formData.get('tmdbId'));
  const media = await db
    .select()
    .from(userMedia)
    .where(and(eq(userMedia.userId, userId), eq(userMedia.tmdbId, tmdbId)))
    .limit(1);

  if (media.length === 0) {
    return;
  }

  const mediaId = media[0].id;
  await db.delete(collectionMedia).where(eq(collectionMedia.mediaId, mediaId));
  await db.delete(movies).where(eq(movies.mediaId, mediaId));
  await db.delete(userMedia).where(eq(userMedia.id, mediaId));

  revalidateTag(`user-${userId}-media-${tmdbId}`);
  revalidatePath('/dashboard');
}

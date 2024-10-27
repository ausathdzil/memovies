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
    .min(2, { message: 'Name is required.' })
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
      message: 'Invalid credentials.',
    };
  }

  const passwordMatch = await bcrypt.compare(password, user[0].password);

  if (!passwordMatch) {
    return {
      success: false,
      message: 'Invalid credentials.',
    };
  }

  await createSession(user[0].id);
  redirect('/dashboard');
}

const UpdateAccountSchema = z.object({
  name: z
    .string()
    .min(2, { message: 'Name is required.' })
    .max(50, { message: 'Name should not exceed 50 characters.' })
    .trim(),
  email: z.string().email({ message: 'Invalid email address.' }).trim(),
});

export type UpdateAccountState =
  | {
      success: boolean;
      message?: string | null;
      errors?: {
        name?: string[];
        email?: string[];
      };
    }
  | undefined;

export async function updateAccount(
  userId: string,
  prevState: UpdateAccountState,
  formData: FormData
) {
  const validatedFields = UpdateAccountSchema.safeParse({
    name: formData.get('name'),
    email: formData.get('email'),
  });

  if (!validatedFields.success) {
    return {
      success: false,
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  const { name, email } = validatedFields.data;

  try {
    await db.update(users).set({ name, email }).where(eq(users.id, userId));
  } catch (error) {
    return {
      success: false,
      message: 'Failed to update account.',
    };
  }

  revalidatePath('/dashboard');
  return {
    success: true,
    message: 'Account updated successfully.',
  };
}

const UpdatePasswordSchema = z.object({
  currentPassword: z
    .string()
    .min(1, { message: 'Please enter your current password.' })
    .trim(),
  newPassword: z
    .string()
    .min(8, { message: 'Be at least 8 characters long.' })
    .regex(/[a-zA-Z]/, { message: 'Contain at least one letter.' })
    .regex(/[0-9]/, { message: 'Contain at least one number.' })
    .trim(),
});

export type UpdatePasswordState =
  | {
      success: boolean;
      message?: string | null;
      errors?: {
        currentPassword?: string[];
        newPassword?: string[];
      };
    }
  | undefined;

export async function updatePassword(
  userId: string,
  prevState: UpdatePasswordState,
  formData: FormData
) {
  const validatedFields = UpdatePasswordSchema.safeParse({
    currentPassword: formData.get('currentPassword'),
    newPassword: formData.get('newPassword'),
  });

  if (!validatedFields.success) {
    return {
      success: false,
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  const { currentPassword, newPassword } = validatedFields.data;

  const user = await db
    .select()
    .from(users)
    .where(eq(users.id, userId))
    .limit(1);

  const passwordMatch = await bcrypt.compare(currentPassword, user[0].password);

  if (!passwordMatch) {
    return {
      success: false,
      errors: {
        currentPassword: ['Incorrect password.'],
      },
    };
  }

  const hashedPassword = await bcrypt.hash(newPassword, 10);

  try {
    await db
      .update(users)
      .set({ password: hashedPassword })
      .where(eq(users.id, userId));
  } catch (error) {
    return {
      success: false,
      message: 'Failed to update password.',
    };
  }

  return {
    success: true,
    message: 'Password updated successfully.',
  };
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
  revalidateTag(`liked-movies-${userId}`);
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
  revalidateTag(`liked-movies-${userId}`);
  revalidatePath('/dashboard');
}

const CreateCollectionSchema = z.object({
  name: z
    .string()
    .min(2, { message: 'Collection name is required.' })
    .max(50, { message: 'Collection name should not exceed 50 characters.' })
    .trim(),
  description: z
    .string()
    .max(255, { message: 'Description should not exceed 255 characters.' })
    .optional(),
});

export type CreateCollectionState =
  | {
      success: boolean;
      message?: string | null;
      errors?: {
        name?: string[];
      };
    }
  | undefined;

export async function createCollection(
  userId: string,
  prevState: CreateCollectionState,
  formData: FormData
) {
  const validatedFields = CreateCollectionSchema.safeParse({
    name: formData.get('name'),
    description: formData.get('description'),
  });

  if (!validatedFields.success) {
    return {
      success: false,
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  const { name, description } = validatedFields.data;

  const existingCollection = await db
    .select()
    .from(collections)
    .where(and(eq(collections.userId, userId), eq(collections.name, name)))
    .limit(1);

  if (existingCollection.length > 0) {
    return {
      success: false,
      errors: {
        name: ['Collection with this name already exists.'],
      },
    };
  }

  await db.insert(collections).values({ userId, name, description });

  revalidateTag(`collections-${userId}`);
  revalidatePath('/dashboard');
  return {
    success: true,
    message: 'Collection created successfully.',
  };
}

export type AddMovieToCollectionState =
  | {
      success: boolean;
      message?: string | null;
    }
  | undefined;

export async function addMovieToCollection(
  userId: string,
  prevState: AddMovieToCollectionState,
  formData: FormData
) {
  const movieData = {
    tmdbId: Number(formData.get('tmdbId')),
    title: formData.get('title') as string,
    mediaType: formData.get('mediaType') as string,
    posterPath: formData.get('posterPath') as string,
    collectionId: formData.get('collectionId') as string,
  };

  const userMediaEntry = await db
    .select()
    .from(userMedia)
    .where(
      and(eq(userMedia.userId, userId), eq(userMedia.tmdbId, movieData.tmdbId))
    )
    .limit(1);

  let userMediaId;

  if (userMediaEntry.length === 0) {
    const insertedUserMedia = await db
      .insert(userMedia)
      .values({
        userId,
        tmdbId: movieData.tmdbId,
        title: movieData.title,
        mediaType: movieData.mediaType,
      })
      .returning({ id: userMedia.id });

    userMediaId = insertedUserMedia[0].id;
  } else {
    userMediaId = userMediaEntry[0].id;
  }

  const existingCollectionMedia = await db
    .select()
    .from(collectionMedia)
    .where(
      and(
        eq(collectionMedia.collectionId, movieData.collectionId),
        eq(collectionMedia.mediaId, userMediaId)
      )
    )
    .limit(1);

  if (existingCollectionMedia.length === 0) {
    try {
      await db.insert(collectionMedia).values({
        collectionId: movieData.collectionId,
        mediaId: userMediaId,
      });

      revalidateTag(`collection-items-${movieData.collectionId}`);
      revalidateTag(`user-${userId}-media-${movieData.tmdbId}`);
      revalidateTag(`user-medias-${userId}`);
      revalidatePath('/dashboard');
      return {
        success: true,
        message: 'Movie added to collection successfully.',
      };
    } catch (error) {
      return {
        success: false,
        message: 'Movie already exists in this collection.',
      };
    }
  }

  return {
    success: false,
    message: 'Movie already exists in this collection.',
  };
}

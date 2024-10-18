'use client';

import { Button } from '@/components/ui/button';
import { addMoviesToLiked, removeMoviesFromLiked } from '@/lib/actions';
import { Movie } from '@/lib/definitions';
import clsx from 'clsx';
import { Heart, Loader2 } from 'lucide-react';
import { useState, useTransition } from 'react';

export default function LikeButton({
  movie,
  userId,
  initialLiked,
}: {
  movie: Movie;
  userId: string;
  initialLiked: boolean;
}) {
  const [liked, setLiked] = useState(initialLiked);
  const [pending, startTransition] = useTransition();

  const handleAction = async (formData: FormData) => {
    startTransition(async () => {
      if (liked) {
        await removeMoviesFromLiked(userId, formData);
      } else {
        await addMoviesToLiked(userId, formData);
      }
      setLiked(!liked);
    });
  };

  return (
    <form action={handleAction}>
      <input type="hidden" name="tmdbId" value={movie.id} />
      <input type="hidden" name="title" value={movie.title} />
      <input type="hidden" name="mediaType" value="movie" />
      <input type="hidden" name="posterPath" value={movie.poster_path} />
      <Button
        className="border-2 border-black shadow-[4px_4px_0_0_rgba(0,0,0,1)]"
        variant="secondary"
        type="submit"
        disabled={pending}
      >
        {pending ? (
          <Loader2 className="mr-2 animate-spin" size={16} />
        ) : (
          <Heart
            className={clsx('mr-2', {
              'text-red-500 fill-red-500': liked,
            })}
            size={16}
          />
        )}
        <span>Like</span>
      </Button>
    </form>
  );
}

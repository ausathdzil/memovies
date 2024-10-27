'use client';

import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Collection } from '@/db/schema';
import { addMovieToCollection } from '@/lib/actions';
import { Movie } from '@/lib/definitions';
import { Loader2, PlusCircle } from 'lucide-react';
import { useTransition } from 'react';

export default function CollectionForm({
  movie,
  userId,
  collections,
}: {
  movie: Movie;
  userId: string;
  collections: Collection[];
}) {
  const [pending, startTransition] = useTransition();
  const addMovieToCollectionWithId = addMovieToCollection.bind(null, userId);

  const handleAction = (formData: FormData) => {
    startTransition(async () => {
      await addMovieToCollectionWithId(formData);
    });
  };

  return (
    <form className="space-y-4" action={handleAction}>
      <input type="hidden" name="tmdbId" value={movie.id} />
      <input type="hidden" name="title" value={movie.title} />
      <input type="hidden" name="mediaType" value="movie" />
      <input type="hidden" name="posterPath" value={movie.poster_path} />
      <RadioGroup name="collectionId" className="space-y-2">
        {collections.map((collection) => (
          <div key={collection.id} className="flex items-center">
            <RadioGroupItem
              id={`collectionId-${collection.id}`}
              value={collection.id}
              className="mr-2"
            />
            <Label htmlFor={`collectionId-${collection.id}`}>
              {collection.name}
            </Label>
          </div>
        ))}
      </RadioGroup>
      <Button
        className="border-2 border-zinc-950 shadow-[4px_4px_0_0_rgba(0,0,0,1)]"
        variant="secondary"
        type="submit"
        disabled={pending}
      >
        {pending ? (
          <Loader2 className="mr-2 animate-spin" size={16} />
        ) : (
          <PlusCircle className="mr-2" size={16} />
        )}
        <span>Add to collection</span>
      </Button>
    </form>
  );
}

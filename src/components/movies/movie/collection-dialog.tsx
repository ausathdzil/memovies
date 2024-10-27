import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { getCollections } from '@/lib/data';
import { PlusCircle } from 'lucide-react';
import CollectionForm from './collection-form';
import { Movie } from '@/lib/definitions';

export default async function CollectionDialog({
  movie,
  userId,
}: {
  movie: Movie;
  userId: string;
}) {
  const userCollections = await getCollections(userId);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          className="border-2 border-zinc-950 shadow-[4px_4px_0_0_rgba(0,0,0,1)]"
          variant="secondary"
          type="submit"
        >
          <PlusCircle className="mr-2" size={16} />
          <span>Add to collection</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="border-2shadow-[6px_6px_0_0_rgba(20,184,166,1)]">
        <DialogHeader>
          <DialogTitle>Add to collection</DialogTitle>
          <DialogDescription>
            Which collection would you like to add this to?
          </DialogDescription>
          <CollectionForm
            movie={movie}
            userId={userId}
            collections={userCollections}
          />
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}

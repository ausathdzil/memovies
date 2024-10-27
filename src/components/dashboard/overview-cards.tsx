import { CreateCollectionForm } from '@/components/dashboard/create-collection-form';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Collection, Movie, UserMedia } from '@/db/schema';
import {
  getCollections,
  getLikedMovies,
  getSortedUserMedias,
  getUser,
} from '@/lib/data';
import { Clock, Heart, List, Plus } from 'lucide-react';
import Link from 'next/link';

export async function OverviewCards() {
  const user = await getUser();
  const [userMedias, collections, likedMovies] = await Promise.all([
    getSortedUserMedias(user.id),
    getCollections(user.id),
    getLikedMovies(user.id),
  ]);

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-3 gap-4">
        <RecentActivities userMedias={userMedias} />
        <UserCollections collections={collections} />
        <UserStats
          userMediasLength={userMedias.length}
          collectionsLength={collections.length}
        />
      </div>
      <div className="space-y-4">
        <div className="flex items-center text-xl">
          <Heart className="mr-2 text-red-500" size={24} fill="#ef4444" />
          <h1>Liked</h1>
        </div>
        <LikedMovies likedMovies={likedMovies} />
      </div>
    </div>
  );
}

export async function Profile() {
  const user = await getUser();

  return (
    <div>
      <h1 className="text-2xl font-bold">{user.name}</h1>
      <p className="text-sm text-muted-foreground">
        Member since{' '}
        {user.createdAt.toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        })}
      </p>
    </div>
  );
}

function RecentActivities({ userMedias }: { userMedias: UserMedia[] }) {
  return (
    <Card className="border-2 border-zinc-950 shadow-[6px_6px_0_0_rgba(0,0,0,1)]">
      <CardHeader>
        <CardTitle className="flex items-center">
          <Clock size={16} className="mr-2" />
          <span>Recent Activtites</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="space-y-2">
          {userMedias.map((media) => (
            <li key={media.id}>
              <p>{media.title}</p>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}

function UserCollections({ collections }: { collections: Collection[] }) {
  return (
    <Card className="border-2 border-zinc-950 shadow-[6px_6px_0_0_rgba(0,0,0,1)]">
      <CardHeader>
        <CardTitle className="flex justify-between items-center">
          <div className="flex items-center">
            <List size={16} className="mr-2" />
            <span>Collections</span>
          </div>
          <Dialog>
            <DialogTrigger asChild>
              <button aria-describedby="Create collection">
                <Plus size={16} />
              </button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Create a new collection.</DialogTitle>
              </DialogHeader>
              <CreateCollectionForm />
            </DialogContent>
          </Dialog>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="space-y-2">
          {collections.map((collection) => (
            <li key={collection.id}>
              <p>{collection.name}</p>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}

function UserStats({
  userMediasLength,
  collectionsLength,
}: {
  userMediasLength: number;
  collectionsLength: number;
}) {
  return (
    <Card className="border-2 border-zinc-950 shadow-[6px_6px_0_0_rgba(0,0,0,1)]">
      <CardHeader>
        <CardTitle className="flex items-center">
          <List size={16} className="mr-2" />
          <span>Stats</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="space-y-2">
          <li>
            <p>Watched Movies: {userMediasLength}</p>
          </li>
          <li>
            <p>Collections: {collectionsLength}</p>
          </li>
        </ul>
      </CardContent>
    </Card>
  );
}

function LikedMovies({ likedMovies }: { likedMovies: Movie[] }) {
  return (
    <Card className="border-2 border-zinc-950 shadow-[6px_6px_0_0_rgba(0,0,0,1)]">
      <CardHeader>
        {likedMovies.length === 0 ? (
          <p className="text-muted-foreground">No liked movies yet</p>
        ) : (
          <ul className="space-y-2">
            {likedMovies.map((movie) => (
              <li key={movie.id}>
                <Link href={`/movies/${movie.tmdbId}`}>{movie.title}</Link>
              </li>
            ))}
          </ul>
        )}
      </CardHeader>
    </Card>
  );
}

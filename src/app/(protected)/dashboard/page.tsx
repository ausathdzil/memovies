import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import {
  getCollections,
  getLikedMovies,
  getSortedUserMedias,
  getUser,
} from '@/lib/data';
import { Clock, Heart, List } from 'lucide-react';
import Link from 'next/link';

export default async function Page() {
  const user = await getUser();
  const userMedias = await getSortedUserMedias(user.id);
  const collections = await getCollections(user.id);
  const likedMovies = await getLikedMovies(user.id);

  return (
    <section className="w-full space-y-4">
      <div className="flex justify-between items-center">
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
        <Link href="/profile">
          <Button
            className="border-2 border-zinc-950 shadow-[4px_4px_0_0_rgba(0,0,0,1)] bg-zinc-50 hover:bg-teal-500"
            variant="secondary"
          >
            Edit Profile
          </Button>
        </Link>
      </div>
      <Separator className="bg-zinc-950 h-[2px] rounded" />
      <div className="grid grid-cols-3 gap-4">
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
        <Card className="border-2 border-zinc-950 shadow-[6px_6px_0_0_rgba(0,0,0,1)]">
          <CardHeader>
            <CardTitle className="flex items-center">
              <List size={16} className="mr-2" />
              <span>Collections</span>
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
                <p>Watched Movies: {userMedias.length}</p>
              </li>
              <li>
                <p>Collections: {collections.length}</p>
              </li>
            </ul>
          </CardContent>
        </Card>
      </div>
      <Separator className="bg-zinc-950 h-[2px] rounded" />
      <div className="flex items-center text-xl">
        <Heart className="mr-2 text-red-500" size={24} fill="#ef4444" />
        <h1>Liked</h1>
      </div>
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
    </section>
  );
}

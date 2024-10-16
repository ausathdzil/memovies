'use client';

import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { MovieGenre } from '@/lib/definitions';
import { Filter, History, Star } from 'lucide-react';
import Link from 'next/link';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useRef } from 'react';

export default function SidebarFilterForm({
  genres,
}: {
  genres: MovieGenre[] | null;
}) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();
  const formRef = useRef<HTMLFormElement>(null);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const params = new URLSearchParams(window.location.search);

    formData.forEach((value, key) => {
      if (value) {
        if (key === 'genre') {
          const selectedGenres = formData.getAll('genre');
          params.set('genre', selectedGenres.join(','));
        } else {
          params.set(key, value.toString());
        }
      }
    });

    router.replace(`${pathname}?${params.toString()}`);
  };

  return (
    <form onSubmit={handleSubmit} ref={formRef}>
      <div className="p-6 border-b border-black space-y-2">
        <Label htmlFor="sort_by">Sort By</Label>
        <Select
          defaultValue={searchParams.get('sort_by') || 'popularity.desc'}
          name="sort_by"
        >
          <SelectTrigger className="border-black">
            <SelectValue placeholder="Select option" />
          </SelectTrigger>
          <SelectContent className="border-black">
            <SelectGroup>
              <SelectLabel>Popularity</SelectLabel>
              <SelectItem value="popularity.asc">
                Popularity Ascending
              </SelectItem>
              <SelectItem value="popularity.desc">
                Popularity Descending
              </SelectItem>
            </SelectGroup>
            <SelectGroup>
              <SelectLabel>Title</SelectLabel>
              <SelectItem value="title.asc">Title Ascending</SelectItem>
              <SelectItem value="title.desc">Title Descending</SelectItem>
            </SelectGroup>
            <SelectGroup>
              <SelectLabel>Release Date</SelectLabel>
              <SelectItem value="primary_release_date.asc">
                Release Date Ascending
              </SelectItem>
              <SelectItem value="primary_release_date.desc">
                Release Date Descending
              </SelectItem>
            </SelectGroup>
            <SelectGroup>
              <SelectLabel>Rating</SelectLabel>
              <SelectItem value="vote_average.asc">Rating Ascending</SelectItem>
              <SelectItem value="vote_average.desc">
                Rating Descending
              </SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
      {genres && (
        <div className="p-6 border-b border-black space-y-2">
          <Label htmlFor="genre">Genres</Label>
          <div className="grid grid-cols-2 gap-y-2 gap-x-4">
            {genres.map((genre) => (
              <div className="flex items-center space-x-2" key={genre.id}>
                <Checkbox
                  id={genre.id.toString()}
                  name="genre"
                  value={genre.id.toString()}
                  defaultChecked={searchParams
                    .get('genre')
                    ?.split(',')
                    .includes(genre.id.toString())}
                />
                <Label htmlFor={genre.id.toString()}>{genre.name}</Label>
              </div>
            ))}
          </div>
        </div>
      )}
      <div className="p-6 border-b border-black space-y-2">
        <p className="text-sm font-medium leading-none">Release Year</p>
        <div>
          <Label htmlFor="from">From</Label>
          <Input
            className="border-black"
            type="number"
            id="from"
            name="from"
            defaultValue={searchParams.get('from') || ''}
          />
        </div>
        <div>
          <Label htmlFor="to">To</Label>
          <Input
            className="border-black"
            type="number"
            id="to"
            name="to"
            defaultValue={searchParams.get('to') || ''}
          />
        </div>
      </div>
      <div className="p-6 flex flex-col gap-4">
        <Button
          className="w-full border-2 border-black shadow-[4px_4px_0_0_rgba(0,0,0,1)] bg-teal-500 text-white hover:bg-black hover:text-white"
          type="submit"
        >
          <Filter className="mr-2" size={16} />
          <span>Apply filters</span>
        </Button>
        <Link href="/movies/discover">
          <Button
            className="w-full border-2 border-black shadow-[4px_4px_0_0_rgba(0,0,0,1)]"
            variant="destructive"
          >
            <History className="mr-2" size={16} />
            <span>Reset filters</span>
          </Button>
        </Link>
      </div>
    </form>
  );
}

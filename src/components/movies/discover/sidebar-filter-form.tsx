'use client';

import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { MovieGenre } from '@/lib/definitions';
import { Filter } from 'lucide-react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useRef } from 'react';

export default function SidebarFilterForm({
  genres,
}: {
  genres: MovieGenre[] | null;
}) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();
  const formRef = useRef<HTMLFormElement>(null);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const params = new URLSearchParams();

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

    replace(`${pathname}?${params.toString()}`);
  };

  return (
    <form onSubmit={handleSubmit} ref={formRef}>
      <div className="p-6 border-b border-black space-y-2">
        <Label htmlFor="sort_by">Sort By</Label>
        <Select name="sort_by" defaultValue={searchParams.get('sort_by') || ''}>
          <SelectTrigger className="w-full border-black">
            <SelectValue placeholder="Select option" />
          </SelectTrigger>
          <SelectContent className="border-black">
            <SelectItem value="popularity.desc">
              Popularity Descending
            </SelectItem>
            <SelectItem value="popularity.asc">Popularity Ascending</SelectItem>
            <SelectItem value="vote_average.desc">Rating Descending</SelectItem>
            <SelectItem value="vote_average.asc">Rating Ascending</SelectItem>
            <SelectItem value="release_date.desc">
              Release Date Descending
            </SelectItem>
            <SelectItem value="release_date.asc">
              Release Date Ascending
            </SelectItem>
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
      <div className="p-6">
        <Button
          className="w-full border-2 border-black shadow-[4px_4px_0_0_rgba(0,0,0,1)] bg-teal-500 text-white hover:bg-black hover:text-white"
          type="submit"
        >
          <Filter className="mr-2" size={16} />
          <span>Apply filters</span>
        </Button>
      </div>
    </form>
  );
}

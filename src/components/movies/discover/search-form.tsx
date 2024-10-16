'use client';

import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';

export default function SearchForm() {
  function handleSearch(event: React.ChangeEvent<HTMLInputElement>) {
    console.log(event.target.value);
  }

  return (
    <div className="relative p-6">
      <label className="sr-only" htmlFor="search">
        Search
      </label>
      <Input
        className="pl-12"
        type="search"
        id="search"
        placeholder="Search for movies..."
        onChange={handleSearch}
      />
      <Search
        className="absolute top-1/2 left-10 transform -translate-y-1/2"
        size={20}
      />
    </div>
  );
}

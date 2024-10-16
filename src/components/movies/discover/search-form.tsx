'use client';

import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useDebouncedCallback } from 'use-debounce';

export default function SearchForm() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const handleSearch = useDebouncedCallback((term: string) => {
    const params = new URLSearchParams(searchParams);
    if (term) {
      params.set('search', term);
    } else {
      params.delete('search');
    }
    replace(`${pathname}?${params.toString()}`);
  }, 300);

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
        onChange={(e) => {
          handleSearch(e.target.value);
        }}
      />
      <Search
        className="absolute top-1/2 left-10 transform -translate-y-1/2"
        size={20}
      />
    </div>
  );
}

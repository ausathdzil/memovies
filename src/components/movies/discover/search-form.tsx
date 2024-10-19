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
      params.set('query', term);
    } else {
      params.delete('query');
    }
    replace(`${pathname}?${params.toString()}`);
  }, 300);

  return (
    <div className="p-6">
      <label className="sr-only" htmlFor="search">
        Search
      </label>
      <div className="relative">
        <Input
          id="search"
          name="search"
          className="peer pl-9"
          placeholder="Search a movie..."
          type="search"
          defaultValue={searchParams.get('search') as string}
          onChange={(e) => handleSearch(e.target.value)}
        />
        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center justify-center pl-3 text-muted-foreground/80 peer-disabled:opacity-50">
          <Search
            size={16}
            strokeWidth={2}
            aria-hidden="true"
            role="presentation"
          />
        </div>
      </div>
    </div>
  );
}

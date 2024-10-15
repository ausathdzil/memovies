import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Calendar, Clock, Filter, Star, Trophy } from 'lucide-react';

export default function MovieListSideBar() {
  return (
    <ScrollArea className="border-r-2 border-black">
      <div className="p-6 border-b border-black">
        <h1 className="text-lg font-semibold">Memovies</h1>
      </div>
      <nav className="p-6 border-b border-black">
        <ul className="space-y-4">
          {[
            { icon: Calendar, label: 'Now Playing', color: 'bg-red-500' },
            { icon: Star, label: 'Popular', color: 'bg-orange-500' },
            { icon: Trophy, label: 'Top Rated', color: 'bg-green-500' },
            { icon: Clock, label: 'Upcoming', color: 'bg-blue-500' },
          ].map((item, index) => (
            <li key={index}>
              <Button
                className={`w-full justify-start border-2 border-black shadow-[4px_4px_0_0_rgba(0,0,0,1)] ${item.color} text-white hover:bg-black hover:text-white`}
                variant="outline"
              >
                <item.icon className="mr-2" size={16} />
                {item.label}
              </Button>
            </li>
          ))}
        </ul>
      </nav>
      <div className="p-6 border-b border-black space-y-2">
        <Label htmlFor="sortBy">Sort By</Label>
        <Select>
          <SelectTrigger className="w-full border-black">
            <SelectValue placeholder="Popularity Descending" />
          </SelectTrigger>
          <SelectContent className="border-black">
            <SelectItem value="popularity_desc">
              Popularity Descending
            </SelectItem>
            <SelectItem value="popularity_asc">Popularity Ascending</SelectItem>
            <SelectItem value="vote_average_desc">Rating Descending</SelectItem>
            <SelectItem value="vote_average_asc">Rating Ascending</SelectItem>
            <SelectItem value="release_date_desc">
              Release Date Descending
            </SelectItem>
            <SelectItem value="release_date_asc">
              Release Date Ascending
            </SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="p-6 border-b border-black space-y-2">
        <Label htmlFor="genre">Genres</Label>
        <div className="grid grid-cols-2 gap-2">
          {[
            { id: 'action', name: 'Action' },
            { id: 'adventure', name: 'Adventure' },
            { id: 'animation', name: 'Animation' },
            { id: 'comedy', name: 'Comedy' },
            { id: 'crime', name: 'Crime' },
            { id: 'documentary', name: 'Documentary' },
            { id: 'drama', name: 'Drama' },
            { id: 'family', name: 'Family' },
            { id: 'fantasy', name: 'Fantasy' },
            { id: 'history', name: 'History' },
            { id: 'horror', name: 'Horror' },
            { id: 'music', name: 'Music' },
            { id: 'mystery', name: 'Mystery' },
            { id: 'romance', name: 'Romance' },
            { id: 'science_fiction', name: 'Sci-Fi' },
            { id: 'tv_movie', name: 'TV Movie' },
            { id: 'thriller', name: 'Thriller' },
            { id: 'war', name: 'War' },
            { id: 'western', name: 'Western' },
          ].map((genre) => (
            <div className="flex items-center space-x-2">
              <Checkbox id={genre.id} />
              <Label htmlFor={genre.id}>{genre.name}</Label>
            </div>
          ))}
        </div>
      </div>
      <div className="p-6 border-b border-black space-y-2">
        <p className="text-sm font-medium leading-none">Release Year</p>
        <div>
          <Label htmlFor="from">From</Label>
          <Input className="border-black" type="number" id="from" />
        </div>
        <div>
          <Label htmlFor="to">To</Label>
          <Input className="border-black" type="number" id="to" />
        </div>
      </div>
      <div className="p-6">
        <Button className="w-full border-2 border-black shadow-[4px_4px_0_0_rgba(0,0,0,1)] bg-teal-500 text-white hover:bg-black hover:text-white">
          <Filter className="mr-2" size={16} />
          <span>Apply filters</span>
        </Button>
      </div>
    </ScrollArea>
  );
}

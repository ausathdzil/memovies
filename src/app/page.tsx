import MoviesSection from '@/components/home/movies-section';
import TVShowsSection from '@/components/home/tvshows-section';

export default function Home() {
  return (
    <>
      <section className="mt-12">
        <article className="space-y-2 text-center">
          <h1 className="text-3xl sm:text-7xl font-semibold">Memovies</h1>
          <p className="text-lg">
            Save your <span className="text-teal-600">precious</span> memories.
          </p>
        </article>
      </section>
      <MoviesSection />
      <TVShowsSection />
    </>
  );
}

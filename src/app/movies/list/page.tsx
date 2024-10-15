import MovieListSideBar from "@/components/movies/list/sidebar";

export default function Page() {
  return (
    <section className="w-full border-2 border-black h-screen mt-14 rounded-xl flex">
      <MovieListSideBar />
      <div className="flex-grow p-8">
        <div>Search</div>
        <div>Items</div>
      </div>
    </section>
  );
}

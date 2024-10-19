export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="min-h-[calc(100vh-168px)] flex justify-center items-center p-12">
      {children}
    </main>
  );
}

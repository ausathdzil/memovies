import DashboardSidebar from '@/components/dashboard/sidebar';

export const experimental_ppr = true;

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <main className="min-h-[calc(100vh-168px)] flex justify-center items-start gap-6 p-12">
      <DashboardSidebar />
      <div className="w-full max-w-[80%] min-h-svh flex flex-col items-start gap-4 border p-6 rounded-e-xl">
        {children}
      </div>
    </main>
  );
}

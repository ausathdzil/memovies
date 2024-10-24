import LogoutButton from '@/components/auth/logout-button';
import { UserProvider } from '@/components/auth/user-provider';
import DashboardSidebar from '@/components/dashboard/sidebar';
import { getUser } from '@/lib/data';

export default function Layout({ children }: { children: React.ReactNode }) {
  const userPromise = getUser();

  return (
    <main className="min-h-[calc(100vh-168px)] flex justify-center items-start gap-6 p-12">
      <DashboardSidebar>
        <LogoutButton />
      </DashboardSidebar>
      <div className="w-full max-w-[80%] min-h-svh flex flex-col items-start gap-4 border p-6 rounded-e-xl">
        <UserProvider userPromise={userPromise}>{children}</UserProvider>
      </div>
    </main>
  );
}

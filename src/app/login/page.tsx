import LoginForm from '@/components/auth/login-form';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { getUser } from '@/lib/data';
import Link from 'next/link';
import { redirect } from 'next/navigation';

export default async function Page() {
  const user = await getUser();
  
  if (user) {
    redirect('/dashboard');
  }

  return (
    <section className="mt-12">
      <Card className="border-2 border-black shadow-[10px_10px_0_0_rgba(0,0,0,1)] rounded-xl">
        <CardHeader className="p-8">
          <CardTitle className="font-bold text-4xl">Login</CardTitle>
          <CardDescription className="text-lg">Welcome Back!</CardDescription>
        </CardHeader>
        <CardContent className="p-8 pt-0 space-y-8">
          <LoginForm />
          <p className="text-center">
            Don't have an account?{' '}
            <Link href="/signup" className="text-teal-500 hover:underline">
              Sign up now
            </Link>
          </p>
        </CardContent>
      </Card>
    </section>
  );
}
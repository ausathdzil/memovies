import SignUpForm from '@/components/auth/signup-form';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import Link from 'next/link';

export default function Page() {
  return (
    <Card className="w-fit border-2 border-black shadow-[10px_10px_0_0_rgba(0,0,0,1)] rounded-xl">
      <CardHeader className="p-8">
        <CardTitle className="font-bold text-4xl">Create an account</CardTitle>
        <CardDescription className="text-lg">
          Join us now and start saving your memories.
        </CardDescription>
      </CardHeader>
      <CardContent className="p-8 pt-0 space-y-8">
        <SignUpForm />
        <p className="text-center">
          Already have an account?{' '}
          <Link href="/login" className="text-teal-500 hover:underline">
            Login
          </Link>
        </p>
      </CardContent>
    </Card>
  );
}

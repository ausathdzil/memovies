import { Button } from '@/components/ui/button';
import { deleteSession } from '@/lib/session';
import { LogOut } from 'lucide-react';

export default function LogoutButton() {
  return (
    <Button
      className="w-full flex justify-start border-2 border-zinc-950 shadow-[4px_4px_0_0_rgba(0,0,0,1)]"
      variant="destructive"
      type="submit"
      onClick={async () => {
        'use server';
        await deleteSession();
      }}
    >
      <LogOut size={16} className="mr-2" />
      <span>Logout</span>
    </Button>
  );
}
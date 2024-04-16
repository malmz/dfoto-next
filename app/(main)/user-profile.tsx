import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { auth, signIn, signOut } from '@/lib/auth';
import { CircleUser } from 'lucide-react';
import Link from 'next/link';

export async function UserProfile() {
  const session = await auth();
  //const { isAuthenticated, userInfo, passed } = await checkRole(['read:album']);

  return (
    <>
      {session?.user ? (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant='ghost'
              size='icon'
              className='overflow-hidden rounded-full'
            >
              {session.user.image ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={session.user.image}
                  alt='user'
                  width='40'
                  height='40'
                ></img>
              ) : (
                <CircleUser className='h-5 w-5' />
              )}
              <span className='sr-only'>Toggle user menu</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align='end'>
            <DropdownMenuLabel>
              {session.user.name ?? session.user.email ?? 'Användare'}
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Settings</DropdownMenuItem>
            {true && (
              <DropdownMenuItem asChild>
                <Link href='/admin'>Admin</Link>
              </DropdownMenuItem>
            )}
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <form
                action={async () => {
                  'use server';
                  await signOut();
                }}
              >
                <button type='submit'>Sign out</button>
              </form>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ) : (
        <form
          action={async () => {
            'use server';
            await signIn('github');
          }}
        >
          <Button variant='outline' type='submit'>
            Sign in
          </Button>
        </form>
      )}
    </>
  );
}

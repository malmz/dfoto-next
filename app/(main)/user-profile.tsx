import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Skeleton } from '@/components/ui/skeleton';
import { hasRole, useUser } from '@/lib/data/client';
import { checkRole } from '@/lib/logto/actions';
import { CircleUser } from 'lucide-react';
import Link from 'next/link';

export async function UserProfile() {
  const { isAuthenticated, userInfo, passed } = await checkRole(['read:album']);

  /* if (isLoading) {
    return <Skeleton className='h-10 w-10 rounded-full'></Skeleton>;
  } */

  return (
    <>
      {isAuthenticated ? (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant='ghost'
              size='icon'
              className='overflow-hidden rounded-full'
            >
              {userInfo?.picture ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={userInfo?.picture}
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
              {userInfo?.name ?? userInfo?.username ?? 'Användare'}
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Settings</DropdownMenuItem>
            {passed && (
              <DropdownMenuItem asChild>
                <Link href='/admin'>Admin</Link>
              </DropdownMenuItem>
            )}
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <a href='/signout'>Sign out</a>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ) : (
        <Button variant='outline' asChild>
          <a href='/signin'>Sign In</a>
        </Button>
      )}
    </>
  );
}

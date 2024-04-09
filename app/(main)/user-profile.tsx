'use client';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useUser } from '@/lib/data/client';
import { LogtoContext } from '@logto/next/server-actions';
import { CircleUser } from 'lucide-react';
import Link from 'next/link';
import useSWR from 'swr';

export function UserProfile() {
  const { data } = useUser();

  return (
    <>
      {data?.isAuthenticated ? (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant='ghost'
              size='icon'
              className='overflow-hidden rounded-full'
            >
              {data.userInfo?.picture ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={data.userInfo?.picture}
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
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Settings</DropdownMenuItem>
            <DropdownMenuItem>Support</DropdownMenuItem>
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

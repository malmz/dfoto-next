import Debug from '@/components/debug';
import { NavLink } from '@/components/nav-link';
import { ThemeSwitcher } from '@/components/theme-switcher';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import { getAuth } from '@/lib/logto/actions';
import { getYear } from 'date-fns';
import { Camera, CircleUser, Mail, Search } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { UserProfile } from './user-profile';
import { AdminLink } from './admin-link';

async function Header() {
  return (
    <header className='flex h-16 items-center justify-between gap-4 border-b px-4 md:px-6'>
      <nav className='flex items-center gap-6'>
        <Link href='/'>
          <Camera className='h-6 w-6 text-primary'></Camera>
          <span className='sr-only'>DFoto</span>

          {/* <Image
            src='/images/logo.png'
            width='100'
            height='40'
            alt='DFoto logo'
            priority
          ></Image> */}
        </Link>
        <NavLink
          href='/'
          exact
          className='text-sm font-medium text-muted-foreground transition-colors hover:text-primary aria-[current=true]:text-foreground'
        >
          Bilder
        </NavLink>
        <NavLink
          href='/about'
          className='text-sm font-medium text-muted-foreground transition-colors hover:text-primary aria-[current=true]:text-foreground'
        >
          Om oss
        </NavLink>
        <AdminLink></AdminLink>
      </nav>
      <div className='flex items-center gap-2'>
        <form action='' className='flex items-center gap-2'>
          <Input type='search' placeholder='Sök...' className=''></Input>
        </form>
        <UserProfile></UserProfile>
      </div>
    </header>
  );
}

async function Footer() {
  return (
    <footer className='mt-8 flex items-center justify-between gap-4 border-t p-4'>
      <aside className='flex items-center gap-2'>
        <Image
          src='/images/datalogo.svg'
          alt='Computer science logo'
          height={36}
          width={36}
        />
        <p className=''>
          Copyright © {getYear(new Date())} - All right reserved
        </p>
      </aside>
      <p className='text-lg font-medium text-muted-foreground'>
        Vi ses genom kameralinsen!
      </p>
      <div className='flex items-center gap-2'>
        <ThemeSwitcher></ThemeSwitcher>
        <Button variant='ghost' size='icon' asChild>
          <Link href='mailto:dfoto@dtek.se'>
            <Mail></Mail>
          </Link>
        </Button>
      </div>
    </footer>
  );
}

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header></Header>
      <main className='grow'>{children}</main>
      <Footer></Footer>
    </>
  );
}

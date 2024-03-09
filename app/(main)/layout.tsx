import Debug from '@/components/debug';
import { ThemeSwitcher } from '@/components/theme-switcher';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { getAuth } from '@/lib/logto/actions';
import { getYear } from 'date-fns';
import { Mail } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

async function Header() {
  const { isAuthenticated, userInfo } = await getAuth({ fetchUserInfo: true });
  return (
    <header className='flex h-16 items-center justify-between border-b px-4'>
      <div className='flex items-center gap-6'>
        <Image
          src='/images/logo.png'
          width='100'
          height='40'
          alt='DFoto logo'
          priority
        ></Image>
        <nav className='flex items-center gap-6'>
          <Link
            href='/'
            className='text-sm font-medium text-muted-foreground transition-colors hover:text-primary'
          >
            Bilder
          </Link>
          <Link
            href='/about'
            className='text-sm font-medium text-muted-foreground transition-colors hover:text-primary'
          >
            Om oss
          </Link>
          {isAuthenticated ? (
            <Link
              href='/admin'
              className='text-sm font-medium text-muted-foreground transition-colors hover:text-primary'
            >
              Admin
            </Link>
          ) : null}
        </nav>
      </div>
      <div className='flex items-center gap-2'>
        <p>{userInfo?.name ?? userInfo?.username}</p>
        <form action='' className='flex items-center gap-2'>
          <Input type='text' placeholder='Sök efter taggar'></Input>
          <Button type='submit'>Sök</Button>
        </form>
        <ThemeSwitcher></ThemeSwitcher>
      </div>
    </header>
  );
}

async function Footer() {
  const { isAuthenticated } = await getAuth();
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
        <Button variant='ghost' size='icon' asChild>
          <Link href='mailto:dfoto@dtek.se'>
            <Mail></Mail>
          </Link>
        </Button>
        {!isAuthenticated ? (
          <Button variant='ghost' asChild>
            <Link href='/signin'>Sign In</Link>
          </Button>
        ) : (
          <Button variant='ghost' asChild>
            <Link href='/signout'>Sign out</Link>
          </Button>
        )}
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

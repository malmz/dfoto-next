'use client';
import { NavLink } from '@/components/nav-link';
import { useUser } from '@/lib/data/client';

export function AdminLink() {
  const { data } = useUser();
  return (
    <>
      {data?.isAuthenticated ? (
        <NavLink
          href='/admin'
          className='text-sm font-medium text-muted-foreground transition-colors hover:text-primary aria-[current=true]:text-foreground'
        >
          Admin
        </NavLink>
      ) : null}
    </>
  );
}

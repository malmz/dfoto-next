'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

type Props = { exact?: boolean } & React.ComponentProps<typeof Link>;
export function NavLink({ href, exact = false, ...props }: Props) {
  const path = usePathname();
  const isActive = exact
    ? path === href.toString()
    : path.startsWith(href.toString());
  return <Link href={href} aria-current={isActive} {...props}></Link>;
}

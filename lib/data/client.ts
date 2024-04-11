import { LogtoContext } from '@logto/next/server-actions';
import useSWR from 'swr';
import { Role } from '../logto/config';

export const fetcher = (...args: Parameters<typeof fetch>) =>
  fetch(...args).then((res) => res.json());

export const useUser = () =>
  useSWR<Pick<LogtoContext, 'isAuthenticated' | 'scopes' | 'userInfo'>>(
    '/userinfo',
    fetcher,
  );

export function hasRole(
  ctx: { isAuthenticated: boolean; scopes?: string[] } | undefined,
  role: Role[],
) {
  if (!ctx || !ctx.isAuthenticated) {
    return false;
  }

  for (const r of role) {
    if (!ctx.scopes?.includes(r)) {
      return false;
    }
  }

  return true;
}

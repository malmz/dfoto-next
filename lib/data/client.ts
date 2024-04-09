import { LogtoContext } from '@logto/next/server-actions';
import useSWR from 'swr';

export const fetcher = (...args: Parameters<typeof fetch>) =>
  fetch(...args).then((res) => res.json());

export const useUser = () =>
  useSWR<Pick<LogtoContext, 'isAuthenticated' | 'scopes' | 'userInfo'>>(
    '/userinfo',
    fetcher,
  );

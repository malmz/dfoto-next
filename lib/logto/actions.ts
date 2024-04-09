'use server';

import {
  LogtoContext,
  getLogtoContext,
  handleSignIn,
  signIn as signInAction,
  signOut as signOutAction,
} from '@logto/next/server-actions';
import { logtoConfig } from './config';
import { redirect } from 'next/navigation';

export const signIn = async () => await signInAction(logtoConfig);
export const signOut = async () => await signOutAction(logtoConfig);
export const handleCallback = async (searchParams: URLSearchParams) =>
  await handleSignIn(logtoConfig, searchParams);
export const getAuth = async (params?: Parameters<typeof getLogtoContext>[1]) =>
  await getLogtoContext(logtoConfig, params);

export const ensureRole = async (ctx: LogtoContext, ...roles: string[]) => {
  if (!ctx.isAuthenticated) {
    return redirect('/login');
  }

  for (const role of roles) {
    if (!ctx.scopes?.includes(role)) {
      throw new Error(`unauthorized: missing role: ${role}`);
    }
  }
};

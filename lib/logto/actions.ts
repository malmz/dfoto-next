'use server';

import {
  LogtoContext,
  getLogtoContext,
  handleSignIn,
  signIn as signInAction,
  signOut as signOutAction,
} from '@logto/next/server-actions';
import { Role, logtoConfig } from './config';
import { redirect } from 'next/navigation';
import { cache } from 'react';

const defaultResource = 'https://dfoto.se';

export const signIn = async () => await signInAction(logtoConfig);
export const signOut = async () => await signOutAction(logtoConfig);
export const handleCallback = async (searchParams: URLSearchParams) =>
  await handleSignIn(logtoConfig, searchParams);
export const getAuth = cache(
  async (params?: Parameters<typeof getLogtoContext>[1]) =>
    await getLogtoContext(logtoConfig, params),
);

export const checkRole = cache(
  async (role: Role[], params?: Parameters<typeof getLogtoContext>[1]) => {
    const ctx = await getLogtoContext(logtoConfig, {
      getAccessToken: true,
      resource: defaultResource,
      ...params,
    });

    if (!ctx.isAuthenticated) {
      return { ...ctx, passed: false };
    }

    for (const r of role) {
      if (!ctx.scopes?.includes(r)) {
        return { ...ctx, passed: false };
      }
    }

    return { ...ctx, passed: true };
  },
);

export const ensureRole = cache(
  async (roles: Role[], params?: Parameters<typeof getLogtoContext>[1]) => {
    const ctx = await getLogtoContext(logtoConfig, {
      getAccessToken: true,
      resource: defaultResource,
      ...params,
    });
    if (!ctx.isAuthenticated) {
      return redirect('/login');
    }

    for (const role of roles) {
      if (!ctx.scopes?.includes(role)) {
        throw new Error(`unauthorized: missing role: ${role}`);
      }
    }
    return ctx;
  },
);

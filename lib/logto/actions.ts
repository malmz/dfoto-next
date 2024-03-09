'use server';

import {
  getLogtoContext,
  handleSignIn,
  signIn as signInAction,
  signOut as signOutAction,
} from '@logto/next/server-actions';
import { logtoConfig } from './config';

export const signIn = async () => await signInAction(logtoConfig);
export const signOut = async () => await signOutAction(logtoConfig);
export const handleCallback = async (searchParams: URLSearchParams) =>
  await handleSignIn(logtoConfig, searchParams);
export const getAuth = async (params?: Parameters<typeof getLogtoContext>[1]) =>
  await getLogtoContext(logtoConfig, params);

'use server';

import {
  getLogtoContext,
  handleSignIn,
  signIn as signInAction,
  signOut as signOutAction,
} from '@logto/next/server-actions';

const logtoConfig = {
  appId: process.env.LOGTO_APP_ID!,
  appSecret: process.env.LOGTO_APP_SECRET!,
  endpoint: process.env.LOGTO_AUTH_ENDPOINT!, // E.g. http://localhost:3001
  baseUrl: process.env.BASE_ADDR!, // E.g. http://localhost:3000
  cookieSecret: process.env.COOKIE_SECRET!,
  cookieSecure: process.env.NODE_ENV === 'production',
};

export const signIn = async () => await signInAction(logtoConfig);
export const signOut = async () => await signOutAction(logtoConfig);
export const handleCallback = async (searchParams: URLSearchParams) =>
  await handleSignIn(logtoConfig, searchParams);
export const getAuth = async (params?: Parameters<typeof getLogtoContext>[1]) =>
  await getLogtoContext(logtoConfig, params);

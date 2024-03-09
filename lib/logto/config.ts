import LogtoClient from '@logto/next/server-actions';

export const logtoConfig = {
  appId: process.env.LOGTO_APP_ID!,
  appSecret: process.env.LOGTO_APP_SECRET!,
  endpoint: process.env.LOGTO_AUTH_ENDPOINT!, // E.g. http://localhost:3001
  baseUrl: process.env.BASE_ADDR!, // E.g. http://localhost:3000
  cookieSecret: process.env.COOKIE_SECRET!,
  cookieSecure: process.env.NODE_ENV === 'production',
  resources: ['https://dfoto.se'],
  scopes: [
    'write:album',
    'read:album',
    'delete:album',
    'publish:album',
    'write:image',
    'delete:image',
  ],
} satisfies ConstructorParameters<typeof LogtoClient>[0];

const logtoClient = new LogtoClient(logtoConfig);

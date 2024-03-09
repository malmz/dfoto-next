import LogtoClient from '@logto/next/server-actions';
import { GetContextParameters } from '@logto/node';
import { logtoConfig } from './config';
import { NextRequest } from 'next/server';

const client = new LogtoClient(logtoConfig);

const getCookie = (req: NextRequest) => {
  return req.cookies.get(`logto:${logtoConfig.appId}`)?.value ?? '';
};

export const getAuth = async (
  req: NextRequest,
  params?: GetContextParameters,
) => await client.getLogtoContext(getCookie(req), params);

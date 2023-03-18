export { ROUTES } from './RouterConst';

export const defaultServerPort = 3001;
// @ts-ignore
export const SERVER_PORT = Number(import.meta.env.VITE_SERVER_PORT) || defaultServerPort;

export const defaultHostName = 'localhost';
// @ts-ignore
export const hostName = import.meta.env.VITE_HOST_NAME || defaultHostName;

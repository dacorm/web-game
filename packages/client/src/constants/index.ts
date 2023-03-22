export { ROUTES } from './RouterConst';

export const defaultServerPort = 3001;
// @ts-ignore
export const serverPort = Number(import.meta.env.VITE_SERVER_PORT) || defaultServerPort;

export const defaultHostName = 'localhost';
// @ts-ignore
export const hostName = import.meta.env.VITE_HOST_NAME || defaultHostName;

export const defaultProtocol = 'http';
// @ts-ignore
export const protocol = import.meta.env.VITE_PROTOCOL || defaultProtocol;

// note: use relative path instead of absolute
export const fullServerHostNamePrefixNoSlash = `${protocol}://${hostName}:${serverPort}`;

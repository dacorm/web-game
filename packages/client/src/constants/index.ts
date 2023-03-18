export { ROUTES } from './RouterConst';
export const defaultServerPort = 3001;
// @ts-ignore
export const SERVER_PORT = Number(import.meta.env.VITE_SERVER_PORT) || defaultServerPort;

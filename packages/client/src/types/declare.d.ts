import { Store } from 'redux';

export {};

declare global {
  interface Window {
    store: Store;
  }
}

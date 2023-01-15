import { PlayerProps } from '../../models/Player/Player.types';

export type TPlayer = Omit<PlayerProps, 'canvas'>

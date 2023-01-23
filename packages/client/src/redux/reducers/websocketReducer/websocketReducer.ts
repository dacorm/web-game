import { GameWebSocket, websocketActionTypes } from '../../types/websocketReducer.types';

const initialState: GameWebSocket = {
    ws: null,
};

// eslint-disable-next-line default-param-last
export const websocketReducer = (state:GameWebSocket = initialState, action:any) => {
    switch (action.type) {
    case websocketActionTypes.SET_WS: {
        return {
            ...state, ws: action.payload,
        };
    }
    default: return state;
    }
};

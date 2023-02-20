export type UserResult = {
  data: {
    score: number;
    money: number;
    ownership: number;
  };
};

export interface LeaderboardProps {
  ratingFieldName: string;
  cursor: number;
  limit: number;
}

export interface LeaderBoardState {
  entities: UserResult[];
}

export enum LeaderBoardActionsType {
  SET_LEADERBOARDS = 'SET_LEADERBOARDS',
}

type LeaderBoardActionSetLeaderboards = {
  type: LeaderBoardActionsType.SET_LEADERBOARDS,
  payload: UserResult[],
}

export type TLeaderboardActions = LeaderBoardActionSetLeaderboards

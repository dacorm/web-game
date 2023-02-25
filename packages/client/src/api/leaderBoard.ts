import { LeaderboardProps, UserResult } from '../redux/types/leaderboard.types';

class LeaderBoardApi {
    // eslint-disable-next-line class-methods-use-this
    async getLeaderboards(data: LeaderboardProps) {
        const res = await fetch('', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
            credentials: 'include',
        });
        return await res;
    }

    // eslint-disable-next-line class-methods-use-this
    async sendLeaderboards(data: UserResult) {
        const res = await fetch('', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                ...data,
                ratingFieldName: 'score',
                teamName: 'MonopolyGame', // Узнать какое здесь должно быть teamName
            }),
            credentials: 'include',
        });
        return await res;
    }
}

export const leaderboardApi = new LeaderBoardApi();

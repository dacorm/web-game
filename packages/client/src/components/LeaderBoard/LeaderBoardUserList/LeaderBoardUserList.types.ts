export type TLeaders = {
    place: number
    name: string
    points: number
    games: number
}

export interface LeaderBoardUserListProps {
    leaders: TLeaders[]
}

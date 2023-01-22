export type TExampleGameUsers = {
  playerId?: number
  userName: string
  avatar: string
}

export type TExampGameItemsState = {
  id_game: number
  players: TExampleGameUsers[]
}

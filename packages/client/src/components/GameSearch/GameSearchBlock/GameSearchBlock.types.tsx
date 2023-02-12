export type TExampleGameUsers = {
  playerId?: string
  userName: string
  avatar: string
}

export type TExampGameItemsState = {
  id_game: number
  players: TExampleGameUsers[]
}

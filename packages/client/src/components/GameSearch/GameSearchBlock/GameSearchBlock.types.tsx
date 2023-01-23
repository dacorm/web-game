export type TExampleGameUsers = {
  playerId?: number
  name: string
  avatar: string
}

export type TExampGameItemsState = {
  id_game: number
  players: TExampleGameUsers[]
}

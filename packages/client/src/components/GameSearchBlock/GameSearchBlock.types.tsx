export type TExampleGameUsers = {
  id_player?: number
  name: string
  avatar: string
}

export type TExampGameItemsState = {
  id_game: number
  players: TExampleGameUsers[]
}

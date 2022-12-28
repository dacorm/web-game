import { Props } from '../../../types/global.types'
import { TExampleGameUsers } from '../GameSearchBlock/GameSearchBlock.types'

export interface GameSearchItemProps extends Props {
  players: TExampleGameUsers[]
}

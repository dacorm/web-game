import { FC, useCallback, useState } from 'react'
import CreateGameForm from '../../components/GameSearch/CreateGameForm'
import GameSearchBlock from '../../components/GameSearch/GameSearchBlock'
import MenuHeader from '../../components/MenuHeader'
import Modal from '../../shared/ui/Modal'
import './GameSearch.css'

const GameSearch: FC = () => {
  const [createGameModal, setCreateGameModal] = useState(false)

  const openCreateGameModal = useCallback(() => {
    setCreateGameModal(true)
  }, [])

  const closeCreateGameModal = useCallback(() => {
    setCreateGameModal(false)
  }, [])

  return (
    <div className="search-game">
      <MenuHeader
        text="Ожидают игры"
        buttonText="Создать игру"
        onClick={openCreateGameModal}
      />
      <GameSearchBlock />
      <Modal
        title="Создание игры"
        isShow={createGameModal}
        onClose={closeCreateGameModal}>
        <CreateGameForm />
      </Modal>
    </div>
  )
}

export default GameSearch

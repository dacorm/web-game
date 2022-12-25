import React, { memo, useCallback } from 'react'
import { Util } from '../../core/Util'
import Button from '../../shared/ui/Button'
import { useBoard } from '../../core/BoardStage/BoardProvider'

const Cube = () => {
  const { random, setRandom } = useBoard()

  const handleClick = useCallback(() => {
    setRandom([Util.randomNumber(), Util.randomNumber()])
  }, [])

  return (
    <>
      <pre>
        {random} = {random.reduce((a, i) => a + i, 0)}
      </pre>
      <Button onClick={handleClick}>Кинуть кубики</Button>
    </>
  )
}

export default memo(Cube)

import './globalStyles/reset.css'

import Input from './shared/ui/Input'
import { InputFeature, InputMode } from './shared/ui/Input/Input.types'

function App() {
  return (
    <div className="App" style={{ width: '300px' }}>
      <Input
        mode={InputMode.TEXT}
        feature={InputFeature.DYNAMIC_PLACEHOLDER}
        placeholder="Введите имя"
      />
      <Input mode={InputMode.TEXT} placeholder="Введите имя" />
    </div>
  )
}

export default App

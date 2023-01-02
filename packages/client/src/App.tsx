import React, { StrictMode } from 'react'
import { BrowserRouter } from 'react-router-dom'
import RouterLayout from './layout/RouterLayout/RouterLayout'

import './globalStyles/reset.css'
import './globalStyles/constants.css'
import './globalStyles/global-styles.css'

function App() {
  return (
    <StrictMode>
      <BrowserRouter>
        <RouterLayout />
      </BrowserRouter>
    </StrictMode>
  )
}

export default App

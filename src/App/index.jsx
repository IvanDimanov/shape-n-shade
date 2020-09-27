import React from 'react'
import { BrowserRouter } from 'react-router-dom'

import Navigation from './Navigation'
import AnimatedSwitch from './AnimatedSwitch'

const App = () => (
  <BrowserRouter>
    <div className="flex flex-col h-full text-gray-500">
      <Navigation />
      <AnimatedSwitch />
    </div>
  </BrowserRouter>
)

export default App

import React from 'react'

import { Route, Routes } from 'react-router-dom'

import { BoardPage } from './pages/board-page'

const App: React.FC = () => {
  return (
    <div className='App'>
      <Routes>
        <Route index element={<BoardPage />} />
      </Routes>
    </div>
  )
}

export default App

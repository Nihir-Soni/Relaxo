import { LandingPage } from './components/LandingPage'
import { Routes, Route } from "react-router-dom"
import {ListenPage} from './components/ListenPage'

import './App.css'

function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/ListenPage" element={<ListenPage/>} />
    </Routes>

  )
}

export default App

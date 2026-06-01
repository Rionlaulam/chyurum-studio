import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Intake from './pages/Intake'
import Result from './pages/Result'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/start" element={<Intake />} />
      <Route path="/result" element={<Result />} />
    </Routes>
  )
}

export default App
import { Routes, Route } from 'react-router-dom'
import './App.css'
import Home from './Home/Home'
import CircleTheClick from './Circle the click/CircleTheClick'
import Tree from './Tree component/Tree'
import GuessTheColor from './Guess the color/GuessTheColor'
function App() {
  return (
    <Routes>
      <Route element={<Home />} path='/' />
      <Route element={<CircleTheClick />} path='/Circle-The-Click' />
      <Route element={<Tree />} path='/Component-Tree' />
      <Route element={<GuessTheColor />} path='/Guess-The-Color' />
    </Routes>
  )
}

export default App

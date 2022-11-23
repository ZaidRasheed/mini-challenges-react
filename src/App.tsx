import { Routes, Route } from 'react-router-dom'
import './App.css'
import Home from './Home/Home'
import CircleTheClick from './Circle the click/CircleTheClick'
import Tree from './Tree component/Tree'
import GuessTheColor from './Guess the color/GuessTheColor'
import MatchTheCards from './Match the cards/MatchTheCards'
import DropDownSelect from './Drop Down Select/DropDownSelect'
function App() {
  return (
    <Routes>
      <Route element={<Home />} path='/' />
      <Route element={<CircleTheClick />} path='/Circle-The-Click' />
      <Route element={<Tree />} path='/Component-Tree' />
      <Route element={<GuessTheColor />} path='/Guess-The-Color' />
      <Route element={<MatchTheCards />} path='/Match-The-Cards' />
      <Route element={<DropDownSelect />} path='/DropDown-Select' />
    </Routes>
  )
}

export default App

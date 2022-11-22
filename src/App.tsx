import { Routes, Route } from 'react-router-dom'
import './App.css'
import Home from './Home/Home'
import CircleTheClick from './Circle the click/CircleTheClick'
import Tree from './Tree component/Tree'
function App() {
  return (
    <Routes>
      <Route element={<Home />} path='/' />
      <Route element={<CircleTheClick/>} path='/Circle-The-Click'/>
      <Route element={<Tree/>} path='/Component-Tree'/>
    </Routes>
  )
}

export default App

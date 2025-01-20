import {Routes, Route} from 'react-router-dom' // Use Routes instead of Switch
import Home from './components/Home'
import UserDetail from './components/UserDetail' // Ensure this component is imported
import './App.css'

const App = () => (
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/users/:id" element={<UserDetail />} />
  </Routes>
)

export default App

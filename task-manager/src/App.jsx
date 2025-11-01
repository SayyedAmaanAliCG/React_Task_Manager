import { useState } from 'react'
import './App.css'
import Header from './components/Header'
import Tasks from './components/Tasks'


function App() {

  const [data,setData] = useState([]);

  return (
    <div className="app-container">
      <Header/>
      <h1>Your Daily Tasks</h1>
      <Tasks data={data} setData={setData}/>
    </div>
  )
}

export default App

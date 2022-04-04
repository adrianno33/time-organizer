import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { useState } from 'react'

import Navbar from "./Components/Navbar"
import Timer from "./Components/Timer"
import AddTimer from "./Components/AddTimer"
import ManageTimers from "./Components/ManageTimers"
import './App.css';

function App() {
  const [timers, setTimers] = useState([
      {
        id: 1,
        name: "Exercise 1",
        seconds: 20,
        minutes: 1,
        isComplete: false,
        currentRep: 0,
        targetRep: 1,
      },
      {
        id: 2,
        name: "Exercise 2",
        seconds: 30,
        minutes: 0,
        isComplete: false,
        currentRep: 0,
        targetRep: 2
      },
      {
        id: 3,
        name: "Exercise 3",
        seconds: 5,
        minutes: 0,
        isComplete: false,
        currentRep: 0,
        targetRep: 1,
      }
  ])

  function changeCompletion(id) {
    setTimers(prevTimer => (
      [
        ...prevTimer.slice(0,id - 1),
        {
          ...prevTimer[id - 1],
          isComplete: prevTimer[id - 1].currentRep >= prevTimer[id - 1].targetRep - 1 && true,  // it works due to - 1, but i think there's something wrong with useEffect
          currentRep: prevTimer[id - 1].currentRep + 1
        },
        ...prevTimer.slice(id)
    ]))
  }
  
  const timersList = timers.map(item => {
    return (
      <Timer 
        key={item.id}
        {...item}
        changeCompletion={ changeCompletion }
      />
    )
  }).reverse()

  function addTimer(newTimer) {
    setTimers(prevTimer => ([
      ...prevTimer,
      {
        ...newTimer,
        id: prevTimer.length + 1
      }
    ]))
  }

  function handleDelete(event) {
    console.log(timers.id)
    console.log(event.target.id)
    setTimers(prevTimers => prevTimers.filter(prevTimers => prevTimers.id !== parseInt(event.target.id))) // != didn't go trough build
}

  return (
    <div className="App">
      <BrowserRouter>
      <Navbar />
        <Routes>
          <Route path="/" element={ timersList } />
          <Route 
            path="manage" 
            element={
              <ManageTimers 
                timers={ timers } 
                handleDelete={ handleDelete }
              />}
          />
          <Route path="/add" element={ <AddTimer handleClick={ addTimer } />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

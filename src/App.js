import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { useState } from 'react'

import Navbar from './Components/Navbar'
import Timers from './Components/Timers'
import AddTimer from './Components/AddTimer'
import ManageTimers from './Components/ManageTimers'
import './App.css'

// Defining initial state outside of the component can make the component easier to read.
const timersInitialState = [
  {
    id: 1,
    name: 'Exercise 1',
    seconds: 20,
    minutes: 1,
    // I'm not going to alter the shape of this object since it is used all over the app,
    //but I would suggest not storing anything in state that can be computed from other values in the state.
    // For example, `isComplete`, can be calculated on the fly from `currentRep` and `targetRep`. (const isComplete = currentRep >= targetRep)
    isComplete: false,
    currentRep: 0,
    targetRep: 1,
  },
  {
    id: 2,
    name: 'Exercise 2',
    seconds: 30,
    minutes: 0,
    isComplete: false,
    currentRep: 0,
    targetRep: 2,
  },
  {
    id: 3,
    name: 'Exercise 3',
    seconds: 5,
    minutes: 0,
    isComplete: false,
    currentRep: 0,
    targetRep: 1,
  },
]

function App() {
  const [timers, setTimers] = useState(timersInitialState)

  function changeCompletion_old(id) {
    // This function is very hard to read & follow what it is doing. Good variable naming and Array methods can help improve it.
    // I am leaving it here for reference, but renamed it to `changeCompletion_old`
    setTimers((prevTimer) => [
      ...prevTimer.slice(0, id - 1), // making assumptions about how the `id` relates to a timer's index is fragile and bug prone. Use the id to find the index using prevTimer.findIndex(timer => timer.id === id)
      {
        ...prevTimer[id - 1],
        isComplete: prevTimer[id - 1].currentRep >= prevTimer[id - 1].targetRep - 1 && true, // it works due to - 1, but i think there's something wrong with useEffect
        currentRep: prevTimer[id - 1].currentRep + 1,
      },
      ...prevTimer.slice(id),
    ])
  }

  function changeCompletion(id) {
    const newTimers = timers.map((timer) => ({ ...timer })) // make a deep copy of an array of objects so you don't accidentally update state directly
    const timerToUpdateIndex = newTimers.findIndex((timer) => timer.id === id)
    const timerToUpdate = newTimers[timerToUpdateIndex]
    const updatedTimer = {
      ...timerToUpdate,
      currentRep: timerToUpdate.currentRep + 1,
      isComplete: timerToUpdate.currentRep + 1 >= timerToUpdate.targetRep, // since you are updating the currentRep & isComplete at the same time, you have to artificially add one to the currentRep for this comparison. This is another reason to remove `isComplete` from state.
    }
    newTimers[timerToUpdateIndex] = updatedTimer
    setTimers(newTimers)
  }

  function addTimer_old(newTimer) {
    // you're making a shallow copy of the timers here, so the references to the individual timers are staying the same. You should make a deep copy instead.
    setTimers((prevTimer) => [
      ...prevTimer,
      {
        ...newTimer,
        id: prevTimer.length + 1, // relying on length is bug-prone because you could add a timer (id = 4), then delete a different time and add another and id would equal 4 again.
      },
    ])
  }

  function addTimer(newTimer) {
    const newTimers = timers.map((timer) => ({ ...timer })) // make a deep copy of an array of objects so you don't accidentally update state directly
    const nextId = Math.max(...newTimers.map((timer) => timer.id)) + 1 // this is safer than just relying on length. Get the max of the ids, then add one. Even better would to use UUIDs but that may add complexity where it isn't needed yet.
    newTimers.push({
      ...newTimer,
      id: nextId,
    })
    setTimers(newTimers)
  }

  function handleDelete_old(event) {
    console.log(timers.id) // console.logs are a great way to debug, just remember to remove them once you've used them.
    console.log(event.target.id)
    setTimers((prevTimers) =>
      prevTimers.filter((prevTimers) => prevTimers.id !== parseInt(event.target.id))
    ) // != didn't go trough build
    // yeah Ideally your IDs would be strings, not numbers, so you wouldn't have to go around parsing them from events and such
  }

  function handleDelete(event) {
    const newTimers = timers.filter((timer) => timer.id !== parseInt(event.target.id))
    setTimers(newTimers)
  }

  return (
    <div className='App'>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route
            path='/'
            element={<Timers timers={timers} changeCompletion={changeCompletion} />}
          />
          <Route
            path='manage'
            element={<ManageTimers timers={timers} handleDelete={handleDelete} />}
          />
          <Route path='/add' element={<AddTimer handleClick={addTimer} />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App

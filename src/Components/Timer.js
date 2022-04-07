import { useEffect, useState, useCallback } from 'react'
import PropTypes from 'prop-types'

import play from '../img/play.svg'
import pause from '../img/pause.svg'
import convertSecondsToDisplayString from '../util/convertSecondsToDisplayString'

Timer.propTypes = {
  timer: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    seconds: PropTypes.number,
    // minutes: PropTypes.number,
    // isComplete: PropTypes.bool,
    currentRep: PropTypes.number,
    targetRep: PropTypes.number,
  }).isRequired,
  onTimerCompletion: PropTypes.func.isRequired,
}
// I changed this component to only use secondsLeft as a demonstration of how that would work... you can decide if you like it or not
function Timer({ timer, onTimerCompletion }) {
  const [secondsLeft, setSecondsLeft] = useState(timer.seconds) // updated naming so that this doesn't get confused with the seconds from timer.seconds
  const [isActive, setIsActive] = useState(false) // nice naming for this variable!

  const handleTimerStart = useCallback(() => setIsActive((prevIsActive) => !prevIsActive), []) // useCallback will make it so that handleTimerStart only has to be defined once instead of on every render. Read more here https://reactjs.org/docs/hooks-reference.html#usecallback

  useEffect(() => {
    let interval

    if (isActive) {
      if (secondsLeft === 0) {
        // not sure if this is supposed to be inside useEffect
        setIsActive(false)
        onTimerCompletion(timer.id) // something might be wrong
        setSecondsLeft(timer.seconds)
      }
      interval = setInterval(() => {
        setSecondsLeft((prevSeconds) => prevSeconds - 1)
      }, 1000)
    }

    return () => clearInterval(interval)
  }, [isActive, secondsLeft, timer, onTimerCompletion]) // might be wrong - yeah you were just missing the completion handler

  const isComplete = timer.currentRep >= timer.targetRep // Here is where you would replace isComplete with the on-the-fly calculation currentRep >= targetRep
  return (
    <div className='timer'>
      <label>{timer.name}</label>
      <div className={`circle ${isComplete ? 'timer--completed' : 'timer--not--completed'}`}>
        <h1 className='circle--timer'>{convertSecondsToDisplayString(secondsLeft)}</h1>
        <button onClick={handleTimerStart}>
          {isActive ? (
            <img className='icon--pause' src={pause} alt='pause' />
          ) : (
            <img className='icon--play' src={play} alt='play' />
          )}
        </button>
        <h1>
          {timer.currentRep} / {timer.targetRep}
        </h1>
      </div>
    </div>
  )
}

export default Timer

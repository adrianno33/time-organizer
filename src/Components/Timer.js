import { useEffect, useState } from "react";

import play from '../img/play.svg'
import pause from '../img/pause.svg'

function Timer(props) {
    const [seconds, setSeconds] = useState(parseInt(props.seconds) + parseInt(props.minutes) * 60)
    const [isActive, setIsActive] = useState(false)

    function startTimer() {
        setIsActive(prevIsActive => !prevIsActive)
    }

    useEffect(() => {
        let interval

        if (isActive) {
            if (seconds === 0) {    // not sure if this is supposed to be inside useEffect
                console.log('here')
                setIsActive(false)
                props.changeCompletion(props.id)    // something might be wrong
                setSeconds(parseInt(props.seconds) + parseInt(props.minutes) * 60)
            }
            interval = setInterval(() => {
                setSeconds(prevSeconds => prevSeconds - 1);
            }, 1000);

        }

        
        return () => clearInterval(interval);
    }, [isActive, seconds, props]); // might be wrong

    function showTime() { 
        const minutes = Math.floor(seconds / 60)
        const secondsLeft = seconds - 60 * minutes

        return `${minutes < 10 ? '0' + minutes : minutes} : 
                ${secondsLeft < 10 ? '0' + secondsLeft : secondsLeft}` 
    }

    return (
        <div className="timer"> 
            <label>{ props.name }</label>
            <div className={`circle ${props.isComplete ? 'timer--completed' : 'timer--not--completed'}`}>
                <h1 className="circle--timer">{showTime()}</h1>
                <button onClick={startTimer}>
                    {isActive ? 
                        <img className="icon--pause" src={ pause } alt="pause"/> :
                        <img className="icon--play" src={ play } alt="play"/> } 
                </button>
                <h1>{ props.currentRep } / { props.targetRep }</h1>
            </div>
        </div>
    )
}

export default Timer;
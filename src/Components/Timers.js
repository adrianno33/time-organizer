import PropTypes from 'prop-types'
import Timer from './Timer'

// Defining prop types for every component is a best practice, especially if you aren't using a strongly-typed language like TypeScript.
// It helps define what props each component expects to be passed, and the types of those components (string, number, boolean, array...).
// The 'prop-types' library comes with create-react-app already & you can read more about it here: https://www.npmjs.com/package/prop-types
Timers.propTypes = {
  timers: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      name: PropTypes.string,
      seconds: PropTypes.number,
      // minutes: PropTypes.number,
      // isComplete: PropTypes.bool,
      currentRep: PropTypes.number,
      targetRep: PropTypes.number,
    })
  ).isRequired,
  onTimerCompletion: PropTypes.func.isRequired,
}
// You'll notice the props here are destructured, read more about that here https://medium.com/@lcriswell/destructuring-props-in-react-b1c295005ce0
// Overall it helps future you & collaborators know which props the component expects & uses without having to go find where the component is implemented
function Timers({ timers, onTimerCompletion }) {
  return timers.map((timer) => (
    <Timer key={timer.id} timer={timer} onTimerCompletion={onTimerCompletion} />
  )) // I would suggest keeping the timer together as an object rather than spreading it into the props so that it is clear what props are associated with the timer data
}

export default Timers

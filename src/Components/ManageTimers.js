import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

import trash from '../img/trash.png'
import convertSecondsToDisplayString from '../util/convertSecondsToDisplayString'

// I think the .reverse() on the timers.map().reverse() is confusing. If you want to have a newly added timer to the start of the timers list, edit the addTimer handler in App to add the timer to the beginning & not the end.

// I moved the timers.map(...) into the return because it makes it easier to figure out what is being rendered if all the JSX is together so it most-closely resembles what the DOM will look like. That being said, what you have is not invalid, just less readable (for me at least)
ManageTimers.propTypes = {
  timer: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    seconds: PropTypes.number,
    // minutes: PropTypes.number,
    // isComplete: PropTypes.bool,
    currentRep: PropTypes.number,
    targetRep: PropTypes.number,
  }).isRequired,
  onDeleteTimer: PropTypes.func.isRequired,
}
function ManageTimers({ timers, onDeleteTimer }) {
  return (
    <div>
      <table className='timers--table'>
        <thead>
          <tr className='timers--table--headers'>
            <td>Name</td>
            <td>Time</td>
            <td>Rep.</td>
          </tr>
        </thead>
        <tbody>
          {timers.map((timer) => (
            <tr key={timer.id}>
              <td>{timer.name}</td>
              <td>{convertSecondsToDisplayString(timer.seconds)}</td>
              <td>{timer.targetRep}</td>
              <td>
                <button className='delete--button'>
                  <img onClick={onDeleteTimer} alt='delete' id={timer.id} src={trash} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Link className='link' to='/add'>
        <button className='add--timer--button'>Add timer</button>
      </Link>
    </div>
  )
}

export default ManageTimers

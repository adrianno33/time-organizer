import { Link } from 'react-router-dom'

// Nice use of semantic HTML with the nav, ul, & li elements here!
function Navbar() {
  return (
    <nav>
      <ul>
        <li>
          <Link to='/'>Your Timers</Link>
        </li>
        <li>
          <Link to='/manage'>Manage Timers</Link>
        </li>
      </ul>
    </nav>
  )
}

export default Navbar

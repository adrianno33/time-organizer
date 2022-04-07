import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import plus from '../img/plus.png'
import PropTypes from 'prop-types'

// I moved this into a const so that you can reference it in both your useState() call and in the part where you reset the state when a form is submitted
const formDataInitialState = {
  // id: '', // Since the user is never updating this value, you don't need it in state here
  name: '',
  minutes: '',
  seconds: '',
  targetRep: '',
  // currentRep: 0, // Since the user is never updating this value, you don't need it in state here

  nameError: '',
  secondsError: '',
  minutesError: '',
  repError: '',
}

AddTimer.propTypes = {
  onAddTimer: PropTypes.func.isRequired,
}
// TODO: make this form work with just seconds
function AddTimer({ onAddTimer }) {
  const [formData, setFormData] = useState(formDataInitialState)
  const navigate = useNavigate()

  function handleFormChange(event) {
    setFormData((prevFormData) => {
      return {
        ...prevFormData,
        [event.target.name]: event.target.value,
      }
    })
  }

  function validate() {
    let nameError = ''
    let secondsError = ''
    let minutesError = ''
    let repError = ''

    if (!formData.name) {
      nameError = 'Required'
    }

    if (formData.name.length > 30) {
      nameError = 'Must be less than 30 characters' // updated wording to be more helpful to user
    }

    // I combined the minutes & seconds validation so that the user doesn't have to input both if they just need either minutes of seconds
    if (!formData.seconds && !formData.minutes) {
      secondsError = 'Both minutes and seconds cannot be blank' // There is probably better wording for this message
      minutesError = 'Both minutes and seconds cannot be blank'
    }

    if (!formData.targetRep) {
      repError = 'Required'
    }

    if (nameError || secondsError || minutesError || repError) {
      setFormData((prevFormData) => ({
        // This is how you return an object from an arrow function if you don't want to include a `return`
        ...prevFormData,
        nameError: nameError,
        secondsError: secondsError,
        minutesError: minutesError,
        repError: repError,
      }))
      return false
    }

    return true
  }

  function handleFormSubmit(event) {
    event.preventDefault()
    const isValid = validate()

    // Previously you were sending all of the form data back and adding even the Error properties back, which were then being stored in App's state.
    // I updated so that it is more explicit what is being sent to onAddTimer and you're only sending what you need to
    if (isValid) {
      let newTimerSeconds = 0
      if (formData.seconds) newTimerSeconds += parseInt(formData.seconds)
      if (formData.minutes) newTimerSeconds += parseInt(formData.minutes) * 60

      const newTimer = {
        name: formData.name,
        seconds: newTimerSeconds, // since I made the decision to only store time in seconds, here I'm calculating the seconds from the users input (minutes & seconds)
        targetRep: formData.targetRep,
        currentRep: 0,
      }
      onAddTimer(newTimer)
      setFormData(formDataInitialState) // clears form after adding a new timer
      navigate('/manage')
    }
  }

  return (
    <div className='add--timer'>
      <form className='add--timer--form' onSubmit={handleFormSubmit}>
        <label className='add--timer--label'>Add timer</label>
        <div className='input--box'>
          <input
            className='add--timer--input'
            type='text'
            name='name'
            placeholder='Name'
            value={formData.name}
            onChange={handleFormChange}
          />
          <label>{formData.nameError}</label>
        </div>
        <div className='input--box'>
          <input
            className='add--timer--input'
            type='number'
            name='minutes'
            placeholder='Minutes'
            value={formData.minutes}
            onChange={handleFormChange}
          />
          <label>{formData.minutesError}</label>
        </div>
        <div className='input--box'>
          <input
            className='add--timer--input'
            type='number'
            name='seconds'
            placeholder='Seconds'
            value={formData.seconds}
            onChange={handleFormChange}
          />
          <label>{formData.secondsError}</label>
        </div>
        <div className='input--box'>
          <input
            className='add--timer--input'
            type='number'
            name='targetRep'
            placeholder='Repetitions'
            value={formData.targetRep}
            onChange={handleFormChange}
          />
          <label>{formData.repError}</label>
        </div>

        <button className='add--timer--submit'>
          <img src={plus} alt='plus' />
        </button>
      </form>
    </div>
  )
}

export default AddTimer

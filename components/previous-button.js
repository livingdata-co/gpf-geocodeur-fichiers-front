import PropTypes from 'prop-types'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faCircleChevronLeft} from '@fortawesome/free-solid-svg-icons'

import colors from '@/styles/colors'

const PreviousButton = ({step, handleStep, position, ...props}) => (
  <div className='step-button-container'>
    <button type='submit' aria-label='Retourner à l’étape précédente' onClick={() => handleStep(step - 1)} {...props}>
      <FontAwesomeIcon icon={faCircleChevronLeft} color='#fff' size='xl' /> Étape précédente
    </button>

    <style jsx>{`
      .step-button-container {
        height: 40px;
        width: 100%;
        display: flex;
        justify-content: ${position === 'end' ? 'flex-end' : 'flex-start'};
      }

      button {
        width: fit-content;
        background: ${colors.darkBlue};
        color: #fff;
        padding: 5px 10px;
        border: none;
        border-radius: 4px;
        display: flex;
        gap: .5em;
        align-items: center;
        justify-content: center;
      }

      button:hover {
        cursor: pointer;
      }

      button:disabled {
        background-color: ${colors.darkGrey};
      }

      button:disabled:hover {
        cursor: not-allowed;
        background-color: ${colors.darkGrey};
      }
    `}</style>
  </div>
)

PreviousButton.defaultProps = {
  position: 'end'
}

PreviousButton.propTypes = {
  step: PropTypes.number.isRequired,
  position: PropTypes.oneOf([
    'start',
    'end'
  ]),
  handleStep: PropTypes.func.isRequired
}

export default PreviousButton

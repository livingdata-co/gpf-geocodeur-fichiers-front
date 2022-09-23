import PropTypes from 'prop-types'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faCircleChevronRight} from '@fortawesome/free-solid-svg-icons'

import colors from '@/styles/colors'

const NextButton = ({step, position, handleStep, ...props}) => (
  <div className='step-button-container'>
    <button type='submit' aria-label='Aller à l’étape suivante' onClick={() => handleStep(step + 1)} {...props}>
      <FontAwesomeIcon icon={faCircleChevronRight} color='#fff' size='xl' /> Étape suivante
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

NextButton.defaultProps = {
  position: 'end'
}

NextButton.propTypes = {
  step: PropTypes.number.isRequired,
  position: PropTypes.oneOf([
    'start',
    'end'
  ]),
  handleStep: PropTypes.func.isRequired
}

export default NextButton

import PropTypes from 'prop-types'

import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faCircleChevronRight, faCircleChevronLeft} from '@fortawesome/free-solid-svg-icons'

import colors from '@/styles/colors'

const StepButton = ({step, stepType, position, handleStep, ...props}) => {
  const stepLabel = stepType === 'next' ? 'Étape suivante' : 'Étape précédente'
  const icon = stepType === 'next' ? faCircleChevronRight : faCircleChevronLeft

  return (
    <div className='step-button-container'>
      <button type='submit' aria-label={stepLabel} onClick={() => stepType === 'next' ? handleStep(step + 1) : handleStep(step - 1)} {...props}>
        <FontAwesomeIcon icon={icon} color='#fff' size='xl' />
        {stepLabel}
      </button>

      <style jsx>{`
        .step-button-container {
          width: 100%;
          display: flex;
          justify-content: ${position === 'end' ? 'flex-end' : 'flex-start'};
        }

        button {
          width: fit-content;
          background: ${colors.darkBlue};
          color: #fff;
          padding: 10px;
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
}

StepButton.defaultProps = {
  stepType: 'next',
  position: 'end'
}

StepButton.propTypes = {
  step: PropTypes.number.isRequired,
  stepType: PropTypes.oneOf([
    'next',
    'previous'
  ]),
  position: PropTypes.oneOf([
    'start',
    'end'
  ]),
  handleStep: PropTypes.func.isRequired
}

export default StepButton

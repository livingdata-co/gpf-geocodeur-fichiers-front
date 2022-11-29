import PropTypes from 'prop-types'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faSquareCheck, faSquareXmark} from '@fortawesome/free-solid-svg-icons'

import theme from '@/styles/theme'

const ProcessingStep = ({label, step, progress}) => (
  <div className='step'>
    {step === 'failed' || step === 'aborted' ? (
      <FontAwesomeIcon icon={faSquareXmark} color={theme.error} />
    ) : (
      <FontAwesomeIcon icon={faSquareCheck} color={step === 'completed' ? theme.success : theme.bkgDisable} />
    )}
    - {label} {step === 'completed' ? '' : '- en cours…'} {progress ? `${progress}%` : ''}

    <style jsx>{`
      .step {
        display: flex;
        gap: 5px;
        font-weight: bold;
      }
    `}</style>
  </div>
)

ProcessingStep.propTypes = {
  label: PropTypes.string.isRequired,
  progress: PropTypes.number,
  step: PropTypes.oneOf([
    'validating',
    'geocoding',
    'completed',
    'aborted'
  ])
}

ProcessingStep.defaultProps = {
  step: 'validating',
  progress: null
}

export default ProcessingStep

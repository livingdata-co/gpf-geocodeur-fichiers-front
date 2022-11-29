import PropTypes from 'prop-types'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faSquareCheck, faSquareXmark} from '@fortawesome/free-solid-svg-icons'

import theme from '@/styles/theme'

const ProcessingStep = ({label, status}) => (
  <div className='step'>
    {status === 'failed' || status === 'aborted' ? (
      <FontAwesomeIcon icon={faSquareXmark} color={theme.error} />
    ) : (
      <FontAwesomeIcon icon={faSquareCheck} color={status === 'completed' ? theme.success : theme.bkgDisable} />
    )}
    {label}

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
  status: PropTypes.oneOf([
    'validating',
    'geocoding',
    'completed',
    'aborted'
  ])
}

ProcessingStep.defaultProps = {
  status: 'validating'
}

export default ProcessingStep

import PropTypes from 'prop-types'

import ProgressBar from '@/components/progress-bar'

const ValidationProgress = ({readBytes, totalBytes}) => (
  <ProgressBar label='Vérification en cours…' min={readBytes} max={totalBytes} />
)

ValidationProgress.propTypes = {
  readBytes: PropTypes.number.isRequired,
  totalBytes: PropTypes.number.isRequired,
}

export default ValidationProgress

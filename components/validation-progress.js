import PropTypes from 'prop-types'

import ProgressBar from '@/components/progress-bar'

const ValidationProgress = ({readBytes, totalBytes, isValidationComplete}) => (
  <div className='validation-progress'>
    <ProgressBar
      label={`${isValidationComplete ? 'Vérification du fichier terminée' : 'Vérification en cours…'}`}
      min={readBytes}
      max={totalBytes}
    />

    <style jsx>{`
      .validation-progress {
        margin-top: 1em;
        width: 100%;
        text-align: center;
      }
    `}</style>
  </div>

)

ValidationProgress.propTypes = {
  readBytes: PropTypes.number.isRequired,
  totalBytes: PropTypes.number.isRequired,
  isValidationComplete: PropTypes.bool.isRequired
}

export default ValidationProgress

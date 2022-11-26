import PropTypes from 'prop-types'

import ErrorMessage from '@/components/error-message'
import ProgressBar from '@/components/progress-bar'
import UnderlineTitle from '@/components/underline-title'
import InfoMessage from '@/components/info-message'

const ProjectProcessing = ({processing}) => (
  <div className='processing-container'>

    <UnderlineTitle>Traitements du fichier</UnderlineTitle>
    {processing.validationProgress && (
      <ProgressBar
        label='Validation du fichier'
        min={processing.validationProgress.readBytes}
        max={processing.validationProgress.totalBytes}
      />
    )}

    {processing.geocodingProgress && (
      <>
        <ProgressBar
          label='Géocodage'
          min={processing.geocodingProgress.readRows}
          max={processing.geocodingProgress.totalRows}
        />
        {processing.geocodingProgress.readRows === processing.geocodingProgress.totalRows && (
          <InfoMessage info={`${processing.geocodingProgress.totalRows} lignes traitées`} />
        )}
      </>
    )}

    {processing.step === 'failed' && (
      <ErrorMessage>Votre géocodage a échoué : {processing.globalError}</ErrorMessage>
    )}
  </div>
)

ProjectProcessing.propTypes = {
  processing: PropTypes.shape({
    step: PropTypes.oneOf(['validating', 'geocoding', 'completed', 'failed', 'aborted']).isRequired,
    validationProgress: PropTypes.shape({
      readRows: PropTypes.number.isRequired,
      readBytes: PropTypes.number.isRequired,
      totalBytes: PropTypes.number.isRequired
    }).isRequired,
    validationError: PropTypes.string,
    geocodingProgress: PropTypes.shape({
      readRows: PropTypes.number.isRequired,
      readRowsWithError: PropTypes.number,
      totalRows: PropTypes.number.isRequired
    }),
    geocodingError: PropTypes.string,
    startedAt: PropTypes.string.isRequired,
    finishedAt: PropTypes.string,
    heartbeat: PropTypes.string,
    globalError: PropTypes.string
  }).isRequired
}

export default ProjectProcessing

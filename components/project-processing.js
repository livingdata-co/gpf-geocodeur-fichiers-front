import PropTypes from 'prop-types'

import ProgressBar from '@/components/progress-bar'

const ProjectProcessing = ({processing}) => (
  <div className='processing-container'>
    {processing.validationProgress && (
      <ProgressBar
        label={processing.step === 'failed' ? `La validation a échoué : ${processing.validationError}` : 'Validation du fichier'}
        min={processing.validationProgress.readBytes}
        max={processing.validationProgress.totalBytes}
        hasFailed={processing.step === 'failed'}
      />
    )}

    {processing.geocodingProgress && (
      <ProgressBar
        label={processing.step === 'failed' ? `Le géocodage a échoué : ${processing.geocodingError}` : 'Géocodage'}
        min={processing.geocodingProgress.readRows}
        max={processing.geocodingProgress.totalRows}
        hasFailed={processing.step === 'failed'}
      />
    )}

    <style jsx>{`
      .processing-container {
        padding-left: 2em;
      }
    `}</style>
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

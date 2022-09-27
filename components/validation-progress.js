import PropTypes from 'prop-types'

import ProgressBar from '@/components/progress-bar'

const ValidationProgress = ({readRows, readBytes, totalBytes}) => (
  <div className='validation-progress'>
    <ProgressBar label='Vérification en cours…' min={readBytes} max={totalBytes} />
    <div className='rows'>{readRows} lignes traitées</div>

    <style jsx>{`
      .validation-progress {
        width: 100%;
        text-align: center;
      }

      .rows {
        font-weight: bold;
        font-style: italic;
      }
    `}</style>
  </div>

)

ValidationProgress.propTypes = {
  readRows: PropTypes.number.isRequired,
  readBytes: PropTypes.number.isRequired,
  totalBytes: PropTypes.number.isRequired,
}

export default ValidationProgress

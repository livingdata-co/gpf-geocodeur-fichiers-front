import PropTypes from 'prop-types'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faSquareCheck, faSquareXmark} from '@fortawesome/free-solid-svg-icons'

import theme from '@/styles/theme'

const ProgressBar = ({label, min, max, hasFailed}) => {
  const percent = Math.round(min / max * 100)
  const isCompleted = min === max

  return (
    <div className='progress-bar-container'>
      <h4>
        {hasFailed ? (
          <><FontAwesomeIcon icon={faSquareXmark} color={theme.error} /> {label}</>
        ) : (
          <><FontAwesomeIcon icon={faSquareCheck} color={isCompleted ? theme.success : theme.bkgDisable} /> {label} {!isCompleted && ` - en cours... ${percent}%`}</>
        )}

      </h4>

      <div className='progress-bar'>
        <span className='progress'>
          {percent > 0 && <span className='text'>{percent}%</span>}
        </span>
      </div>

      <style jsx>{`
        .progress-bar-container {
          width: 100%;
          margin: 1em 0;
        }

        h4 {
          margin-bottom: .4em;
        }

        .progress-bar {
          display: flex;
          height: 25px;
          width: 100%;
          border-radius: 50px;
          background-color: ${theme.bkgLight};
        }

        .progress {
          position: relative;
          top: 0;
          height: 100%;
          width: ${percent}%;
          background-color: ${isCompleted ? theme.bkgPrimary : theme.bkgLight};
          border-radius: 50px;
        }

        .text {
          position: absolute;
          text-align: center;
          font-weight: bold;
          width: 100%;
          height: 100%;
          display: flex;
          justify-content: center;
          align-items: center;
          color: ${theme.txtNeutral};
        }
      `}</style>
    </div>
  )
}

ProgressBar.propTypes = {
  label: PropTypes.string.isRequired,
  min: PropTypes.number.isRequired,
  max: PropTypes.number.isRequired,
  hasFailed: PropTypes.bool.isRequired
}

export default ProgressBar

import PropTypes from 'prop-types'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faSquareCheck, faSquareXmark} from '@fortawesome/free-solid-svg-icons'

import theme from '@/styles/theme'

import Spinner from '@/components/spinner'

const ProgressBar = ({label, min, max, hasFailed}) => {
  const percent = Math.round(min / max * 100)
  const isCompleted = min === max

  return (
    <div className='progress-bar-container'>
      <div className='title'>
        {hasFailed ? (
          <FontAwesomeIcon icon={faSquareXmark} color={theme.error} />
        ) : (
          isCompleted ? (
            <FontAwesomeIcon icon={faSquareCheck} color={theme.success} />
          ) : (
            <Spinner size='small' />
          )
        )}
        {label}

      </div>

      <div className='progress-bar'>
        <span className='progress'>
          {percent > 0 && <span className='text'>{percent}%</span>}
        </span>
      </div>
      <label>{min} / {max}</label>

      <style jsx>{`
        .progress-bar-container {
          width: 100%;
          margin: 1em 0;
        }

        .title {
          display: flex;
          gap: 5px;
          font-weight: bold;
          align-items: center;
          margin-bottom: .2em;
        }

        label {
          font-style: italic;
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
          background-color: ${theme.bkgPrimary};
          transition: width 500ms ease-in;
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

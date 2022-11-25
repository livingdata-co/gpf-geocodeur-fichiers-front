import PropTypes from 'prop-types'

import theme from '@/styles/theme'

const ProgressBar = ({label, min, max}) => {
  const percent = Math.round(min / max * 100)

  return (
    <div className='progress-bar-container'>
      <h3>{label}</h3>
      <div className='progress-bar'>
        <span className='progress'>
          <span className='text'>{percent}%</span>
        </span>
      </div>

      <style jsx>{`
        .progress-bar-container {
          width: 100%;
        }

        .progress-bar {
          display: flex;
          height: 25px;
          width: 100%;
          border-radius: 50px;
        }

        .progress {
          position: relative;
          top: 0;
          height: 100%;
          width: ${percent}%;
          background-color: ${theme.bkgPrimary};
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
  max: PropTypes.number.isRequired
}

export default ProgressBar

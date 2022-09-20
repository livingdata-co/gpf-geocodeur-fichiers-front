import PropTypes from 'prop-types'

import colors from '@/styles/colors'

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
            display: flex;
            justify-content: center;
            align-items: center;
            flex-direction: column;
        }

        .progress-bar {
            position: relative;
            height: 40px;
            width: 100%;
        }

        .progress {
            position: absolute;
            top: 0;
            height: 100%;
            width: ${percent}%;
            background-color: ${colors.darkBlue};
        }

        .text {
            position: absolute;
            text-align: center;
            width: 100%;
            height: 100%;
            display: flex;
            justify-content: center;
            align-items: center;
            color: #fff;
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

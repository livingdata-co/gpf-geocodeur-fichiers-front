import PropTypes from 'prop-types'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'

import colors from '@/styles/colors'

const ColumnSelector = ({label, icon, handleClick}) => (
  <div className='column' onClick={handleClick}>
    <div className='label'>{label}</div>
    <div className='icon'>
      <FontAwesomeIcon icon={icon} color='#fff' />
    </div>

    <style jsx>{`        
        .column {
            display: grid;
            grid-template-columns: 1fr 20px;
            cursor: pointer;
            padding: 0.25rem .5rem;
            border: 1px solid ${colors.darkBlue};
            border-radius: 4px;
        }

        .column:hover {
            box-shadow: 0 4px 8px 0 ${colors.darkBlue}1f, 0 6px 20px 0 ${colors.darkBlue}1f;
        }

        .label {
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .icon {
          display: flex;
          justify-content: center;
          align-items: center;
          background-color: ${colors.darkBlue};
          margin: -0.25rem -.5rem;
        }
        `}</style>
  </div>
)

ColumnSelector.propTypes = {
  label: PropTypes.string.isRequired,
  icon: PropTypes.oneOf(['plus', 'minus']).isRequired,
  handleClick: PropTypes.func.isRequired
}

export default ColumnSelector

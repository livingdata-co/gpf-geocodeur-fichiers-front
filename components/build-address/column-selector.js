import PropTypes from 'prop-types'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faPlus, faMinus} from '@fortawesome/free-solid-svg-icons'

import theme from '@/styles/theme'

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
          border: 1px solid ${icon === faPlus ? theme.borderPrimary : theme.borderSecondary};
          border-radius: 4px;
      }

      .column:hover {
          box-shadow: 0 4px 8px 0 ${theme.bkgDark}1f, 0 6px 20px 0 ${theme.bkgDark}1f;
      }

      .label {
        overflow: hidden;
        text-overflow: ellipsis;
      }

      .icon {
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: ${icon === faPlus ? theme.bkgPrimary : theme.bkgSecondary};
        margin: -0.25rem -.5rem;
      }
    `}</style>
  </div>
)

ColumnSelector.propTypes = {
  label: PropTypes.string.isRequired,
  icon: PropTypes.oneOf([faPlus, faMinus]).isRequired,
  handleClick: PropTypes.func.isRequired
}

export default ColumnSelector

import PropTypes from 'prop-types'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'

import colors from '@/styles/colors'

const Button = ({label, children, icon, ...props}) => (
  <button type='submit' aria-label={label} {...props}>
    {icon && <FontAwesomeIcon icon={icon} color='#fff' size='xl' />}
    {children}

    <style jsx>{`
      button {
        background: ${colors.blue};
        color: #fff;
        padding: 10px 20px;
        border: none;
        border-radius: 4px;
        width: fit-content;
        display: flex;
        gap: 5px;
        align-items: center;
      }

      button:hover {
        cursor: pointer;
      }

      button:disabled {
        background-color: ${colors.darkGrey};
      }

      button:disabled:hover {
        cursor: not-allowed;
        background-color: ${colors.darkGrey};
      }
    `}</style>
  </button>
)

Button.defaultProps = {
  label: null,
  icon: null,
  children: null
}

Button.propTypes = {
  label: PropTypes.string,
  icon: PropTypes.object,
  children: PropTypes.node
}
export default Button

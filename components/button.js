import PropTypes from 'prop-types'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'

import theme from '@/styles/theme'

const Button = ({label, color, children, icon, isIconAfter, ...props}) => (
  <button type='submit' className={color} aria-label={label} {...props}>
    <div className='label'>
      {icon && <FontAwesomeIcon icon={icon} color='#fff' size='xl' />}
      {children}
    </div>

    <style jsx>{`
      button {
        display: grid;
        color: #fff;
        padding: 10px 20px;
        border: none;
        border-radius: 4px;
        width: fit-content;
        display: flex;
        gap: 5px;
        align-items: center;
      }

      .label {
        display: flex;
        align-items: center;
        gap: .5em;
        flex-flow: ${isIconAfter ? 'row-reverse' : 'row'};
      }

      .primary {
        background: ${theme.bkgPrimary};
      }

      .secondary {
        background: ${theme.bkgSecondary};
      }

      .secondary:hover {
        cursor: pointer;
        background: ${theme.secondaryHover};
      }

      .primary:hover {
        cursor: pointer;
        background: ${theme.primaryHover};
      }

      .secondary:disabled, .primary:disabled {
        background: ${theme.bkgDisable};
        color: ${theme.txtDisable};
        cursor: not-allowed;
      }
    `}</style>
  </button>
)

Button.defaultProps = {
  label: null,
  icon: null,
  color: 'primary',
  isIconAfter: false,
  children: null
}

Button.propTypes = {
  label: PropTypes.string,
  icon: PropTypes.object,
  color: PropTypes.oneOf([
    'primary',
    'secondary'
  ]),
  isIconAfter: PropTypes.bool,
  children: PropTypes.node
}
export default Button

import PropTypes from 'prop-types'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'

const ButtonUnderline = ({color, icon, label, children, ...props}) => (
  <button type='submit' className={`${color}`} aria-label={label} {...props}>
    {icon && <FontAwesomeIcon icon={icon} size='lg' />}
    {children}

    <style jsx>{`
      button {
        text-decoration: underline;
        background: none;
        border: none;
        cursor: pointer;
        display: flex;
        gap: 5px;
        color: ${color};
      }
    `}</style>
  </button>
)

ButtonUnderline.propTypes = {
  label: PropTypes.string,
  icon: PropTypes.object,
  color: PropTypes.string,
  children: PropTypes.node
}

ButtonUnderline.defaultProps = {
  label: null,
  icon: null,
  color: 'primary',
  children: null
}
export default ButtonUnderline

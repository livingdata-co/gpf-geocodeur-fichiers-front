import PropTypes from 'prop-types'
import Link from 'next/link'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'

import theme from '@/styles/theme'

const ButtonLink = ({label, color, isExternal, href, children, icon, ...props}) => (
  <div>
    {isExternal ? (
      <a href={href} className={color} aria-label={label} {...props} target='_blank' rel='noreferrer'>
        {icon && <FontAwesomeIcon icon={icon} color='#fff' size={25} />}
        {children}
      </a>
    ) : (
      <Link href={href}>
        <button type='button' className={color} {...props}>
          {icon && <FontAwesomeIcon icon={icon} color='#fff' size={25} />}
          {children}
        </button>
      </Link>
    )}

    <style jsx>{`
      a, button {
        text-decoration: none;
        color: #fff;
        padding: 10px 20px;
        border: none;
        border-radius: 4px;
        width: fit-content;
        display: flex;
        gap: 5px;
        align-items: baseline;
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
  </div>
)

ButtonLink.defaultProps = {
  label: null,
  icon: null,
  color: 'primary',
  isExternal: false,
  children: null
}

ButtonLink.propTypes = {
  label: PropTypes.string,
  icon: PropTypes.object,
  color: PropTypes.oneOf([
    'primary',
    'secondary'
  ]),
  href: PropTypes.string.isRequired,
  isExternal: PropTypes.bool,
  children: PropTypes.node
}

export default ButtonLink

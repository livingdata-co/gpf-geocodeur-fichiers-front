import PropTypes from 'prop-types'

import colors from '@/styles/colors'

const Button = ({label, children, ...props}) => (
  <button type='submit' aria-label={label} {...props}>
    {children}

    <style jsx>{`
        button {
            background: ${colors.blue};
            color: #fff;
            padding: 10px 20px;
            border: none;
            border-radius: 4px;
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
  children: null
}

Button.propTypes = {
  label: PropTypes.string,
  children: PropTypes.node
}
export default Button

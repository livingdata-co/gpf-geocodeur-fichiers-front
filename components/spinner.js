import PropTypes from 'prop-types'

import theme from '@/styles/theme'

const Spinner = ({size}) => (
  <div className={`loader ${size}`}>
    <style jsx>{`
      .loader {
        border-radius: 50%;
        animation: spin 2s linear infinite;
      }

      .small {
        border: 2px solid ${theme.colors.white};
        border-top: 2px solid #3498db; /* Blue */
        width: 15px;
        min-width: 15px;
        height: 15px;
      }

      .regular {
        border: 4px solid ${theme.colors.white};
        border-top: 4px solid #3498db; /* Blue */
        width: 40px;
        height: 40px;
      }


      .big {
        border: 5px solid ${theme.colors.white};
        border-top: 5px solid #3498db; /* Blue */
        width: 60px;
        height: 60px;
      }

      @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
      }
    `}
    </style>
  </div>
)

Spinner.propTypes = {
  size: PropTypes.oneOf([
    'small',
    'regular',
    'big'
  ])
}

Spinner.defaultProps = {
  size: 'regular'
}

export default Spinner

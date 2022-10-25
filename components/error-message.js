import PropTypes from 'prop-types'

import theme from '@/styles/theme'

const ErrorMessage = ({children}) => (
  <div className='error'>
    {children}

    <style jsx>{`
      .error {
        color: ${theme.error};
        font-weight: bold;
        width: 100%;
        text-align: center;
        margin: 10px 0;
      }
    `}</style>
  </div>
)

ErrorMessage.propTypes = {
  children: PropTypes.node.isRequired
}

export default ErrorMessage

import PropTypes from 'prop-types'

import colors from '@/styles/colors'

const ErrorMessage = ({children}) => (
  <div className='error'>
    {children}

    <style jsx>{`
      .error {
        color: ${colors.error};
        margin: 10px 0;
      }
    `}</style>
  </div>
)

ErrorMessage.propTypes = {
  children: PropTypes.node.isRequired
}

export default ErrorMessage

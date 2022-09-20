import PropTypes from 'prop-types'

import colors from '@/styles/colors'

const ErrorMessage = ({children}) => (
  <div className='error'>
    {children}
    <style jsx>{`
            .error {
                color: ${colors.error};
            }
            `}</style>
  </div>
)

ErrorMessage.propTypes = {
  children: PropTypes.node.isRequired
}

export default ErrorMessage

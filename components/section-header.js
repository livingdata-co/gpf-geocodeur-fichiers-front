import PropTypes from 'prop-types'

import colors from '@/styles/colors'

const SectionHeader = ({children}) => (
  <>
    <h2>{children}</h2>
    <style jsx>{`
        h2 {
          font-weight: 600;
          color: ${colors.lightBlue};
          margin: 0.4em 0;
        }
      `}
    </style>
  </>
)

SectionHeader.propTypes = {
  children: PropTypes.string.isRequired
}

export default SectionHeader

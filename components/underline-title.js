import PropTypes from 'prop-types'
import theme from '@/styles/theme'

const UnderlineTitle = ({children}) => (
  <div className='title-container'>
    <h4>{children}</h4>

    <style jsx>{`
      .title-container {
        width: fit-content;
        border-bottom: solid 5px ${theme.borderLight};
        margin: .5em 0 1em 0;
      }

      .title-container h4 {
        padding: 0;
        margin: 0;
      }
    `}</style>
  </div>
)

UnderlineTitle.propTypes = {
  children: PropTypes.node
}

export default UnderlineTitle

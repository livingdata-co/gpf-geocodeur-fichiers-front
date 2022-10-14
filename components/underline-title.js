import PropTypes from 'prop-types'
import theme from '@/styles/theme'

const UnderlineTitle = ({children}) => (
  <div className='title-container'>
    <h2>{children}</h2>

    <style jsx>{`
      .title-container {
        width: fit-content;
        border-bottom: solid 5px ${theme.borderDark};
        margin: 1em 0;
      }
    `}</style>
  </div>
)

UnderlineTitle.propTypes = {
  children: PropTypes.node
}

export default UnderlineTitle

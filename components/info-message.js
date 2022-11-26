import PropTypes from 'prop-types'

import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faInfoCircle} from '@fortawesome/free-solid-svg-icons'

import colors from '@/styles/colors'

const InfoMessage = ({info}) => (
  <div className='info'>
    <FontAwesomeIcon icon={faInfoCircle} color={colors.blue} />
    <i>{info}</i>

    <style jsx>{`
      .info {
        display: flex;
        font-weight: bold;
        align-items: center;
        gap: .5em;
      }
        `}</style>
  </div>
)

InfoMessage.propTypes = {
  info: PropTypes.string.isRequired
}

export default InfoMessage

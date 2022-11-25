import PropTypes from 'prop-types'
import {faFile} from '@fortawesome/free-solid-svg-icons'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'

import {formatFileSize} from '@/lib/file'

const FileDetails = ({name, size}) => (
  <div className='file-details'>
    <FontAwesomeIcon icon={faFile} size='3x' />
    <div className='file-infos'>
      <div className='name'>{name}</div>
      <div className='size'>{formatFileSize(size)}</div>
    </div>

    <style jsx>{`
    .file-details {
        display: flex;
        align-items: center;
        gap: 1em;
        }

        .file-infos {
        border-left: 3px solid;
        margin-left: 5px;
        padding: 0 10px;
        }

        .name {
        font-weight: bolder;
        }

        .size {
        font-style: italic;
        font-size: 14px;
        }
        `}</style>
  </div>
)

FileDetails.propTypes = {
  name: PropTypes.string.isRequired,
  size: PropTypes.number.isRequired
}

export default FileDetails

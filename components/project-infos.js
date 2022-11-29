import PropTypes from 'prop-types'

import theme from '@/styles/theme'

import {formatDate} from '@/lib/date'

import UnderlineTitle from '@/components/underline-title'
import FileDetails from '@/components/file-details'
import Pipeline from '@/components/pipeline'

const ProjectInfos = ({createdAt, inputFile, pipeline}) => (
  <div className='project-infos-container' >

    <UnderlineTitle>Fichier déposé</UnderlineTitle>
    <div className='file-details'>
      <FileDetails name={inputFile.filename} size={inputFile.size} />
    </div>
    <i>{formatDate(createdAt)}</i>

    <Pipeline {...pipeline} />

    <style jsx>{`
    .file-details {
        display: flex;
        align-items: center;
        gap: 1em;
        background: ${theme.bkgSecondary};
        color: #fff;
        border-radius: 3px;
        padding: .5em 1em;
    }
    `}</style>
  </div>
)

ProjectInfos.propTypes = {
  createdAt: PropTypes.string.isRequired,
  inputFile: PropTypes.shape({
    filename: PropTypes.string.isRequired,
    size: PropTypes.number.isRequired
  }).isRequired,
  pipeline: PropTypes.object.isRequired
}

export default ProjectInfos

import PropTypes from 'prop-types'
import Router from 'next/router'
import {faTimesCircle} from '@fortawesome/free-regular-svg-icons'

import {formatDate} from '@/lib/date'

import colors from '@/styles/colors'

import Button from '@/components/button'
import ProjectStatus from '@/components/project-status'

const Project = ({id, status, createdAt, updatedAt, inputFile}) => {
  const isInProgress = ['waiting', 'processing'].includes(status)
  const isAvailable = ['waiting', 'completed', 'failed'].includes(status)

  return (
    <div className='grid'>
      <ProjectStatus status={status} />
      <div>{formatDate(createdAt)}</div>
      <div>{formatDate(updatedAt)}</div>
      <div>{inputFile.filename}</div>
      <div>{isInProgress && <Button icon={faTimesCircle} color='secondary'>Annuler</Button>}</div>
      <div>{isAvailable && <Button onClick={() => Router.push(`/project/${id}`)}>Consulter</Button>}</div>

      <style jsx>{`
      .grid {
        display: grid;
        grid-template-columns: 1fr 1fr 1fr 1fr 116px 100px;
        grid-gap: 1em;
        padding: 10px 20px;
      }

      .grid div {
        text-overflow: ellipsis;
        overflow: hidden;
      }

      .grid:hover {
        background: ${colors.lightGrey}
      }
      `}</style>
    </div>
  )
}

Project.propTypes = {
  id: PropTypes.string.isRequired,
  status: PropTypes.string.isRequired,
  createdAt: PropTypes.string.isRequired,
  updatedAt: PropTypes.string.isRequired,
  inputFile: PropTypes.shape({
    filename: PropTypes.string.isRequired
  }).isRequired
}

export default Project

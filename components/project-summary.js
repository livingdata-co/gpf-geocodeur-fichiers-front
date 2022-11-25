import PropTypes from 'prop-types'
import Router from 'next/router'
import {faTimesCircle, faTrashAlt} from '@fortawesome/free-regular-svg-icons'

import colors from '@/styles/colors'

import {abortGeocoding} from '@/lib/api'
import {formatDate} from '@/lib/date'

import Button from '@/components/button'
import ProjectStatus from '@/components/project-status'

const Project = ({id, status, createdAt, updatedAt, inputFile, onDelete}) => {
  const isInProgress = ['waiting', 'processing'].includes(status)
  const isAvailable = ['waiting', 'processing', 'completed', 'failed'].includes(status)

  return (
    <div className='grid'>
      <ProjectStatus status={status} />
      <div>{formatDate(createdAt)}</div>
      <div>{formatDate(updatedAt)}</div>
      <div>{inputFile.filename}</div>
      <div>{isInProgress ? (
        <Button icon={faTimesCircle} color='secondary' onClick={() => abortGeocoding(id)}>Annuler</Button>
      ) : (
        <Button icon={faTrashAlt} color='secondary' onClick={onDelete}>Supprimer</Button>
      )}</div>
      <div>{isAvailable && <Button onClick={() => Router.push(`/project?projectId=${id}`)}>Consulter</Button>}</div>

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
  }).isRequired,
  onDelete: PropTypes.func.isRequired
}

export default Project

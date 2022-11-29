import PropTypes from 'prop-types'
import Router from 'next/router'
import {faEye, faTrashAlt} from '@fortawesome/free-regular-svg-icons'

import colors from '@/styles/colors'

import {formatDate} from '@/lib/date'
import {formatFileSize} from '@/lib/file'

import ProjectStatus from '@/components/project-status'
import ButtonUnderline from '@/components/button-underline'

const ProjectSummary = ({id, status, createdAt, updatedAt, inputFile, onDelete}) => {
  const isInProgress = ['waiting', 'processing'].includes(status)
  const isAvailable = ['waiting', 'processing', 'completed', 'failed'].includes(status)

  const handleSelect = () => {
    Router.push(
      `/project?projectId=${id}`,
      `/project/${id}`
    )
  }

  return (
    <tr>
      <td className='name'>{inputFile.filename}</td>
      <td>{formatFileSize(inputFile.size)}</td>
      <td>{formatDate(createdAt)}</td>
      <td>{status === 'completed' ? formatDate(updatedAt) : '-'}</td>
      <td><ProjectStatus status={status} /></td>
      <td className='actions'>
        {isAvailable && <ButtonUnderline icon={faEye} color={colors.blue} onClick={handleSelect}>Consulter</ButtonUnderline>}
        {!isInProgress && (
          <ButtonUnderline icon={faTrashAlt} color={colors.red} onClick={onDelete}>Supprimer</ButtonUnderline>
        )}
      </td>

      <style jsx>{`
        tr:not(:first-child) {
          border-top: solid 1em ${colors.white};
        }

        td {
          background: #FAFAFA;
          height: 40px;
          padding: 10px;
          text-align: center;
          font-style: italic;
        }

        .name {
          font-weight: bold;
          font-style: normal;
          text-align: start;
        }

        .actions {
          display: flex;
          align-items: center;
          gap: 1em;
        }
      `}</style>
    </tr>
  )
}

ProjectSummary.propTypes = {
  id: PropTypes.string.isRequired,
  status: PropTypes.string.isRequired,
  createdAt: PropTypes.string.isRequired,
  updatedAt: PropTypes.string.isRequired,
  inputFile: PropTypes.shape({
    filename: PropTypes.string.isRequired,
    size: PropTypes.number.isRequired
  }).isRequired,
  onDelete: PropTypes.func.isRequired
}

export default ProjectSummary

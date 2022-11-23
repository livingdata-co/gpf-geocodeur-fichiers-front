import PropTypes from 'prop-types'

import colors from '@/styles/colors'

import Tooltip from '@/components/tooltip'

const STATUS = {
  waiting: {bgColor: colors.grey, label: 'En file d’attente'},
  processing: {bgColor: colors.blue, label: 'En cours…'},
  completed: {bgColor: colors.green, label: 'Terminé'},
  failed: {bgColor: colors.red, label: 'Échec'}
}

const StatusTag = ({status, error}) => {
  const Tag = () => (
    <div className='status-tag'>
      {STATUS[status].label}

      <style jsx>{`
        .status-tag {
            display: inherit;
            align-items: center;
            background-color: ${STATUS[status].bgColor};
            color: ${colors.white};
            padding: 5px 10px; 
            border-radius: 4px;
            text-align: center;
            vertical-align: baseline;
            text-overflow: ellipsis;
            overflow: hidden;
        }
        `}</style>
    </div>
  )

  return status === 'failed' ? (
    <Tooltip text={status} content={error}>
      <Tag />
    </Tooltip>
  ) : (
    <Tag />
  )
}

StatusTag.defaultProps = {
  error: null
}

StatusTag.propTypes = {
  status: PropTypes.oneOf(['waiting', 'processing', 'completed', 'failed']).isRequired,
  error: PropTypes.string
}

export default StatusTag


import PropTypes from 'prop-types'

import colors from '@/styles/colors'
import theme from '@/styles/theme'

const STATUS = {
  waiting: {bgColor: colors.lightOrange, label: 'En file d’attente'},
  processing: {bgColor: colors.lightBlue, label: 'En cours…'},
  completed: {bgColor: colors.lightGreen, label: 'Terminé'},
  failed: {bgColor: colors.lighterRed, label: 'Échec'}
}

const StatusTag = ({status}) => (
  <div className='status-tag'>
    {STATUS[status].label}

    <style jsx>{`
      .status-tag {
        font-style: normal;
        align-items: center;
        background-color: ${STATUS[status].bgColor};
        font-weight: bold;
        color: ${theme.txtPrimary};
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

StatusTag.propTypes = {
  status: PropTypes.oneOf([
    'waiting',
    'processing',
    'completed',
    'failed'
  ]).isRequired
}

export default StatusTag


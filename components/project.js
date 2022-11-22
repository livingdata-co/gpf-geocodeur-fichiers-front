import PropTypes from 'prop-types'

const Project = ({status, createdAt, updatedAt}) => (
  <div>
    <div>{status}</div>
    <div>Créé le {createdAt}</div>
    <div>Mis à jour le {updatedAt}</div>
  </div>
)

Project.propTypes = {
  status: PropTypes.oneOf(['idle', 'waiting', 'processing', 'completed', 'failed']).isRequired,
  createdAt: PropTypes.string.isRequired,
  updatedAt: PropTypes.string.isRequired
}

export default Project

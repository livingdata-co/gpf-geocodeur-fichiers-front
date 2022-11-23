import PropTypes from 'prop-types'

import Project from '@/components/project'
import colors from '@/styles/colors'

const ProjectsList = ({projects}) => (
  <div className='projects-container'>
    <div className='grid'>
      <div>Statut</div>
      <div>Créé le </div>
      <div>Mis à jour le</div>
      <div>Nom du fichier</div>
      <div />
      <div />
    </div>

    <div className='list'>
      {projects.map(project => (
        <Project key={project.id} {...project} />
      ))}
    </div>

    {projects.length === 0 && (
      <div>Vous n’avez aucun géocodage</div>
    )}

    <style jsx>{`
        .projects-container {
            display: flex;
            flex-direction: column;
        }

        .grid {
            display: grid;
            grid-template-columns: 1fr 1fr 1fr 1fr 116px 100px;
            background-color: ${colors.blue};
            color: ${colors.white};
            grid-gap: 1em;
            padding: 10px 20px;
        }

        .grid div {
            font-weight: bold;
        }
        `}
    </style>
  </div>
)

ProjectsList.propTypes = {
  projects: PropTypes.array.isRequired
}

export default ProjectsList

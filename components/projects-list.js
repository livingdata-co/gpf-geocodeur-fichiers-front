import PropTypes from 'prop-types'

import ProjectSummary from '@/components/project-summary'
import colors from '@/styles/colors'

const ProjectsList = ({projects, handleDelete}) => (
  <div className='projects-container'>
    {projects.length > 0 && (
      <>
        <h2>Vos géocodages</h2>
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
            <ProjectSummary key={project.id} {...project} onDelete={() => handleDelete(project.id)} />
          ))}
        </div>
      </>
    )}

    {projects.length === 0 && (
      <>
        <div className='intro'>
          <h2>Lorem ipsum</h2>
          <p>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit.</p>
          <ul>
            <li>Nemo enim ipsam voluptatem</li>
            <li>Nemo enim ipsam voluptatem</li>
            <li>Nemo enim ipsam voluptatem</li>
            <li>Nemo enim ipsam voluptatem</li>
            <li>Nemo enim ipsam voluptatem</li>
          </ul>
        </div>

        <div className='projects-empty-list'>
          <h3>Vos géocodages terminés ou en cours</h3>
          <div>Vous n’avez aucune géocodage terminé ou en cours</div>
        </div>
      </>
    )}

    <style jsx>{`
      .projects-container {
        display: flex;
        flex-direction: column;
      }

      .intro {
        text-align: center;
      }

      .intro h2 {
        font-size: 1.5rem;
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

      .projects-empty-list {
        margin: 2em 0;
        text-align: center;
      }

      .projects-empty-list div {
        font-style: italic;
      }
    `}
    </style>
  </div>
)

ProjectsList.propTypes = {
  projects: PropTypes.array.isRequired,
  handleDelete: PropTypes.func.isRequired
}

export default ProjectsList

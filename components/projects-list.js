import PropTypes from 'prop-types'

import UnderlineTitle from './underline-title'
import ProjectSummary from '@/components/project-summary'

import theme from '@/styles/theme'

const ProjectsList = ({projects, handleDelete}) => (
  <div className='projects-container'>
    {projects.length > 0 && (
      <>
        <UnderlineTitle>Vos géocodages</UnderlineTitle>
        <table cellSpacing='0'>
          <thead >
            <tr>
              <th>Fichier</th>
              <th>Taille</th>
              <th>Date de création</th>
              <th>Date de fin de traitement</th>
              <th>Statut</th>
              <th />
            </tr>
          </thead>

          <tbody>
            {projects.map(project => (
              <ProjectSummary key={project.id} {...project} onDelete={() => handleDelete(project.id)} />
            ))}
          </tbody>
        </table>
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
        margin-bottom: 3em;
      }

      .intro {
        text-align: center;
      }

      .intro h2 {
        font-size: 1.5rem;
      }

      table {
        border-collapse: collapse;
        background: ${theme.bkgSecondary};
      }

      th {
        padding: 1em;
        color: white;
      }

      .projects-empty-list {
        margin-top: 2em;
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

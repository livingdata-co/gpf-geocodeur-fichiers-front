import PropTypes from 'prop-types'

import UnderlineTitle from './underline-title'
import ProjectSummary from '@/components/project-summary'

import theme from '@/styles/theme'

const ProjectsList = ({projects, handleDelete}) => (
  <div className='projects-container'>
    {projects.length > 0 ? (
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
    ) : (
      <div className='intro'>
        <h2>Nouveau géocodeur de fichier</h2>
        <p>Cet outil interactif permet de géocoder un fichier CSV en quelques clics. Il ne supporte actuellement que le géocodage d’adresses.</p>
        <p>Bien que simple d’utilisation, de nombreuses fonctionnalités avancées sont disponibles :</p>
        <ul>
          <li>paramétrage du format d’entrée (encodage, séparateurs)</li>
          <li>construction du libellé à géocoder</li>
          <li>sélection des paramètres de géocodage (filtres, préférence géographique)</li>
          <li>choix et paramétrage du format de sortie (CSV, GeoJSON)</li>
          <li>fonctionnement asynchrone (revenez plus tard !)</li>
          <li>conservation de l’historique des géocodages et des résultats pendant 14 jours</li>
        </ul>
      </div>
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

      ul {
        text-align: left;
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

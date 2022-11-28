import {useState, useCallback, useEffect, useContext, useMemo} from 'react'
import Router from 'next/router'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faPlus, faInfoCircle} from '@fortawesome/free-solid-svg-icons'

import {deleteProject, getProjects} from '@/lib/api'

import colors from '@/styles/colors'
import theme from '@/styles/theme'

import ScreenContext from '@/contexts/screen-frame'

import Layout from '@/layouts/main'

import Spinner from '@/components/spinner'
import Button from '@/components/button'
import ProjectsList from '@/components/projects-list'
import ErrorMessage from '@/components/error-message'

const Home = () => {
  const {isFrame, screenSize} = useContext(ScreenContext)

  const [projects, setProjects] = useState()
  const [error, setError] = useState()

  const isProjectInProgress = useMemo(() => {
    if (projects) {
      const allStatus = new Set(projects.map(({status}) => status))
      return allStatus.has('waiting') || allStatus.has('processing')
    }

    return false
  }, [projects])

  const onDeleteProject = async projectId => {
    await deleteProject(projectId)
    await getAvailableProjects()
  }

  const getAvailableProjects = useCallback(async () => {
    try {
      const projects = await getProjects()
      const availableProjects = projects.filter(project => project && project.status !== 'idle')
      setProjects(availableProjects.sort((a, b) => a.updatedAt < b.updatedAt))
    } catch (error) {
      setError(`Impossible de récupérer vos géocodages : ${error}`)
    }
  }, [])

  // Fetch projects on page loading
  useEffect(() => {
    getAvailableProjects()
  }, [getAvailableProjects])

  return (
    <Layout isFrame={isFrame} screenSize={screenSize}>
      <div className='info-container'><FontAwesomeIcon icon={faInfoCircle} size='lg' />&nbsp;&nbsp;Les géocodages terminés sont conservés pendant 14 jours</div>
      <div className='container'>
        {projects ? (
          <ProjectsList projects={projects} handleDelete={onDeleteProject} />
        ) : (
          <div className='loading'>
            <Spinner />
          </div>
        )}

        <div className='new-button'>
          <Button
            size='large'
            icon={faPlus}
            disabled={isProjectInProgress}
            onClick={() => Router.push('/new')}
          >
            Nouveau géocodage
          </Button>
          {isProjectInProgress && <div>Vous devez attendre la fin du traitement du fichier avant de pouvoir géocodager de nouveau</div>}
        </div>

        {error && <ErrorMessage>{error}</ErrorMessage>}
      </div>

      <style jsx>{`
        .info-container {
          border: solid 2px ${theme.borderPrimary};
          background: ${theme.bkgLight};
          color: ${colors.blue};
          font-weight: bold;
          font-size: .9rem;
          padding: .5em;
          text-align: center;
        }

        .container {
          display: flex;
          flex-direction: column;
          gap: 1em;
          padding: 2rem;
        }

        .new-button {
          width: 100%;
          display: flex;
          flex-direction: column;
          justify-content: center;
          color: ${theme.txtColor};
          font-weight: bold;
          align-items: center;
          gap: 1em;
        }

        .loading {
          display: flex;
          align-items: center;
          justify-content: center;
        }
      `}
      </style>
    </Layout>
  )
}

export default Home

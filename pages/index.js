import {useState, useEffect, useContext, useMemo} from 'react'
import Router from 'next/router'
import {includes} from 'lodash'
import {faPlus} from '@fortawesome/free-solid-svg-icons'

import {getProjects} from '@/lib/api'

import ScreenContext from '@/contexts/screen-frame'

import Layout from '@/layouts/main'

import Spinner from '@/components/spinner'
import Button from '@/components/button'
import Project from '@/components/project'
import ErrorMessage from '@/components/error-message'

const Home = () => {
  const {isFrame, screenSize} = useContext(ScreenContext)

  const [projects, setProjects] = useState()
  const [error, setError] = useState()

  const isProjectInProgress = useMemo(() => {
    if (projects) {
      const allStatus = projects.map(({status}) => status)
      return includes(allStatus, 'waiting') || includes(allStatus, 'processing')
    }

    return false
  }, [projects])

  useEffect(() => {
    async function getAvailableProjects() {
      try {
        const projects = await getProjects()
        const availableProjects = projects.filter(({status}) => status !== 'idle')
        setProjects(availableProjects)
      } catch (error) {
        setError(`Impossible de récupérer vos géocodages : ${error}`)
      }
    }

    getAvailableProjects()
  }, [])

  return (
    <Layout isFrame={isFrame} screenSize={screenSize}>
      <div className='container'>
        <h2>Vos géocodages</h2>
        <div className='container'>
          {projects && (
            <ul>
              {projects.map(project => (
                <Project key={project.id} {...project} />
              ))}
            </ul>
          )}

          {projects?.length === 0 && (
            <div>Vous n’avez aucun géocodage</div>
          )}
        </div>

        <Button
          icon={faPlus}
          disabled={isProjectInProgress}
          onClick={() => Router.push('/new')}
        >
          Nouveau géocodage
        </Button>

        {<div className='loading'>
          {!projects && !error && <Spinner />}
        </div>}

        {error && <ErrorMessage>{error}</ErrorMessage>}

        <style jsx>{`
          .container {
            display: flex;
            flex-direction: column;
            gap: 1em;
            padding: 2rem;
          }

          .loading {
            display: flex;
            align-items: center;
            justify-content: center;
          }
        `}
        </style>
      </div>
    </Layout>
  )
}

export default Home

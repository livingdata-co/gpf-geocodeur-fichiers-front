import {useState, useEffect, useContext, useMemo} from 'react'
import Router from 'next/router'
import {faPlus} from '@fortawesome/free-solid-svg-icons'

import {getProjects} from '@/lib/api'

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
        {}
        {projects ? (
          <ProjectsList projects={projects} />
        ) : (
          <div className='loading'>
            <Spinner />
          </div>
        )}

        <Button
          icon={faPlus}
          disabled={isProjectInProgress}
          onClick={() => Router.push('/new')}
        >
          Nouveau géocodage
        </Button>

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

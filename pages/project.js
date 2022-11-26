import {useState, useEffect, useContext, useCallback} from 'react'
import {useRouter} from 'next/router'
import {faDownload, faCircleChevronLeft} from '@fortawesome/free-solid-svg-icons'

import {abortGeocoding, API_URL, getProject, getProjectProcessing} from '@/lib/api'

import Layout from '@/layouts/main'

import ScreenFrameContext from '@/contexts/screen-frame'

import ErrorMessage from '@/components/error-message'
import Button from '@/components/button'
import Loading from '@/components/loading'
import ProjectProcessing from '@/components/project-processing'
import ButtonLink from '@/components/button-link'
import ProjectInfos from '@/components/project-infos'

const Project = () => {
  const {isFrame, screenSize} = useContext(ScreenFrameContext)
  const router = useRouter()

  const [project, setProject] = useState()
  console.log("🚀 ~ file: project.js ~ line 23 ~ Project ~ project", project)
  const [processing, setProcessing] = useState()
  const [isCompleted, setIsCompleted] = useState()
  const [error, setError] = useState()

  const refreshByPolling = useCallback(async () => {
    const processing = await getProjectProcessing(project.id)

    if (['completed', 'failed'].includes(processing.step)) {
      const p = await getProject(project.id)
      setProject(p)
    }

    setProcessing(processing)
  }, [project])

  useEffect(() => {
    async function fetchProject(projectId) {
      try {
        const p = await getProject(projectId)
        setProject(p)
        setProcessing(p.processing)
      } catch {
        router.replace('/404')
      }
    }

    if (router.query.projectId) {
      fetchProject(router.query.projectId)
    }
  }, [router])

  // Handle errors
  useEffect(() => {
    if (['failed', 'aborted'].includes(processing?.step)) {
      setError(processing.validationError || processing.geocodingError)
    } else if (project?.status === 'failed') {
      setError(project.globalError)
    }
  }, [processing, project])

  // Stop polling
  useEffect(() => {
    if (project) {
      const isCompleted = ['completed', 'failed'].includes(project.status)
      setIsCompleted(isCompleted)
    }
  }, [project])

  useEffect(() => {
    if (isCompleted === false) {
      const id = setInterval(refreshByPolling, 1000)

      return () => {
        clearInterval(id)
      }
    }
  }, [isCompleted, refreshByPolling])

  if (!error && !project) {
    return (
      <Loading label='Récupération du géocodage…' />
    )
  }

  return (
    <Layout isFrame={isFrame} screenSize={screenSize}>
      <div className='container'>

        <ProjectInfos {...project} />

        {project.status === 'waiting' && !processing?.step && (
          <Loading label='Vous êtes actuellement en file d’attente. Votre géocodage démarrera d’ici quelques instant' />
        )}

        {processing && (
          <ProjectProcessing processing={processing} />
        )}

        {processing.step === 'completed' ? (
          <>
            <div className='action-buttons'>
              {project.outputFile ? (
                <ButtonLink href={`${API_URL}/projects/${project.id}/output-file/${project.outputFile.token}`} download={project.outputFile.filename} isExternal label='Télécharger le fichier' icon={faDownload}>
                  Télécharger le fichier
                </ButtonLink>
              ) : (
                <Loading label='Mise à disposition du fichier géocodé' />
              )}
            </div>

            <div className='new-geocodage'>
              <Button onClick={() => router.push('/new')} label='Géocoder un nouveau fichier' icon={faCircleChevronLeft} color='secondary'>
                Géocoder un nouveau fichier
              </Button>
            </div>
          </>
        ) : (
          <Button onClick={() => abortGeocoding(project.id)} color='secondary'>Annuler</Button>
        )}

        {error && <ErrorMessage>{error}</ErrorMessage>}

      </div>

      <style jsx>{`
        .container {
          display: flex;
          flex-direction: column;
          gap: 1em;
          padding: 2rem;
        }

        .action-buttons {
          display: flex;
          justify-content: center;
        }

        .new-geocodage {
          left: 0;
        }
        `}</style>
    </Layout>
  )
}

export default Project

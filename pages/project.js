import {useState, useEffect, useContext, useCallback} from 'react'
import PropTypes from 'prop-types'
import {useRouter} from 'next/router'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faDownload, faCircleChevronLeft, faCheckCircle} from '@fortawesome/free-solid-svg-icons'

import {API_URL, getProject, getProjectProcessing} from '@/lib/api'

import theme from '@/styles/theme'

import Layout from '@/layouts/main'

import ScreenFrameContext from '@/contexts/screen-frame'

import ErrorMessage from '@/components/error-message'
import Button from '@/components/button'
import Loading from '@/components/loading'
import ProjectProcessing from '@/components/project-processing'
import ButtonLink from '@/components/button-link'
import ProjectInfos from '@/components/project-infos'
import UnderlineTitle from '@/components/underline-title'
import Spinner from '@/components/spinner'
import ProcessingStep from '@/components/processing-step'

const Project = ({projectId}) => {
  const {isFrame, screenSize} = useContext(ScreenFrameContext)
  const router = useRouter()

  const [project, setProject] = useState()
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
    async function fetchProject() {
      try {
        const p = await getProject(projectId)
        setProject(p)
        setProcessing(p.processing)
      } catch {
        router.replace('/404')
      }
    }

    fetchProject(projectId)
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

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

        <UnderlineTitle>Traitements du fichier</UnderlineTitle>
        <div className='steps-container'>
          {/* Validation et upload déjà effectués */}
          <ProcessingStep
            label='Validation du fichier'
            step='completed'
          />

          <ProcessingStep
            label='Envoi du fichier'
            step='completed'
          />

          {/* En attente */}
          {project.status === 'waiting' && !processing?.step && (
            <div className='step'><Spinner size='small' />Vous êtes actuellement en file d’attente. Votre géocodage démarrera d’ici quelques instant</div>
          )}

          {processing && (
            <>
              <ProcessingStep
                label={processing.step === 'failed' ? 'Le traitement a échoué' : 'Traitement du fichier'}
                step={processing.step}
              />

              <ProjectProcessing processing={processing} />
            </>
          )}
        </div>

        {processing.step === 'completed' && (
          <>
            <div className='action-buttons'>
              {project.outputFile ? (
                <div className='success-action'>
                  <FontAwesomeIcon icon={faCheckCircle} color={theme.success} size='2x' />
                  <div>Géocodage terminé avec succès !</div>

                  <ButtonLink href={`${API_URL}/projects/${project.id}/output-file/${project.outputFile.token}`} download={project.outputFile.filename} isExternal label='Télécharger le fichier' icon={faDownload} size='large'>
                    Télécharger le fichier
                  </ButtonLink>
                </div>
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

        .step {
          display: flex;
          gap: 5px;
          font-weight: bold;
        }

        .error {
          color: ${theme.error};
        }

        .steps-container {
          display: flex;
          flex-direction: column;
          gap: 1em;
        }

        .success-action {
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          text-align: center;
          gap: 1em;
          font-weight: bold;
          color: ${theme.success};
        }
      `}</style>
    </Layout>
  )
}

Project.propTypes = {
  projectId: PropTypes.string.isRequired
}

Project.getInitialProps = async ({res, query}) => {
  const {projectId} = query

  if (!projectId) {
    res.redirect('/404')
  }

  return {projectId}
}

export default Project

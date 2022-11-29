
import {EventEmitter} from 'events'
import request from 'superagent'
import {validateCsvFromBlob} from '@livingdata/tabular-data-helpers'

export const API_URL = process.env.NEXT_PUBLIC_API_URL
const LOCAL_STORAGE_KEY = 'projects'

export function geocodeFile(file, options) {
  const emitter = new EventEmitter()

  let validationProcess
  let geocodeRequest
  let step

  function cleanup() {
    if (validationProcess) {
      validationProcess.abort()
    }

    if (geocodeRequest) {
      geocodeRequest.abort()
    }

    emitter.removeAllListeners()
  }

  function handleStep(newStep) {
    if (step !== newStep) {
      if (step) {
        emitter.emit(`${step}:complete`)
      }

      step = newStep

      if (newStep !== 'finish') {
        emitter.emit(`${step}:start`)
      }
    }
  }

  function handleError(error) {
    emitter.emit('error', error)
    cleanup()
  }

  function validateFile() {
    handleStep('validate')
    validationProcess = validateCsvFromBlob(file, options)
    validationProcess.on('progress', p => {
      emitter.emit('validate:progress', p)
    })
    validationProcess.on('error', error => {
      emitter.emit('validate:error', error)
      handleError(error)
    })
    validationProcess.on('complete', e => {
      sendToGeocoder()
    })
  }

  function sendToGeocoder() {
    handleStep('processing')

    emitter.emit('uploading')
    createProject(file, options).then(res => {
      emitter.emit('complete', {id: res.id})
      cleanup()
    }).catch(error => handleError(error))
  }

  setTimeout(() => validateFile(), 0)

  emitter.abort = cleanup
  return emitter
}

const getProjectsFromLocalStorage = () => {
  const projects = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY))
  return projects || []
}

const storeProjectToLocalStorage = (projectId, token) => {
  const projects = getProjectsFromLocalStorage()
  const data = {
    ...projects,
    [projectId]: token
  }
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(data))
}

const deleteProjectFromLocalStorage = projectId => {
  const projects = getProjectsFromLocalStorage()
  delete projects[projectId]

  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(projects))
}

export async function getProjectInProgress() {
  const projects = await getProjects()

  const allStatus = new Set(projects.map(({status}) => status))
  return allStatus.has('waiting') || allStatus.has('processing')
}

export async function getProject(projectId) {
  const projects = getProjectsFromLocalStorage()
  const token = projects[projectId]

  const response = await request.get(`${API_URL}/projects/${projectId}`)
    .set('Authorization', `Token ${token}`)
    .set('accept', 'json')

  return response.body
}

export async function deleteProject(projectId) {
  const projects = getProjectsFromLocalStorage()
  const token = projects[projectId]

  deleteProjectFromLocalStorage(projectId)

  const response = await request.delete(`${API_URL}/projects/${projectId}`)
    .set('Authorization', `Token ${token}`)
    .set('accept', 'json')

  return response.body
}

export async function setProjectFile(project, blob) {
  const response = await request.put(`${API_URL}/projects/${project.id}/input-file`)
    .set('Authorization', `Token ${project.token}`)
    .set('Content-Disposition', `attachment; filename="${blob.name}"`)
    .set('Content-Type', 'application/octet-stream')
    .set('Content-Length', blob.size)
    .set('accept', 'json')
    .send(blob)

  return response.body
}

export async function setProjectPipeline(project, pipeline) {
  const response = await request.put(`${API_URL}/projects/${project.id}/pipeline`)
    .set('Authorization', `Token ${project.token}`)
    .set('accept', 'json')
    .send(pipeline)

  return response.body
}

export async function startProject(project) {
  const response = await request.post(`${API_URL}/projects/${project.id}/start`)
    .set('Authorization', `Token ${project.token}`)
    .set('accept', 'json')

  return response.body
}

export async function getProjects() {
  const localProjects = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY))

  if (localProjects) {
    const promises = Object.keys(localProjects).map(projetId =>
      getProject(projetId)
    )

    try {
      return Promise.all(promises)
    } catch (error) {
      throw new Error(`Impossible de récupérer vos géocodages : ${error}`)
    }
  }

  return []
}

export async function createProject(fileInput, pipeline) {
  const projectInProgress = await getProjectInProgress()

  if (projectInProgress) {
    throw new Error('Un géocodage est déjà en cours')
  }

  const response = await request.post(`${API_URL}/projects`).set('accept', 'json')
  const project = response.body

  storeProjectToLocalStorage(project.id, project.token)

  await setProjectPipeline(project, pipeline)
  await setProjectFile(project, fileInput)
  return startProject(project)
}

export async function getProjectProcessing(projectId) {
  const projects = getProjectsFromLocalStorage()
  const token = projects[projectId]

  const response = await request.get(`${API_URL}/projects/${projectId}/processing`)
    .set('Authorization', `Token ${token}`)
    .set('accept', 'json')

  return response.body
}

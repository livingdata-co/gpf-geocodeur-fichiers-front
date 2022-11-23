
import {EventEmitter} from 'events'
import request from 'superagent'
import {validateCsvFromBlob} from '@livingdata/tabular-data-helpers'

const API_URL = process.env.NEXT_PUBLIC_API_URL
const LOCAL_STORAGE_KEY = 'projects'

export function geocodeFile(file, options) {
  const emitter = new EventEmitter()

  let validationProcess
  let geocodeRequest
  let step

  createProject(file, options)

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

    const formData = new FormData()
    formData.append('file', file)
    formData.append('options', new Blob([JSON.stringify(options)], {type: 'application/json'}))

    geocodeRequest = request.post(API_URL + '/geocode')
      .send(formData)
      .responseType('blob')

    geocodeRequest.on('progress', p => {
      handleStep(p.direction)
      emitter.emit(`${p.direction}:progress`, p)
    })

    geocodeRequest.then(res => {
      handleStep('finish')
      emitter.emit('complete', {file: res.body})
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

const storeProjecttoLocalStorage = (projectId, token) => {
  const projects = getProjectsFromLocalStorage()
  const data = {
    ...projects,
    [projectId]: token
  }
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(data))
}

export async function getProjectInProgress() {
  const projects = getProjects()
  return projects.find(({status}) => ['waiting', 'processing'].includes(status))
}

export async function getProject(projectId, token) {
  const project = await request.get(`${API_URL}/projects/${projectId}`)
    .set('Authorization', `Token ${token}`)
    .set('accept', 'json')

  return project.body
}

export async function setProjectFile(project, blob) {
  const response = await request.put(`${API_URL}/projects/${project.id}/input-file`)
    .set('Authorization', `Token ${project.token}`)
    .set('Content-Disposition', `attachment; filename="${blob.name}"`)
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
      getProject(projetId, localProjects[projetId])
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
  const projectInProgress = getProjectInProgress()

  if (projectInProgress) {
    throw new Error('Un géocodage est déjà en cours')
  }

  const response = await request.post(`${API_URL}/projects`).set('accept', 'json')
  const project = response.body

  storeProjecttoLocalStorage(project.id, project.token)

  await setProjectPipeline(project, pipeline)
  await setProjectFile(project, fileInput)
  await startProject(project)
}

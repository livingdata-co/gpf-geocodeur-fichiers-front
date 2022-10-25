
import {EventEmitter} from 'events'
import request from 'superagent'
import {validateCsvFromBlob} from '@livingdata/tabular-data-helpers'

const API_URL = process.env.NEXT_PUBLIC_API_URL

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
      step = newStep
      emitter.emit('step', {step})
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
      emitter.emit('validate:complete', e)
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
      emitter.emit('complete', {file: res.body})
      cleanup()
    }).catch(error => handleError(error))
  }

  setTimeout(() => validateFile(), 0)

  emitter.abort = cleanup
  return emitter
}

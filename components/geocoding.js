import {useState, useCallback} from 'react'
import PropTypes from 'prop-types'
import Router from 'next/router'
import {faPlay} from '@fortawesome/free-solid-svg-icons'

import Pipeline from '../pipeline'
import {geocodeFile} from '@/lib/api.js'

import ErrorMessage from '@/components/error-message'
import Loading from '@/components/loading'
import FormStepsNav from '@/components/form-steps-nav'
import Button from '@/components/button'
import InfoMessage from '@/components/info-message'

const Geocoding = ({file, format, formatOptions, addressCompositors, advancedParams, outputFormat, outputParams, outputSelectedColumns, handleStep}) => {
  const [error, setError] = useState()
  const [isUploading, setIsUploading] = useState(false)
  const [validationProgress, setValidationProgress] = useState()

  const startGeocode = useCallback(() => {
    const {codeINSEE, lat, long} = advancedParams
    const options = {
      format,
      formatOptions,
      geocodeOptions: {
        q: addressCompositors,
        citycode: codeINSEE,
        lat,
        lon: long
      },
      outputFormat,
      outputFormatOptions: outputParams,
      ouputOptions: {
        columnsToInclude: outputSelectedColumns
      }
    }

    const validateProcess = geocodeFile(file, options)

    validateProcess.on('error', error => setError(error.message))
    validateProcess.on('uploading', () => setIsUploading(true))
    validateProcess.on('complete', async ({id}) => {
      setIsUploading(false)
      Router.push(
        `/project?projectId=${id}`,
        `/project/${id}`
      )
    })

    validateProcess.on('validate:progress', p => setValidationProgress(p))
  }, [file, addressCompositors, advancedParams, format, formatOptions, outputFormat, outputSelectedColumns, outputParams])

  return (
    <div className='geocoding-container'>
      <Pipeline format={format} formatOptions={outputParams} geocodeOptions={{q: addressCompositors}} />

      <div className='progress-steps'>
        {/* Validation */}
        {validationProgress && (
          validationProgress.readBytes === validationProgress.totalBytes ? (
            <div>Checkgrey - Validation du fichier {Math.round(validationProgress.readBytes / validationProgress.totalBytes * 100)}%</div>
          ) : (
            <div>Checkgreen - Validation du fichier. <InfoMessage info={`${validationProgress.readRows} lignes traitées`} /></div>
          )
        )}

        {/* Upload */}
        {isUploading && (
          <div className='uploading'>
            <Loading label='Téléversement du fichier en cours…' />
          </div>
        )}
      </div>

      {!validationProgress && (
        <FormStepsNav previous={() => handleStep(4)}>
          <Button onClick={startGeocode} icon={faPlay}>Lancer le géocodage</Button>
        </FormStepsNav>
      )}

      {error && <ErrorMessage>Le géocodage du fichier a échoué : {error}</ErrorMessage>}

      <style jsx>{`
        .geocoding-container {
          display: flex;
          flex-direction: column;
        }

        .uploading {
          margin-top: 2em;
        }
      `}</style>
    </div>
  )
}

Geocoding.propTypes = {
  file: PropTypes.object.isRequired,
  format: PropTypes.string.isRequired,
  formatOptions: PropTypes.object.isRequired,
  addressCompositors: PropTypes.array.isRequired,
  advancedParams: PropTypes.object.isRequired,
  outputFormat: PropTypes.string.isRequired,
  outputParams: PropTypes.object.isRequired,
  outputSelectedColumns: PropTypes.array.isRequired,
  handleStep: PropTypes.func.isRequired
}

export default Geocoding

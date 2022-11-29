import {useState, useCallback} from 'react'
import PropTypes from 'prop-types'
import Router from 'next/router'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faPlay, faSquareCheck} from '@fortawesome/free-solid-svg-icons'

import {geocodeFile} from '@/lib/api.js'

import theme from '@/styles/theme'

import ErrorMessage from '@/components/error-message'
import FormStepsNav from '@/components/form-steps-nav'
import Button from '@/components/button'
import InfoMessage from '@/components/info-message'
import Pipeline from '@/components/pipeline'
import Spinner from '@/components/spinner'
import UnderlineTitle from '@/components/underline-title'

const Geocoding = ({file, format, formatOptions, addressCompositors, advancedParams, outputFormat, outputParams, outputSelectedColumns, handleStep}) => {
  const [error, setError] = useState()
  const [isUploading, setIsUploading] = useState(false)
  const [validationProgress, setValidationProgress] = useState()

  const isValidationComplete = validationProgress ? validationProgress.readBytes === validationProgress.totalBytes : false

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
          <>
            <UnderlineTitle>Traitement du fichier</UnderlineTitle>
            <div className={`${isValidationComplete ? 'complete' : 'uncomplete'} validation'`}>
              <FontAwesomeIcon icon={faSquareCheck} color={isValidationComplete ? theme.success : theme.bkgDisable} /> - Validation du fichier
              {isValidationComplete ? (
                <InfoMessage info={`${validationProgress.readRows} lignes traitées`} />
              ) : (
                <div>- en cours... {Math.round(validationProgress.readBytes / validationProgress.totalBytes * 100)}</div>
              )}
            </div>
          </>
        )}

        {/* Upload */}
        {isUploading && <div className='uploading'><Spinner size='small' />Téléversement du fichier en cours…</div>}
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

        .uploading, .validation {
          display: flex;
          gap: 5px;
          font-weight: bold;
        }

        .validation {
          margin-bottom: 1em;
        }

        .percent {
          color: ${theme.txtColor};
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

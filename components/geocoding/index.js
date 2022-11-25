import {useState, useCallback} from 'react'
import PropTypes from 'prop-types'
import Router from 'next/router'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faSquareCheck, faCircleChevronLeft} from '@fortawesome/free-solid-svg-icons'

import theme from '@/styles/theme'

import {geocodeFile} from '@/lib/api.js'

import ProgressBar from '@/components/progress-bar'
import Button from '@/components/button'
import ErrorMessage from '@/components/error-message'
import Loading from '@/components/loading'

const Geocoding = ({file, format, formatOptions, addressCompositors, advancedParams, outputFormat, outputParams, outputSelectedColumns, handleStep}) => {
  const [geocodeProcess, setGeocodeProcess] = useState()
  const [error, setError] = useState()
  const [isUploading, setIsUploading] = useState(false)
  const [validationProgress, setValidationProgress] = useState()
  const [validationCompleted, setValidationCompleted] = useState(false)

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
    validateProcess.on('complete', ({id}) => {
      Router.push(`/project?projectId=${id}`)
    })

    validateProcess.on('validate:progress', p => setValidationProgress(p))
    validateProcess.on('validate:complete', () => setValidationCompleted(true))

    setGeocodeProcess(geocodeProcess)
  }, [file, addressCompositors, advancedParams, format, formatOptions, outputFormat, outputSelectedColumns, outputParams, geocodeProcess])

  return (
    <div className='geocoding-container'>
      {!validationProgress && <div className='action-buttons'>
        <div className='restart-button'>
          <Button onClick={() => handleStep(4)} label='Aller à l’étape précédente' icon={faCircleChevronLeft} color='secondary'>
            Étape précédente
          </Button>
        </div>
        <Button onClick={startGeocode}>Lancer le géocodage</Button>
      </div>}

      {validationProgress && <ProgressBar
        label={`${validationCompleted ? 'Vérification du fichier terminée' : 'Vérification en cours…'}`}
        min={validationProgress.readBytes}
        max={validationProgress.totalBytes}
      />}

      {validationCompleted && (
        <div className='valide'>
          <div className='valide-message'><FontAwesomeIcon icon={faSquareCheck} color={`${theme.success}`} /> fichier CSV valide</div>
          <div className='rows'>{validationProgress.readRows} lignes traitées</div>
        </div>
      )}

      {isUploading && (
        <div className='uploading'>
          <Loading label='Téléversement du fichier en cours…' />
        </div>
      )}

      {error && <ErrorMessage>Le géocodage du fichier a échoué : {error}</ErrorMessage>}

      <style jsx>{`
        .geocoding-container {
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .action-download {
          width: 100%;
        }

        .valide {
          margin-top: 1.5em;
          display: flex;
          flex-direction: column;
          text-align: center;
          gap: 10px;
        }

        .valide-message {
          font-weight: bold;
          color: ${theme.success};
        }

        .rows {
          font-style: italic;
        }

        a {
          text-decoration: none;
          display: flex;
        }

        .action-buttons {
          width: 100%;
          position: relative;
          display: flex;
          justify-content: center;
        }

        .restart-button {
          position: absolute;
          left: 0;
        }

        .uploading {
          margin-top: 2em;
        }

        @media only screen and (max-width: 770px) {
          .action-buttons {
            position: initial;
            flex-direction: column;
            gap: 1em;
          }

          .restart-button {
            position: initial;
          }
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

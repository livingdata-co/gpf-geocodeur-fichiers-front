import {useState, useCallback} from 'react'
import PropTypes from 'prop-types'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faDownload, faSquareCheck, faCircleChevronLeft} from '@fortawesome/free-solid-svg-icons'

import {geocodeFile} from '@/lib/api.js'

import ProgressBar from '@/components/progress-bar'
import ErrorMessage from '@/components/error-message'
import Button from '@/components/button'

import theme from '@/styles/theme'

const Geocoding = ({file, format, formatOptions, addressCompositors, advancedParams, outputFormat, outputParams, outputSelectedColumns, handleStep}) => {
  const [geocodeProcess, setGeocodeProcess] = useState()
  const [error, setError] = useState()
  const [resultFileUrl, setResultFileUrl] = useState()
  const [validationProgress, setValidationProgress] = useState()
  const [validationCompleted, setValidationCompleted] = useState(false)
  const [uploadProgress, setUploadProgress] = useState()
  const [uploadCompleted, setUploadCompleted] = useState(false)
  const [downloadStarted, setDownloadStarted] = useState(false)
  const [downloadProgress, setDownloadProgress] = useState()
  const [downloadCompleted, setDownloadCompleted] = useState(false)

  const startGeocode = useCallback(() => {
    const {codeINSEE, lat, long} = advancedParams

    const options = {
      format,
      formatOptions,
      geocodeOptions: {
        q: addressCompositors,
        citycode: codeINSEE,
        longitude: lat,
        latitude: long
      },
      outputFormat,
      outputFormatOptions: outputParams,
      ouputOptions: {
        columnsToInclude: outputSelectedColumns
      }
    }

    const geocodeProcess = geocodeFile(file, options)

    geocodeProcess.on('error', error => setError(error.message))
    geocodeProcess.on('complete', ({file}) => setResultFileUrl(URL.createObjectURL(file)))

    geocodeProcess.on('validate:progress', p => setValidationProgress(p))
    geocodeProcess.on('validate:complete', () => setValidationCompleted(true))

    geocodeProcess.on('upload:progress', p => setUploadProgress(p))
    geocodeProcess.on('upload:complete', () => setUploadCompleted(true))

    geocodeProcess.on('download:start', () => setDownloadStarted(true))
    geocodeProcess.on('download:progress', p => setDownloadProgress(p))
    geocodeProcess.on('download:complete', () => setDownloadCompleted(true))

    setGeocodeProcess(geocodeProcess)
  }, [file, addressCompositors, advancedParams, format, formatOptions, outputFormat, outputSelectedColumns, outputParams])

  return (
    <div className='geocoding-container'>
      {!geocodeProcess && <div className='action-buttons'>
        <Button onClick={() => handleStep(4)} label='Aller à l’étape précédente' icon={faCircleChevronLeft} color='secondary'>
          Étape précédente
        </Button>
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

      {uploadProgress && <ProgressBar
        label={`${uploadCompleted ? 'Envoi du fichier terminé' : 'Envoi en cours…'}`}
        min={uploadProgress.loaded}
        max={uploadProgress.total}
      />}

      {downloadStarted && !downloadCompleted && <div>Géocodage en cours…</div>}
      {downloadProgress && !downloadCompleted && <div>{downloadProgress.loaded} déjà téléchargés</div>}
      {downloadCompleted && <div>Géocodage terminé !</div>}

      {resultFileUrl && <Button label='Télécharger le fichier' icon={faDownload}>Télécharger le fichier</Button>}

      {error && <ErrorMessage>Le géocodage du fichier a échoué : {error}</ErrorMessage>}

      <style jsx>{`
        .geocoding-container {
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .action-buttons {
          width: 100%;
          margin-top: 1.5em;
          display: grid;
          grid-template-columns: auto 1fr;
          justify-items: center;
          gap: 1;
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

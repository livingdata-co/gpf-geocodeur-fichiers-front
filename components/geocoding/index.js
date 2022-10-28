import {useState, useCallback} from 'react'
import PropTypes from 'prop-types'
import prettyBytes from 'pretty-bytes'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faDownload, faSquareCheck, faCircleChevronLeft} from '@fortawesome/free-solid-svg-icons'

import {geocodeFile} from '@/lib/api.js'

import ProgressBar from '@/components/progress-bar'
import ErrorMessage from '@/components/error-message'
import Button from '@/components/button'
import ButtonLink from '@/components/button-link'
import Loader from '@/components/loader'

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
        lat,
        lon: long
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

      {uploadProgress && <ProgressBar
        label={`${uploadCompleted ? 'Envoi du fichier terminé' : 'Envoi en cours…'}`}
        min={uploadProgress.loaded}
        max={uploadProgress.total}
      />}

      <div className='geocodage-progress'>
        {downloadStarted && !downloadCompleted && <div><Loader label='Géocodage en cours' /></div>}
        {downloadProgress && !downloadCompleted && <div>{prettyBytes(downloadProgress.loaded, {locale: 'fr'}).replace('B', 'o')} déjà téléchargés</div>}
        {downloadCompleted && <div>Géocodage terminé !</div>}

        {resultFileUrl && (
          <div className='action-buttons'>
            <div className='restart-button'>
              <Button onClick={() => handleStep(1)} label='Géocoder un nouveau fichier' icon={faCircleChevronLeft} color='secondary'>
                Géocoder un nouveau fichier
              </Button>
            </div>
            <ButtonLink href={resultFileUrl} download={computeGeocodedFileName(file, outputFormat)} isExternal label='Télécharger le fichier' icon={faDownload}>
              Télécharger le fichier
            </ButtonLink>
          </div>
        )}

        {error && <ErrorMessage>Le géocodage du fichier a échoué : {error}</ErrorMessage>}
      </div>

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

        .geocodage-progress {
          width: 100%;
          margin-top: 1.5em;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          gap: 1em;
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

function computeGeocodedFileName(file, outputFormat) {
  return `geocode-result.${outputFormat}`
}

export default Geocoding

import {useState, useCallback} from 'react'
import PropTypes from 'prop-types'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faSquareCheck, faCircleChevronLeft} from '@fortawesome/free-solid-svg-icons'

import {validateCsvFromBlob, geocode} from '@livingdata/tabular-data-helpers'

import ValidationProgress from '@/components/validation-progress'
import ErrorMessage from '@/components/error-message'
import Button from '@/components/button'

import theme from '@/styles/theme'

const Geocoding = ({file, format, formatOptions, addressCompositors, advancedParams, outputFormat, outputParams, outputSelectedColumns, handleStep}) => {
  const [validationProcess, setValidationProcess] = useState()
  const [error, setError] = useState()
  const [isValidationComplete, setIsValidationComplete] = useState(false)

  const handleValidationComplete = useCallback(() => {
    setIsValidationComplete(true)
    geocoding()
  }, [geocoding])

  const geocoding = useCallback(() => {
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

    const geocodingProgress = geocode(file, options)
    console.log(geocodingProgress)
  }, [file, addressCompositors, advancedParams, format, formatOptions, outputFormat, outputSelectedColumns, outputParams])

  const validate = useCallback(() => {
    const validationProgress = validateCsvFromBlob(file, {outputFormat, outputParams, outputSelectedColumns})

    validationProgress.addListener('progress', setValidationProcess)
    validationProgress.addListener('complete', handleValidationComplete)
    validationProgress.addListener('error', setError)
  }, [file, outputFormat, outputParams, outputSelectedColumns, handleValidationComplete])

  return (
    <div className='geocoding-container'>
      <div className='action-buttons'>
        <Button onClick={() => handleStep(4)} label='Aller à l’étape précédente' icon={faCircleChevronLeft} color='secondary'>
          Étape précédente
        </Button>
        <Button onClick={validate} disabled={Boolean(validationProcess)}>Lancer le géocodage</Button>
      </div>

      {validationProcess && <ValidationProgress {...validationProcess} isValidationComplete={isValidationComplete} />}
      {isValidationComplete && (
        <div className='valide'>
          <div className='valide-message'><FontAwesomeIcon icon={faSquareCheck} color={`${theme.success}`} /> fichier CSV valide</div>
          <div className='rows'>{validationProcess.readRows} lignes traitées</div>
        </div>
      )}

      {/* geocoding processing => <Spinner label='Traitement en cours'/> */}
      {/* geocoding complete => <Button label='Télécharger le fichier' icon={faDownload}>Télécharger le fichier</Button> */}
      {error && <ErrorMessage>Le géocodage du fichier a échoué</ErrorMessage>}

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

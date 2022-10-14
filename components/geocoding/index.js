import {useState, useCallback} from 'react'
import PropTypes from 'prop-types'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faSquareCheck, faCircleChevronLeft} from '@fortawesome/free-solid-svg-icons'

import {validateCsvFromBlob} from '@livingdata/tabular-data-helpers'

import ValidationProgress from '@/components/validation-progress'
import ErrorMessage from '@/components/error-message'
import Button from '@/components/button'
import theme from '@/styles/theme'

const Geocoding = ({file, outputFormat, outputParams, outputSelectedColumns, handleStep}) => {
  const [validation, setValidation] = useState()
  const [error, setError] = useState()
  const [isValidationComplete, setIsValidationComplete] = useState(false)

  const handleValidationComplete = useCallback(() => {
    // Lancer le géocodage
    setIsValidationComplete(true)
  }, [])

  const validate = useCallback(() => {
    const validation = validateCsvFromBlob(file, {outputFormat, outputParams, outputSelectedColumns})

    validation.addListener('progress', setValidation)
    validation.addListener('complete', handleValidationComplete)
    validation.addListener('error', setError)
  }, [file, outputFormat, outputParams, outputSelectedColumns, handleValidationComplete])

  return (
    <div className='geocoding-container'>
      <div className='action-buttons'>
        <Button onClick={() => handleStep(4)} label='Aller à l’étape précédente' icon={faCircleChevronLeft} color='secondary'>
          Étape précédente
        </Button>
        <Button onClick={validate} disabled={Boolean(validation)}>Lancer le géocodage</Button>
      </div>

      {validation && <ValidationProgress {...validation} isValidationComplete={isValidationComplete} />}
      {isValidationComplete && (
        <div className='valide'>
          <div className='valide-message'><FontAwesomeIcon icon={faSquareCheck} color={`${theme.success}`} /> fichier CSV valide</div>
          <div className='rows'>{validation.readRows} lignes traitées</div>
        </div>
      )}

      {error && (
        <ErrorMessage>Le géocodage du fichier a échoué</ErrorMessage>
      )}

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
  outputFormat: PropTypes.string.isRequired,
  outputParams: PropTypes.object.isRequired,
  outputSelectedColumns: PropTypes.array.isRequired,
  handleStep: PropTypes.func.isRequired
}

export default Geocoding

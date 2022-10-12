import {useState, useCallback} from 'react'
import PropTypes from 'prop-types'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faSquareCheck} from '@fortawesome/free-solid-svg-icons'

import {validateCsvFromBlob} from '@livingdata/tabular-data-helpers'

import ValidationProgress from '@/components/validation-progress'
import ErrorMessage from '@/components/error-message'
import Button from '@/components/button'
import theme from '@/styles/theme'

const Geocoding = ({file, formatOptions, advancedParams}) => {
  const [validation, setValidation] = useState()
  const [error, setError] = useState()
  const [isValidationComplete, setIsValidationComplete] = useState(false)

  const handleValidationComplete = useCallback(() => {
    // Lancer le géocodage
    setIsValidationComplete(true)
  }, [])

  const validate = useCallback(() => {
    const validation = validateCsvFromBlob(file, {formatOptions: {...formatOptions, ...advancedParams}})

    validation.addListener('progress', setValidation)
    validation.addListener('complete', handleValidationComplete)
    validation.addListener('error', setError)
  }, [file, formatOptions, advancedParams, handleValidationComplete])

  return (
    <div className='geocoding-container'>
      <Button onClick={validate} disabled={Boolean(validation)}>Lancer le géocodage</Button>
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
  formatOptions: PropTypes.object.isRequired,
  advancedParams: PropTypes.object.isRequired
}

export default Geocoding

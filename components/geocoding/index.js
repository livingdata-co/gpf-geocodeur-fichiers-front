import {useState, useCallback} from 'react'
import PropTypes from 'prop-types'

import {validateCsvFromBlob} from '@livingdata/tabular-data-helpers'

import ValidationProgress from '@/components/validation-progress'
import ErrorMessage from '@/components/error-message'
import Button from '@/components/button'

const Geocoding = ({file, formatOptions, advancedParams}) => {
  const [validation, setValidation] = useState()
  const [error, setError] = useState()

  const handleValidationComplete = useCallback(() => {
    setValidation(null)
    // Lancer le géocodage
  }, [])

  const validate = useCallback(() => {
    const validation = validateCsvFromBlob(file, {formatOptions: {...formatOptions, ...advancedParams}})
    validation.addListener('progress', setValidation)
    validation.addListener('complete', handleValidationComplete)
    validation.addListener('error', setError)
  }, [file, formatOptions, advancedParams, handleValidationComplete])

  return (
    <div className='geocoding-container'>
      <Button onClick={validate}>Lancer le géocodage</Button>
      {validation && <ValidationProgress {...validation} />}

      {error && (
        <ErrorMessage>Le géocodage du fichier a échoué</ErrorMessage>
      )}

      <style jsx>{`
        .geocoding-container {
          display: flex;
          flex-direction: column;
          align-items: center;
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

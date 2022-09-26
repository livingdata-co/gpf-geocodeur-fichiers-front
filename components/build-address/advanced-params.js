import {useState, useCallback} from 'react'
import PropTypes from 'prop-types'

import SelectInput from '@/components/select-input'

const AdvancedParams = ({columns, handleParams}) => {
  const [advancedParams, setAdvancedParams] = useState({
    codeINSEE: null,
    lat: null,
    long: null
  })

  const handleChange = useCallback(event => {
    const {value, name} = event.target
    const sanitizedValue = value === '' ? null : value
    const newAdvancedParams = {...advancedParams, [name]: sanitizedValue}

    setAdvancedParams(newAdvancedParams)
    handleParams(newAdvancedParams)
  }, [advancedParams, handleParams])

  const isOptionUnavailable = useCallback(option => {
    const selectedCols = Object.values(advancedParams).filter(value => value !== null)
    return selectedCols.includes(option)
  }, [advancedParams])

  const getOptions = useCallback(param => [
    {label: param ? 'Aucune' : 'Choisir une colonne', value: ''},
    ...columns.map(col => ({label: `${col}`, value: `${col}`, isDisabled: isOptionUnavailable(col)}))
  ], [columns, isOptionUnavailable])

  return (
    <div className='advanced-params-container'>
      <h3>Paramètres avancés</h3>

      <div className='advanced-params'>
        <SelectInput
          label='Code INSEE'
          ariaLabel='Sélectionner une colonne correspondant au code INSEE'
          value={`${advancedParams.codeINSEE}`}
          name='codeINSEE'
          options={getOptions(advancedParams.codeINSEE)}
          handleChange={handleChange}
        />

        <SelectInput
          label='Latitude'
          ariaLabel='Entrer une latitude'
          value={`${advancedParams.lat}`}
          name='lat'
          options={getOptions(advancedParams.lat)}
          handleChange={handleChange}
        />

        <SelectInput
          label='Longitude'
          ariaLabel='Entrer une longitude'
          value={`${advancedParams.long}`}
          name='long'
          options={getOptions(advancedParams.long)}
          handleChange={handleChange}
        />
      </div>

      <style jsx>{`
        .advanced-params {
          display: flex;
          flex-wrap: wrap;
          gap: 1em;
        }
      `}</style>
    </div>
  )
}

AdvancedParams.propTypes = {
  columns: PropTypes.array.isRequired,
  handleParams: PropTypes.func.isRequired
}

export default AdvancedParams

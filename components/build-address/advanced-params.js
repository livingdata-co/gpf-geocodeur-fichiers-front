import {useState, useMemo, useCallback} from 'react'
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
    const selectedCols = new Set(Object.values(advancedParams).filter(value => value !== null))
    return selectedCols.has(option)
  }, [advancedParams])

  const optionsINSEE = useMemo(() => [
    {label: advancedParams.codeINSEE ? 'Aucune' : 'Choisir une colonne', value: ''},
    ...columns.map(col => ({label: `${col}`, value: `${col}`, isDisabled: isOptionUnavailable(col)}))
  ], [columns, advancedParams, isOptionUnavailable])

  const optionsLat = useMemo(() => [
    {label: advancedParams.lat ? 'Aucune' : 'Choisir une colonne', value: ''},
    ...columns.map(col => ({label: `${col}`, value: `${col}`, isDisabled: isOptionUnavailable(col)}))
  ], [columns, advancedParams, isOptionUnavailable])

  const optionsLong = useMemo(() => [
    {label: advancedParams.long ? 'Aucune' : 'Choisir une colonne', value: ''},
    ...columns.map(col => ({label: `${col}`, value: `${col}`, isDisabled: isOptionUnavailable(col)}))
  ], [columns, advancedParams, isOptionUnavailable])

  return (
    <div className='advanced-params-container'>
      <h3>Paramètres avancés</h3>

      <div className='advanced-params'>
        <SelectInput
          label='Code INSEE'
          ariaLabel='Sélectionner une colonne correspondant au code INSEE'
          value={`${advancedParams.codeINSEE}`}
          name='codeINSEE'
          options={optionsINSEE}
          handleChange={handleChange}
        />

        <SelectInput
          label='Latitude'
          ariaLabel='Entrer une latitude'
          value={`${advancedParams.lat}`}
          name='lat'
          options={optionsLat}
          handleChange={handleChange}
        />

        <SelectInput
          label='Longitude'
          ariaLabel='Entrer une longitude'
          value={`${advancedParams.long}`}
          name='long'
          options={optionsLong}
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

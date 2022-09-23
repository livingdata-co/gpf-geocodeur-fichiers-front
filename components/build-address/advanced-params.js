import {useState, useMemo, useEffect} from 'react'
import PropTypes from 'prop-types'

import SelectInput from '@/components/select-input'

const AdvancedParams = ({columns, handleParams}) => {
  const [advancedParams, setAdvancedParams] = useState({
    codeINSEE: null,
    lat: null,
    long: null
  })
  const [selectedCols, setSelectedCols] = useState([])

  const handleChange = event => {
    const {value, name} = event.target

    const sanitizedValue = value === '' ? null : value
    const newAdvancedParams = {...advancedParams, [name]: sanitizedValue}
    setAdvancedParams(newAdvancedParams)
    handleParams(newAdvancedParams)
  }

  useEffect(() => {
    // Détermine les colonnes déjà séléctionnées et à disabled dans la liste d'options
    const sanitizedParams = Object.keys(advancedParams).map(param => advancedParams[param]).filter(value => value !== null)
    setSelectedCols(sanitizedParams)
  }, [advancedParams, columns])

  const options = useMemo(() => [
    ...columns.map(col => ({label: `${col}`, value: `${col}`, isDisabled: selectedCols.includes(col)}))
  ], [columns, selectedCols])

  return (
    <div className='advanced-params-container'>
      <h3>Paramètres avancés</h3>

      <div className='advanced-params'>
        <SelectInput
          label='Code INSEE'
          ariaLabel='Sélectionner une colonne correspondant au code INSEE'
          value={`${advancedParams.codeINSEE}`}
          name='codeINSEE'
          options={options}
          handleChange={handleChange}
        />

        <SelectInput
          label='Latitude'
          ariaLabel='Entrer une latitude'
          value={`${advancedParams.lat}`}
          name='lat'
          options={options}
          handleChange={handleChange}
        />

        <SelectInput
          label='Longitude'
          ariaLabel='Entrer une longitude'
          value={`${advancedParams.long}`}
          name='long'
          options={options}
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

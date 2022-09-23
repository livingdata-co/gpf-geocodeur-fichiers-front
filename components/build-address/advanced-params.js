import {useState, useMemo} from 'react'
import PropTypes from 'prop-types'

import SelectInput from '@/components/select-input'

const AdvancedParams = ({columns, handleParams}) => {
  const [advancedParams, setAdvancedParams] = useState({
    codeINSEE: null,
    lat: null,
    long: null
  })

  const handleChange = event => {
    const {value, name} = event.target

    const sanitizedValue = value === '' ? null : value
    const newAdvancedParams = {...advancedParams, [name]: sanitizedValue}
    setAdvancedParams(newAdvancedParams)
    handleParams(newAdvancedParams)
  }

  const options = useMemo(() => {
    const selectedCols = new Set(Object.values(advancedParams).filter(value => value !== null))
    return [
      ...columns.map(col => ({label: `${col}`, value: `${col}`, isDisabled: selectedCols.has(col)}))
    ]
  }, [columns, advancedParams])

  return (
    <div className='advanced-params-container'>
      <h3>Paramètres avancés</h3>

      <div className='advanced-params'>
        <SelectInput
          label='Code INSEE'
          ariaLabel='Sélectionner une colonne correspondant au code INSEE'
          value={`${advancedParams.codeINSEE}`}
          name='codeINSEE'
          hasEmptyValue
          options={options}
          handleChange={handleChange}
        />

        <SelectInput
          label='Latitude'
          ariaLabel='Entrer une latitude'
          value={`${advancedParams.lat}`}
          name='lat'
          hasEmptyValue
          options={options}
          handleChange={handleChange}
        />

        <SelectInput
          label='Longitude'
          ariaLabel='Entrer une longitude'
          value={`${advancedParams.long}`}
          name='long'
          hasEmptyValue
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

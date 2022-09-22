import {useMemo, useState} from 'react'
import PropTypes from 'prop-types'

import TextInput from '@/components/text-input'
import SelectInput from '@/components/select-input'

const AdvancedParams = ({columns, handleParams}) => {
  const [advancedParams, setAdvancedParams] = useState({
    codeINSEE: null,
    lat: null,
    long: null
  })

  const options = useMemo(() => [
    {label: advancedParams.codeINSEE ? 'Aucune' : 'Choisir une colonne', value: ''},
    ...columns.map(code => ({label: `${code}`, value: `${code}`}))
  ], [columns, advancedParams])

  const handleChange = event => {
    const {value, name} = event.target

    const sanitizedValue = value === '' ? null : value
    setAdvancedParams({...advancedParams, [name]: sanitizedValue})
    handleParams(advancedParams)
  }

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

        <TextInput
          value={advancedParams.lat}
          name='lat'
          handleChange={handleChange}
          ariaLabel='Entrer une latitude'
          label='Latitude'
        />

        <TextInput
          value={advancedParams.long}
          name='long'
          handleChange={handleChange}
          ariaLabel='Entrer une longitude'
          label='Longitude'
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

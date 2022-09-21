import {useMemo, useState} from 'react'
import PropTypes from 'prop-types'

import SelectInput from '@/components/select-input'

const AdvancedParams = ({columns, handleParams}) => {
  const [codeINSEE, setCodeINSEE] = useState(null)

  const options = useMemo(() => [
    {label: codeINSEE ? 'Aucune' : 'Choisir une colonne', value: ''},
    ...columns.map(code => ({label: `${code}`, value: `${code}`}))
  ], [columns, codeINSEE])

  const handleChange = value => {
    const codeINSEE = value === '' ? null : value
    setCodeINSEE(codeINSEE)
    handleParams({codeINSEE})
  }

  return (
    <div className='advanced-params-container'>
      <h3>Paramètres avancés</h3>

      <div className='advanced-params'>
        <SelectInput
          label='Code INSEE'
          value={`${codeINSEE}`}
          options={options}
          handleChange={handleChange}
        />
      </div>

      <style jsx>{`
        .advanced-params {
          display: flex;
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

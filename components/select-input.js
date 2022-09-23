import {useState} from 'react'
import PropTypes from 'prop-types'

const SelectInput = ({label, name, value, ariaLabel, autodetected, options, handleChange}) => {
  const [isFocus, setIsFocus] = useState(false)
  const isValueNull = value === 'null' || value === 'undefined'

  return (
    <div className='container'>
      <label htmlFor={label}>{label} :</label>

      <select
        name={name}
        aria-label={ariaLabel}
        id={label}
        value={value}
        onChange={e => handleChange(e)}
        onFocus={() => setIsFocus(true)}
        onBlur={() => setIsFocus(false)}
      >
        <option value=''>{isValueNull ? 'Choisir une colonne' : 'Aucune'}</option>
        {options.map(({value, label, isDisabled}) => (
          <option key={value} value={value} disabled={isDisabled}>
            {label} {isFocus && autodetected === value ? '(détecté)' : ''}
          </option>
        ))}
      </select>

      <style jsx>{`
        .container {
          display: grid;
          align-items: center;
          grid-gap: .5rem;
        }

        label {
          font-weight: bold;
        }
      `}</style>
    </div>
  )
}

SelectInput.defaultProps = {
  autodetected: null,
}

SelectInput.propTypes = {
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  ariaLabel: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  autodetected: PropTypes.string,
  options: PropTypes.arrayOf(PropTypes.shape({
    value: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired
  })).isRequired,
  handleChange: PropTypes.func.isRequired
}

export default SelectInput

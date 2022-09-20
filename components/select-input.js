import {useState} from 'react'
import PropTypes from 'prop-types'

const SelectInput = ({label, value, autodetected, options, handleChange}) => {
  const [isFocus, setIsFocus] = useState(false)

  return (
    <div className='container'>
      <label htmlFor={label}>{label} :</label>

      <select
        name={label}
        id={label}
        value={value}
        onChange={e => handleChange(e.target.value)}
        onFocus={() => setIsFocus(true)}
        onBlur={() => setIsFocus(false)}
      >
        {options.map(({value, label}) => (
          <option key={value} value={value}>
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
  value: PropTypes.string.isRequired,
  autodetected: PropTypes.string,
  options: PropTypes.arrayOf(PropTypes.shape({
    value: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired
  })).isRequired,
  handleChange: PropTypes.func.isRequired
}

export default SelectInput

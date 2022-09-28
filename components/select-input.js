import {useState} from 'react'
import PropTypes from 'prop-types'

import theme from '@/styles/theme'

const SelectInput = ({label, name, value, ariaLabel, autodetected, options, isDisabled, handleChange}) => {
  const [isFocus, setIsFocus] = useState(false)

  return (
    <div className='container'>
      <label htmlFor={label}>{label} :</label>

      <select
        name={name}
        aria-label={ariaLabel}
        id={label}
        value={value}
        disabled={isDisabled}
        onChange={handleChange}
        onFocus={() => setIsFocus(true)}
        onBlur={() => setIsFocus(false)}
      >
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

        select {
          background: #fff;
          border: none;
          border-bottom: 3px solid ${theme.borderDarker};
          padding: .5em;
          border-radius: 3px 3px 0 0;
        }

        select:disabled {
          background-color: ${theme.disable};
        }
      `}</style>
    </div>
  )
}

SelectInput.defaultProps = {
  autodetected: null,
  isDisabled: false
}

SelectInput.propTypes = {
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  ariaLabel: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  autodetected: PropTypes.string,
  isDisabled: PropTypes.bool,
  options: PropTypes.arrayOf(PropTypes.shape({
    value: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired
  })).isRequired,
  handleChange: PropTypes.func.isRequired
}

export default SelectInput

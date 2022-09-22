import PropTypes from 'prop-types'

const TextInput = ({value, placeholder, handleChange, label, name, ariaLabel}) => (
  <div className='container'>
    <label htmlFor={name}>{label}</label>
    <input
      type='text'
      name={name}
      defaultValue={value}
      placeholder={placeholder}
      aria-label={ariaLabel}
      onChange={e => handleChange(e)}
    />

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

TextInput.defaultProps = {
  placeholder: null
}

TextInput.propTypes = {
  value: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  ariaLabel: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired
}

export default TextInput

import PropTypes from 'prop-types'

import colors from '@/styles/colors'

import SelectInput from '@/components/select-input'

const linebreakOptions = [
  {value: '\n', label: 'Linux'},
  {value: '\r\n', label: 'Windows'},
  {value: '\r', label: 'BSD'}
]

const delimiterOptions = [
  {value: ',', label: 'virgule'},
  {value: ';', label: 'point-virgule'},
  {value: '\t', label: ' tabulation'},
  {value: '|', label: 'pipe'}
]

const quoteCharOptions = [
  {value: '"', label: 'double-quote'},
  {value: '\'\'', label: 'quote-quote'}
]

const encodingOptions = [
  {value: 'UTF-8', label: 'UTF-8'}, // eslint-disable-line unicorn/text-encoding-identifier-case
  {value: 'ISO-8859-1', label: 'ISO-8859-1'},
  {value: 'windows-1252', label: 'windows-1252'}
]

const OptionsInputs = ({
  autodetected,
  encoding, handleEncoding,
  delimiter, handleDelimeter,
  linebreak, handleLinebreak,
  quoteChar, handleQuoteChar
}) => (
  <section>
    <h3>Paramètres du fichier détectés</h3>
    <div className='inputs'>
      <SelectInput label='Encodage' value={encoding} autodetected={autodetected.encoding} options={encodingOptions} auto handleChange={handleEncoding} />
      <SelectInput label='Séparateur de ligne' value={linebreak} autodetected={autodetected.linebreak} options={linebreakOptions} handleChange={handleLinebreak} />
      <SelectInput label='Séparateur de colonne' value={delimiter} autodetected={autodetected.delimiter} options={delimiterOptions} handleChange={handleDelimeter} />
      <SelectInput label='Caractère d’échappement' value={quoteChar} autodetected={autodetected.quoteChar} options={quoteCharOptions} handleChange={handleQuoteChar} />
    </div>

    <style jsx>{`
      .inputs {
        display: grid;
        align-items: center;
        grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
        background: ${colors.darkBlue};
        color: white;
        border-radius: 10px;
        padding: 1rem;
        grid-gap: 1rem;
      }
      `}</style>
  </section>
)

OptionsInputs.propTypes = {
  autodetected: PropTypes.shape({
    encoding: PropTypes.string.isRequired,
    linebreak: PropTypes.string.isRequired,
    delimiter: PropTypes.string.isRequired,
    quoteChar: PropTypes.string.isRequired
  }),
  encoding: PropTypes.string.isRequired,
  handleEncoding: PropTypes.func.isRequired,
  delimiter: PropTypes.string.isRequired,
  handleDelimeter: PropTypes.func.isRequired,
  linebreak: PropTypes.string.isRequired,
  handleLinebreak: PropTypes.func.isRequired,
  quoteChar: PropTypes.string.isRequired,
  handleQuoteChar: PropTypes.func.isRequired
}

export default OptionsInputs

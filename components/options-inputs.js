import PropTypes from 'prop-types'

import theme from '@/styles/theme'

import SelectInput from '@/components/select-input'
import UnderlineTitle from '@/components/underline-title'
import {linebreakOptions, delimiterOptions, quoteCharOptions, encodingOptions} from '@/lib/options-params'

const OptionsInputs = ({
  autodetected, isCsvPreview,
  encoding, handleEncoding,
  delimiter, handleDelimeter,
  linebreak, handleLinebreak,
  quoteChar, handleQuoteChar
}) => (
  <section>
    <UnderlineTitle>Paramètres du fichier détectés</UnderlineTitle>

    <div className='inputs'>
      <SelectInput label='Encodage' ariaLabel='Sélectionner le type d’encodage' value={encoding} autodetected={autodetected.encoding} options={encodingOptions} auto handleChange={handleEncoding} />
      <SelectInput label='Séparateur de ligne' ariaLabel='Sélectionner le séparateur de ligne' value={linebreak} autodetected={autodetected.linebreak} options={linebreakOptions} handleChange={handleLinebreak} isDisabled={isCsvPreview} />
      <SelectInput label='Séparateur de colonne' ariaLabel='Sélectionner le séparateur de colonne' value={delimiter} autodetected={autodetected.delimiter} options={delimiterOptions} handleChange={handleDelimeter} />
      <SelectInput label='Caractère d’échappement' ariaLabel='Sélectionner le caractère d’échappement' value={quoteChar} autodetected={autodetected.quoteChar} options={quoteCharOptions} handleChange={handleQuoteChar} />
    </div>

    <style jsx>{`
      .inputs {
        display: grid;
        align-items: center;
        justify-content: center;
        grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
        background: ${theme.bkgPrimary};
        color: white;
        border-radius: 10px;
        padding: 2em 3em;
        grid-gap: 1em;
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
  isCsvPreview: PropTypes.bool,
  encoding: PropTypes.string.isRequired,
  handleEncoding: PropTypes.func.isRequired,
  delimiter: PropTypes.string.isRequired,
  handleDelimeter: PropTypes.func.isRequired,
  linebreak: PropTypes.string.isRequired,
  handleLinebreak: PropTypes.func.isRequired,
  quoteChar: PropTypes.string.isRequired,
  handleQuoteChar: PropTypes.func.isRequired
}

OptionsInputs.defaultProps = {
  isCsvPreview: true
}

export default OptionsInputs

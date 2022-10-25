import {useState, useCallback, useEffect, useMemo} from 'react'
import PropTypes from 'prop-types'
import {difference} from 'lodash'
import {faEdit} from '@fortawesome/free-solid-svg-icons'

import SelectInput from '@/components/select-input'
import OptionsInputs from '@/components/options-inputs'
import Button from '@/components/button'

const FormatOptionsForm = ({formatOptions, detectedFormatOptions, previewCount, isCsvPreview, submitOptions}) => {
  const [encoding, setEncoding] = useState(detectedFormatOptions.encoding)
  const [delimiter, setDelimiter] = useState(detectedFormatOptions.delimiter)
  const [linebreak, setLinebreak] = useState(detectedFormatOptions.linebreak)
  const [quoteChar, setQuoteChar] = useState(detectedFormatOptions.quoteChar)
  const [rowsCount, setRowsCount] = useState(previewCount || null)

  const isChangedDetected = useMemo(() => {
    const hasOptionsChanged = difference(
      Object.values(formatOptions),
      [encoding, delimiter, linebreak, quoteChar]
    ).length > 0
    const hasRowsCountChanged = rowsCount !== previewCount

    return hasOptionsChanged || hasRowsCountChanged
  }, [previewCount, rowsCount, encoding, delimiter, linebreak, quoteChar, formatOptions])

  const handleSubmit = useCallback(e => {
    e.preventDefault()
    const options = isCsvPreview ? {formatOptions: {encoding, delimiter, linebreak, quoteChar}, previewCount: rowsCount} : {encoding, delimiter, linebreak, quoteChar}
    submitOptions(options)
  }, [encoding, delimiter, linebreak, quoteChar, rowsCount, submitOptions, isCsvPreview])

  // Reset options states when preview is updated
  useEffect(() => {
    const {encoding, delimiter, linebreak, quoteChar} = formatOptions

    setEncoding(encoding)
    setDelimiter(delimiter)
    setLinebreak(linebreak)
    setQuoteChar(quoteChar)
  }, [formatOptions])

  useEffect(() => {
    if (!isCsvPreview) {
      submitOptions({encoding, delimiter, linebreak, quoteChar})
    }
  }, [isCsvPreview, encoding, delimiter, linebreak, quoteChar, submitOptions])

  return (
    <div className='options-form'>
      <OptionsInputs
        autodetected={detectedFormatOptions}
        isCsvPreview={isCsvPreview}
        encoding={encoding} handleEncoding={e => setEncoding(e.target.value)}
        delimiter={delimiter} handleDelimeter={e => setDelimiter(e.target.value)}
        linebreak={linebreak} handleLinebreak={e => setLinebreak(e.target.value)}
        quoteChar={quoteChar} handleQuoteChar={e => setQuoteChar(e.target.value)}
      />

      {isCsvPreview && (
        <div className='update-buttons'>
          <SelectInput
            label='Lignes'
            ariaLabel='Sélectionner le nombre de lignes à afficher'
            value={rowsCount.toString()}
            options={[10, 50, 100].map(v => ({label: v.toString(), value: v.toString()}))}
            handleChange={v => setRowsCount(Number.parseInt(v.target.value, 10))}
          />

          <Button
            onClick={handleSubmit}
            disabled={!isChangedDetected}
            icon={faEdit}
          >
            Modifier les paramètres
          </Button>
        </div>
      )}

      <style jsx>{`
        .options-form {
          display: flex;
          flex-direction: column;
        }

        .submit-options {
          display: flex;
          justify-content: space-between;
          flex-flow: wrap;
        }

        .update-buttons {
          display: flex;
          flex-flow: wrap;
          justify-content: space-between;
          align-items: center;
          gap: .5rem;
          padding: .5rem;
        }
      `}</style>
    </div>
  )
}

FormatOptionsForm.propTypes = {
  formatOptions: PropTypes.object.isRequired,
  detectedFormatOptions: PropTypes.object.isRequired,
  previewCount: PropTypes.number,
  isCsvPreview: PropTypes.bool,
  submitOptions: PropTypes.func.isRequired
}

FormatOptionsForm.defaultProps = {
  previewCount: null,
  isCsvPreview: true
}

export default FormatOptionsForm

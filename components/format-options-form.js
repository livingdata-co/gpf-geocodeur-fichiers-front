import {useState, useCallback, useEffect, useMemo} from 'react'
import PropTypes from 'prop-types'
import {difference} from 'lodash'

import SectionHeader from '@/components/section-header'
import SelectInput from '@/components/select-input'
import OptionsInputs from '@/components/options-inputs'
import Button from '@/components/button'

const FormatOptionsForm = ({formatOptions, detectedFormatOptions, previewCount, submitOptions}) => {
  const [encoding, setEncoding] = useState(detectedFormatOptions.encoding)
  const [delimiter, setDelimiter] = useState(detectedFormatOptions.delimiter)
  const [linebreak, setLinebreak] = useState(detectedFormatOptions.linebreak)
  const [quoteChar, setQuoteChar] = useState(detectedFormatOptions.quoteChar)
  const [rowsCount, setRowsCount] = useState(previewCount)

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

    submitOptions({
      formatOptions: {encoding, delimiter, linebreak, quoteChar},
      previewCount: rowsCount
    })
  }, [encoding, delimiter, linebreak, quoteChar, rowsCount, submitOptions])

  // Reset options states when preview is updated
  useEffect(() => {
    const {encoding, delimiter, linebreak, quoteChar} = formatOptions

    setEncoding(encoding)
    setDelimiter(delimiter)
    setLinebreak(linebreak)
    setQuoteChar(quoteChar)
  }, [formatOptions])

  return (
    <>
      <SectionHeader>2 - Aperçu du fichier et vérification de l’encodage</SectionHeader>
      <div className='options-form'>
        <OptionsInputs
          autodetected={detectedFormatOptions}
          encoding={encoding} handleEncoding={setEncoding}
          delimiter={delimiter} handleDelimeter={setDelimiter}
          linebreak={linebreak} handleLinebreak={setLinebreak}
          quoteChar={quoteChar} handleQuoteChar={setQuoteChar}
        />
        <div className='submit-options'>
          <SelectInput
            label='Lignes'
            value={rowsCount.toString()}
            options={[10, 50, 100].map(v => ({label: v.toString(), value: v.toString()}))}
            handleChange={v => setRowsCount(Number.parseInt(v, 10))}
          />
          <Button onClick={handleSubmit} disabled={!isChangedDetected}>Modifier les paramètres</Button>
        </div>

      </div>
      <style jsx>{`
            .options-form {
                display: flex;
                flex-direction: column;
            }

            .submit-options {
                display: flex;
                justify-content: space-between; 
                flex-flow: wrap;
                align-items: center;
                gap: .5rem;
                padding: .5rem;
            }
        `}</style>
    </>
  )
}

FormatOptionsForm.propTypes = {
  formatOptions: PropTypes.object.isRequired,
  detectedFormatOptions: PropTypes.object.isRequired,
  previewCount: PropTypes.number.isRequired,
  submitOptions: PropTypes.func.isRequired
}

export default FormatOptionsForm

import PropTypes from 'prop-types'
import {difference} from 'lodash'
import {useCallback, useEffect, useMemo, useState} from 'react'

import Button from '@/components/button'
import SectionHeader from '@/components/section-header'
import SelectInput from '@/components/select-input'
import GeocodePreview from '@/components/geocode-preview'
import ErrorMessage from '@/components/error-message'

import Table from '@/components/file-preview/table'
import OptionsInputs from '@/components/file-preview/options-inputs'
import ColumnsSelect from '@/components/file-preview/columns-select'
import AdvancedParams from '@/components/file-preview/advanced-params'

const FilePreview = ({columns, rows, formatOptions, detectedFormatOptions, parseErrors, updatePreview, handleSubmit}) => {
  const [encoding, setEncoding] = useState(detectedFormatOptions.encoding)
  const [delimiter, setDelimiter] = useState(detectedFormatOptions.delimiter)
  const [linebreak, setLinebreak] = useState(detectedFormatOptions.linebreak)
  const [quoteChar, setQuoteChar] = useState(detectedFormatOptions.quoteChar)
  const [advancedParams, setAdvancedParams] = useState({})
  const [rowsCount, setRowsCount] = useState(rows.length)
  const [selectedColumns, setSelectedColumns] = useState([])

  const isChangedDetected = useMemo(() => {
    const hasOptionsChanged = difference(
      Object.values(formatOptions),
      [encoding, delimiter, linebreak, quoteChar]
    ).length > 0
    const hasRowsCountChanged = rowsCount !== rows.length

    return hasOptionsChanged || hasRowsCountChanged
  }, [rows, rowsCount, encoding, delimiter, linebreak, quoteChar, formatOptions])

  const handleColumn = useCallback(column => {
    if (selectedColumns.includes(column)) {
      setSelectedColumns(selectedColumns.filter(c => c !== column))
    } else {
      setSelectedColumns([...selectedColumns, column])
    }
  }, [selectedColumns])

  const submitOptions = useCallback(e => {
    e.preventDefault()

    updatePreview({
      formatOptions: {encoding, delimiter, linebreak, quoteChar},
      previewCount: rowsCount
    })
  }, [encoding, delimiter, linebreak, quoteChar, rowsCount, updatePreview])

  const onSubmit = useCallback(() => {
    handleSubmit({
      formatOptions: {encoding, delimiter, linebreak, quoteChar, ...advancedParams},
    })
  }, [encoding, delimiter, linebreak, quoteChar, advancedParams, handleSubmit])

  // Reset options states when preview is updated
  useEffect(() => {
    const {encoding, delimiter, linebreak, quoteChar} = formatOptions

    setEncoding(encoding)
    setDelimiter(delimiter)
    setLinebreak(linebreak)
    setQuoteChar(quoteChar)
  }, [formatOptions])

  return (
    <div>
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
          <Button onClick={submitOptions} disabled={!isChangedDetected}>Modifier les paramètres</Button>
        </div>
      </div>

      {parseErrors.length > 0 ? (
        <ErrorMessage>Les paramètres sélectionnés ne permettent pas l’analyse du fichier</ErrorMessage>
      ) : (
        <>
          <Table columns={columns} rows={rows} selectedColumns={selectedColumns} onSelect={handleColumn} />

          <SectionHeader>3 - Construire les adresses</SectionHeader>
          <ColumnsSelect selectedColumns={selectedColumns} columns={columns} onSelect={handleColumn} />
          {selectedColumns.length > 0 && <GeocodePreview columns={selectedColumns} rows={rows} maxRow={rowsCount} />}
          <AdvancedParams columns={columns} handleParams={setAdvancedParams} />

          <div className='submit'>
            <Button onClick={onSubmit}>Lancer le géocodage</Button>
          </div>
        </>
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
        align-items: center;
        gap: .5rem;
        padding: .5rem;
      }

      .submit {
        display: flex;
        justify-content: center;
      }
      `}</style>
    </div>
  )
}

FilePreview.defaultProps = {
  columns: [],
  rows: [],
  parseErrors: []
}

FilePreview.propTypes = {
  columns: PropTypes.array,
  rows: PropTypes.array,
  parseErrors: PropTypes.array,
  formatOptions: PropTypes.object.isRequired,
  detectedFormatOptions: PropTypes.object.isRequired,
  updatePreview: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired
}

export default FilePreview

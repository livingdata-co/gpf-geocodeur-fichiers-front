import PropTypes from 'prop-types'
import {useCallback} from 'react'

import GeocodePreview from '@/components/geocode-preview'
import ColumnsSelect from '@/components/build-address/columns-select'
import AdvancedParams from '@/components/build-address/advanced-params'

const BuildAddress = ({columns, rows, previewCount, selectedColumns, handleColumns, handleAdvancedParams}) => {
  const handleColumn = useCallback(column => {
    if (selectedColumns.includes(column)) {
      handleColumns(selectedColumns.filter(c => c !== column))
    } else {
      handleColumns([...selectedColumns, column])
    }
  }, [selectedColumns, handleColumns])

  return (
    <div>
      <ColumnsSelect selectedColumns={selectedColumns} columns={columns} onSelect={handleColumn} />
      {selectedColumns.length > 0 && <GeocodePreview columns={selectedColumns} rows={rows} maxRow={previewCount} />}
      <AdvancedParams columns={columns} handleParams={handleAdvancedParams} />
    </div>
  )
}

BuildAddress.propTypes = {
  columns: PropTypes.array.isRequired,
  rows: PropTypes.string.isRequired,
  previewCount: PropTypes.string.isRequired,
  selectedColumns: PropTypes.array.isRequired,
  handleColumns: PropTypes.func.isRequired,
  handleAdvancedParams: PropTypes.func.isRequired,
}

export default BuildAddress

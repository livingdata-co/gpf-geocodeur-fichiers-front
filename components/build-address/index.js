import PropTypes from 'prop-types'
import {useCallback} from 'react'

import Table from '@/components/table'
import GeocodePreview from '@/components/geocode-preview'
import ColumnsSelect from '@/components/build-address/columns-select'
import AdvancedParams from '@/components/build-address/advanced-params'

const BuildAddress = ({columns, rows, selectedColumns, handleColumns, handleAdvancedParams}) => {
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
      {selectedColumns.length > 0 && (
        <div>
          <h3>Prévisualisation de l’adresse</h3>
          <Table columns={columns} rows={rows.slice(0, 3)} selectedColumns={selectedColumns} onSelect={handleColumn} />
          <GeocodePreview columns={selectedColumns} rows={rows} maxRow={3} />
        </div>
      )}
      <AdvancedParams columns={columns} handleParams={handleAdvancedParams} />
    </div>
  )
}

BuildAddress.propTypes = {
  columns: PropTypes.array.isRequired,
  rows: PropTypes.array.isRequired,
  selectedColumns: PropTypes.array.isRequired,
  handleColumns: PropTypes.func.isRequired,
  handleAdvancedParams: PropTypes.func.isRequired,
}

export default BuildAddress

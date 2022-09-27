import {useEffect, useMemo, useState} from 'react'
import PropTypes from 'prop-types'

import SelectInput from '@/components/select-input'

const GeocodePreview = ({columns, rows, maxRow}) => {
  const [row, setRow] = useState(0)
  const rowOptions = useMemo(() => (
    [...Array.from({length: maxRow}).keys()].map(k => ({label: `${k + 1}`, value: k.toString()}))
  ), [maxRow])

  const handleRow = e => {
    const {value} = e.target
    setRow(Number.parseInt(value, 10))
  }

  useEffect(() => {
    if (row > maxRow) {
      setRow(maxRow)
    }
  }, [row, maxRow])

  return (
    <div className='container'>
      <SelectInput
        label='Ligne'
        value={row.toString()}
        options={rowOptions}
        handleChange={handleRow}
      />

      <div className='geocode-preview'>
        {columns.map(column => rows[row][column]).join(' ')}
      </div>

      <style jsx>{`
        .container {
            display: grid;
            grid-template-columns: 100px 1fr;
            gap: 2em;
        }

        .geocode-preview {
            flex: 1;
            padding: 1em;
            background: whitesmoke;
            border-radius: 4px;
        }
        `}</style>
    </div>
  )
}

GeocodePreview.propTypes = {
  columns: PropTypes.array.isRequired,
  rows: PropTypes.array.isRequired,
  maxRow: PropTypes.number.isRequired
}

export default GeocodePreview

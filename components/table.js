import {useMemo} from 'react'
import PropTypes from 'prop-types'
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table'

import colors from '@/styles/colors'

const CELL_HEIGHT = 40

const Table = ({columns, rows, selectedColumns, onSelect}) => {
  const columnHelper = createColumnHelper()

  const tableColumns = useMemo(() => (
    columns.map(column => columnHelper.accessor(column))
  ), [columns, columnHelper])

  const table = useReactTable({
    data: rows,
    columns: tableColumns,
    getCoreRowModel: getCoreRowModel(),
  })

  return (
    <div className='table-container'>
      <table>
        <thead>
          {table.getHeaderGroups().map(headerGroup => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map(header => (
                <th
                  key={header.id}
                  className={`${selectedColumns.includes(header.id) ? 'selected' : ''}`}
                  onClick={onSelect ? () => onSelect(header.id) : null}
                >
                  {flexRender(
                    header.column.columnDef.header,
                    header.getContext()
                  )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map(row => (
            <tr key={row.id}>
              {row.getVisibleCells().map(cell => (
                <td key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      <style jsx>{`
          .table-container {
            margin: 1em 0;
            height: 600px;
            width: 100%;
            overflow: scroll;
            width: -moz-available;
          }

          table {
            overflow: hidden;
            border-collapse: collapse;
          }

          thead {
            position: sticky;
            top: 0;
            background: #fff;
          }

          th {
            position: relative;
          }

          th, td {
            padding: 5px 10px;
            white-space: nowrap;
            height: ${CELL_HEIGHT}px;
            border: 1px solid whitesmoke;
            margin: 1px;
            cursor: ${onSelect ? 'pointer' : 'default'};
          }

          th::after, 
          th::before {
            content: "";
            position: absolute;
            left: 0;
            top: -1000px;
            height: 10000px;
            width: 100%;
          }

          th:hover::after,
          th.selected::after {
            background-color: ${onSelect ? `${colors.lightBlue}30` : ''};
          }

          th.selected:hover::after {
            background-color: ${onSelect ? `${colors.lightBlue}40` : ''};
          }

          tr {
            text-align: center;
          }
          `}</style>
    </div>
  )
}

Table.defaultProps = {
  selectedColumns: [],
  onSelect: null
}

Table.propTypes = {
  columns: PropTypes.arrayOf(PropTypes.string).isRequired,
  rows: PropTypes.arrayOf(PropTypes.object).isRequired,
  selectedColumns: PropTypes.array,
  onSelect: PropTypes.func
}

export default Table

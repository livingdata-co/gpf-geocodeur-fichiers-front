import PropTypes from 'prop-types'

import colors from '@/styles/colors'

import ColumnSelector from '@/components/file-preview/column-selector'

const ColumnsSelect = ({selectedColumns, columns, onSelect}) => (
  <div className='colums-select-container'>
    <h3>Colonnes à séléctionner</h3>
    <div className='columns'>
      {columns.filter(c => !selectedColumns.includes(c)).map(column => (
        <ColumnSelector key={column} label={column} icon='plus' handleClick={() => onSelect(column)} />
      ))}
    </div>

    <div className='selected columns'>
      {selectedColumns.length === 0 && <div className='empty'>Aucune colonne séléctionnée</div>}
      {selectedColumns.map(column => (
        <ColumnSelector key={column} label={column} icon='minus' handleClick={() => onSelect(column)} />
      ))}
    </div>

    <style jsx>{`
        .columns {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
            grid-gap: 1em;
            padding: 1em;
        }

        .selected {
            border: 1px dashed ${colors.blue};
        }

        .empty {
            background-color: whitesmoke;
            border-radius: 4px;
            padding: 1em;
        }
        `}</style>
  </div>
)

ColumnsSelect.propTypes = {
  selectedColumns: PropTypes.array.isRequired,
  columns: PropTypes.array.isRequired,
  onSelect: PropTypes.func.isRequired
}

export default ColumnsSelect

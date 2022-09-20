import PropTypes from 'prop-types'

import colors from '@/styles/colors'

const ColumnsSelect = ({selectedColumns, columns, onSelect}) => (
  <div className='colums-select-container'>
    <h3>Colonnes à séléctionner</h3>
    <div className='columns'>
      {columns.filter(c => !selectedColumns.includes(c)).map(column => (
        <div key={column} className='column' onClick={() => onSelect(column)}>
          {column}
        </div>
      ))}
    </div>

    <div className='selected columns'>
      {selectedColumns.length === 0 && <div className='empty'>Aucune colonne séléctionnée</div>}
      {selectedColumns.map(column => (
        <div key={column} className='column' onClick={() => onSelect(column)}>
          {column}
        </div>
      ))}
    </div>

    <style jsx>{`
        .colums-select-container {}
        .columns {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
            grid-gap: 1em;
            padding: 1em;
        }

        .selected {
            border: 1px dashed ${colors.blue};
        }
        
        .column {
            cursor: pointer;
            padding: 0.25rem .5rem;
            border: 1px solid ${colors.darkBlue};
            border-radius: 4px;
            overflow: hidden;
            text-overflow: ellipsis;
        }

        .column:hover {
            box-shadow: 0 4px 8px 0 ${colors.darkBlue}1f, 0 6px 20px 0 ${colors.darkBlue}1f;
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

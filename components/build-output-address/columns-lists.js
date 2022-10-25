import {useCallback} from 'react'
import PropTypes from 'prop-types'
import {faPlus, faMinus} from '@fortawesome/free-solid-svg-icons'

import ColumnSelector from '../build-address/column-selector'
import theme from '@/styles/theme'

const ColumnsLists = ({initials, added, selectedColumns, onSelect}) => {
  const handleColumn = useCallback(column => {
    if (selectedColumns.includes(column)) {
      onSelect(selectedColumns.filter(c => c !== column))
    } else {
      onSelect([...selectedColumns, column])
    }
  }, [selectedColumns, onSelect])

  return (
    <div className='columns-lists'>
      <div className='columns-to-select'>
        <h4>Colonnes du fichier d’origine</h4>
        <div className='columns'>
          {initials.filter(c => !selectedColumns.includes(c)).map(column => (
            <ColumnSelector key={column} label={column} icon={faMinus} handleClick={() => handleColumn(column)} />
          ))}
        </div>

        <h4>Colonnes issues du géocodage</h4>
        <div className='columns'>
          {added.filter(c => !selectedColumns.includes(c)).map(column => (
            <ColumnSelector key={column} label={column} icon={faMinus} handleClick={() => handleColumn(column)} />
          ))}
        </div>
      </div>

      <div className='excluded-columns'>
        <h4>Colonnes à exclure du traitement</h4>
        <div className='selected columns'>
          {selectedColumns.length === 0 && <div className='empty'>Toutes les colonnes sont conservées par défaut. <br /> Sélectionnez les colonnes à exclure</div>}
          {selectedColumns.map(column => (
            <ColumnSelector key={column} label={column} icon={faPlus} handleClick={() => handleColumn(column)} />
          ))}
        </div>
      </div>

      <style jsx>{`
      .columns-to-select {
       display: flex;
       flex-direction: column;
       gap: 1em;
      }

      .columns {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
        grid-gap: 1em;
        padding: 1em;
      }

      .excluded-columns {
        margin-top: 1em;
      }

      .selected {
        margin-top: 1em;
        border: 1px dashed ${theme.borderPrimary};
        grid-template-columns: ${selectedColumns.length === 0 ? '1fr' : 'repeat(auto-fill, minmax(240px, 1fr))'};
      }

      .empty {
        width: 100%;
        background-color: whitesmoke;
        border-radius: 4px;
        padding: 1em;
        box-sizing: border-box;
        text-align: center;
      }
    `}</style>
    </div>
  )
}

ColumnsLists.propTypes = {
  initials: PropTypes.array.isRequired,
  added: PropTypes.array.isRequired,
  selectedColumns: PropTypes.array.isRequired,
  onSelect: PropTypes.func.isRequired
}

export default ColumnsLists

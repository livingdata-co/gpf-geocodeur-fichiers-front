import PropTypes from 'prop-types'
import {faPlus, faMinus} from '@fortawesome/free-solid-svg-icons'

import ColumnSelector from '../build-address/column-selector'
import theme from '@/styles/theme'

const ColumnsLists = ({exclusionList, fileColumns, geocodeColumns, isAllFilesSelected, onSelect}) => (
  <div className='columns-lists'>
    <div className='columns-to-select'>
      <h4>Colonnes du fichier d’origine</h4>
      <div className='columns'>
        {fileColumns.filter(c => !exclusionList.includes(c)).map(column => (
          <ColumnSelector key={column} label={column} icon={faMinus} handleClick={() => onSelect(column)} />
        ))}
      </div>

      <h4>Colonnes issues du géocodage</h4>
      <div className='columns'>
        {geocodeColumns.filter(c => !exclusionList.includes(c)).map(column => (
          <ColumnSelector key={column} label={column} icon={faMinus} handleClick={() => onSelect(column)} />
        ))}
      </div>
    </div>

    <div className='excluded-columns'>
      <h4>Colonnes à exclure du traitement</h4>
      <div className='selected columns'>
        {isAllFilesSelected && <div className='empty'>Toutes les colonnes sont conservées par défaut. <br /> Sélectionnez les colonnes à exclure</div>}
        {exclusionList.map(column => (
          <ColumnSelector key={column} label={column} icon={faPlus} handleClick={() => onSelect(column)} />
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
        grid-template-columns: ${isAllFilesSelected ? '1fr' : 'repeat(auto-fill, minmax(240px, 1fr))'};
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

ColumnsLists.propTypes = {
  fileColumns: PropTypes.array.isRequired,
  geocodeColumns: PropTypes.array.isRequired,
  exclusionList: PropTypes.array.isRequired,
  isAllFilesSelected: PropTypes.bool.isRequired,
  onSelect: PropTypes.func.isRequired
}

export default ColumnsLists

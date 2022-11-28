import PropTypes from 'prop-types'

import theme from '@/styles/theme'

const Pipeline = ({format, formatOptions, geocodeOptions}) => (
  <div>
    <div>
      <b>Format :</b> {format}
      {format === 'csv' && (
        <div className='options'>
          <div className='format-option'>Séparateur de colonne : <div className='option'>{formatOptions.delimiter}</div></div>
          <div className='format-option'>Séparateur de ligne : <div className='option'>{formatOptions.lignebreak}</div></div>
          <div className='format-option'>Type d’encodage : <div className='option'>{formatOptions.encoding}</div></div>
          <div className='format-option'>Caractère d’échappement : <div className='option'>{formatOptions.lignebreak}</div></div>
        </div>
      )}
    </div>

    <div className='geocode-options'>
      <b>Colonnes sélectionnées</b>

      <div className='options'>
        {geocodeOptions.q.map(option => (
          <div className='option' key={option}>{option}</div>
        ))}
      </div>
    </div>

    <style jsx>{`
        .options {
        display: flex;
        justify-content: space-between;
        }

        .format-option {
        display: flex;
        align-items: center;
        gap: .5em;
        }

        .option {
        padding: .4em;
        background-color: ${theme.bkgLight};
        border-radius: 4px;
        }

        .geocode-options {
        margin: 1em 0;
        }
    `}</style>
  </div>
)

Pipeline.propTypes = {
  format: PropTypes.string.isRequired,
  formatOptions: PropTypes.object.isRequired,
  geocodeOptions: PropTypes.object.isRequired
}

export default Pipeline

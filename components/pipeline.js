import PropTypes from 'prop-types'

import UnderlineTitle from './underline-title'
import theme from '@/styles/theme'

const Pipeline = ({format, formatOptions, geocodeOptions}) => {
  console.log(formatOptions.linebreak)
  return (
    <div>
      <UnderlineTitle>Paramètres sélectionnés</UnderlineTitle>
      <table cellSpacing='0'>
        <thead>
          <tr>
            <th>Format</th>
            <th>Séparateur de colonne</th>
            <th>Séparateur de ligne</th>
            <th>Type d’encodage</th>
            <th>Caractère d’échappement</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><div className='option'>{format}</div></td>
            <td><div className='option'>{formatOptions.delimiter}</div></td>
            <td><div className='option'>{formatOptions.linebreak}</div></td>
            <td><div className='option'>{formatOptions.encoding}</div></td>
            <td><div className='option'>{formatOptions.quoteChar}</div></td>
          </tr>
        </tbody>
      </table>

      <div className='geocode-options'>
        <UnderlineTitle>Colonnes sélectionnées</UnderlineTitle>

        <div className='columns'>
          {geocodeOptions.q.map(option => (
            <div className='param' key={option}>{option}</div>
          ))}
        </div>
      </div>

      <style jsx>{`
        table {
          width: 100%;
          background: ${theme.bkgPrimary};
          border-radius: 3px;
          text-align: center;
          border-collapse: collapse;
        }

        thead {
          color: white;
          font-weight: bold;
          border-bottom: solid 1px ${theme.borderLight};
        }

        th, td {
          padding: 1em;
        }

        .param {
          border-radius: 3px;
          background: ${theme.bkgLight};
          border: solid 2px ${theme.borderPrimary};
          padding: 0.25rem .5rem;
        }

        .columns {
          display: flex;
          gap: 10px;
          flex-wrap: wrap;
        }

        .format-option {
          display: flex;
          align-items: center;
          gap: .5em;
        }

        .option {
          padding: .4em;
          background-color: white;
          border-radius: 4px;
        }

        .geocode-options {
          margin: 1em 0;
        }
      `}</style>
    </div>
  )
}

Pipeline.propTypes = {
  format: PropTypes.string.isRequired,
  formatOptions: PropTypes.object.isRequired,
  geocodeOptions: PropTypes.object.isRequired
}

export default Pipeline

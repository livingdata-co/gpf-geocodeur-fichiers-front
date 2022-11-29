import PropTypes from 'prop-types'

import theme from '@/styles/theme'

import {linebreakOptions, delimiterOptions, quoteCharOptions, encodingOptions} from '@/lib/options-params'

const CSVOptions = ({delimiter, linebreak, encoding, quoteChar}) => (
  <div className='container'>
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
          <td><div className='option'>CSV</div></td>
          <td><div className='option'>{delimiterOptions.find(o => o.value === delimiter).label}</div></td>
          <td><div className='option'>{linebreakOptions.find(o => o.value === linebreak).label}</div></td>
          <td><div className='option'>{encodingOptions.find(o => o.value === encoding).label}</div></td>
          <td><div className='option'>{quoteCharOptions.find(o => o.value === quoteChar).label}</div></td>
        </tr>
      </tbody>
    </table>

    <style jsx>{`
        .container {
            overflow: scroll;
        }

        table {
            width: 100%;
            background: ${theme.bkgPrimary};
            border-radius: 3px;
            text-align: center;
            border-collapse: collapse;
            overflow: hidden;
        }

        thead {
            color: white;
            font-weight: bold;
            border-bottom: solid 1px ${theme.borderLight};
        }

        th, td {
            padding: 1em;
        }

        .option {
            padding: .4em;
            background-color: white;
            border-radius: 4px;
            height: 20px;
        }
      `}</style>
  </div>
)

CSVOptions.propTypes = {
  delimiter: PropTypes.string.isRequired,
  linebreak: PropTypes.string.isRequired,
  encoding: PropTypes.string.isRequired,
  quoteChar: PropTypes.string.isRequired
}

export default CSVOptions

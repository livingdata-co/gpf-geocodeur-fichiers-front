import PropTypes from 'prop-types'

import theme from '@/styles/theme'

import UnderlineTitle from '@/components/underline-title'
import CSVOptions from '@/components/pipeline/csv-options'
import GeoJSONOptions from '@/components/pipeline/geojson-options'

const FORMATS = {
  csv: CSVOptions,
  geojson: GeoJSONOptions
}

const Pipeline = ({format, formatOptions, outputFormat, outputFormatOptions, geocodeOptions}) => {
  const InputFormat = FORMATS[format]
  const OutputFormat = FORMATS[outputFormat]
  return (
    <div>
      <UnderlineTitle>Paramètres d’entrée</UnderlineTitle>
      <InputFormat {...formatOptions} />

      <UnderlineTitle>Paramètres de sortie</UnderlineTitle>
      <OutputFormat {...outputFormatOptions} />

      <div className='geocode-options'>
        <UnderlineTitle>Colonnes sélectionnées</UnderlineTitle>

        <div className='columns'>
          {geocodeOptions.q.map(option => (
            <div className='param' key={option}>{option}</div>
          ))}
        </div>
      </div>

      <style jsx>{`
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
  outputFormat: PropTypes.object.isRequired,
  outputFormatOptions: PropTypes.object.isRequired,
  geocodeOptions: PropTypes.object.isRequired
}

export default Pipeline

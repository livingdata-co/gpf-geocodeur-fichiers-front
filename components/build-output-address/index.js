import PropTypes from 'prop-types'
import {faCircleChevronRight, faCircleChevronLeft} from '@fortawesome/free-solid-svg-icons'

import FormatOptionsForm from '../format-options-form'

import ColumnsLists from './columns-lists'
import SelectInput from '@/components/select-input'
import UnderlineTitle from '@/components/underline-title'
import Button from '@/components/button'

const formatOptions = [
  {value: 'csv', label: 'CSV'},
  {value: 'gpkg', label: 'GPKG'},
  {value: 'geojson', label: 'GeoJSON'}
]

const BuildOutputAddress = ({
  format,
  params,
  detectedParams,
  columns,
  selectedColumns,
  handleOutputFormat,
  handleParams,
  handleColumns,
  handleStep}) => {
  const {initialsColumns, geocodeAddedColumns} = columns

  return (
    <div>
      <section>
        <UnderlineTitle>Sélectionner le format de sortie</UnderlineTitle>
        <div className='format-select'>
          <SelectInput
            label='Format de sortie'
            ariaLabel='Sélectionner le format de sortie'
            value={format}
            options={formatOptions}
            handleChange={e => handleOutputFormat(e.target.value)}
          />
        </div>
      </section>

      {format === 'csv' && (
        <section>
          <FormatOptionsForm
            formatOptions={params}
            detectedFormatOptions={detectedParams}
            submitOptions={handleParams}
            isCsvPreview={false}
          />
        </section>
      )}

      <section>
        <UnderlineTitle>Sélection des colonnes</UnderlineTitle>
        <ColumnsLists initials={initialsColumns} added={geocodeAddedColumns} selectedColumns={selectedColumns} onSelect={handleColumns} />
      </section>

      <div className='actions-buttons'>
        <Button onClick={() => handleStep(3)} label='Aller à l’étape précédente' icon={faCircleChevronLeft} color='secondary'>
          Étape précédente
        </Button>
        <Button onClick={() => handleStep(5)} label='Aller à l’étape suivante' icon={faCircleChevronRight}>
          Étape suivante
        </Button>
      </div>

      <style jsx>{`
        .format-select {
          width: fit-content;
        }

        section {
          margin-top: 2em;
        }

        .actions-buttons {
          margin-top: 1.5em;
          margin-bottom: 2em;
          display: flex;
          justify-content: space-between;
        }
      `}</style>
    </div>
  )
}

BuildOutputAddress.propTypes = {
  format: PropTypes.string.isRequired,
  params: PropTypes.object.isRequired,
  detectedParams: PropTypes.object.isRequired,
  columns: PropTypes.object.isRequired,
  selectedColumns: PropTypes.array.isRequired,
  handleOutputFormat: PropTypes.func.isRequired,
  handleParams: PropTypes.func.isRequired,
  handleColumns: PropTypes.func.isRequired,
  handleStep: PropTypes.func.isRequired
}

export default BuildOutputAddress

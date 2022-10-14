import {useCallback} from 'react'
import PropTypes from 'prop-types'
import {difference} from 'lodash'
import {faCircleChevronRight, faCircleChevronLeft} from '@fortawesome/free-solid-svg-icons'

import FormatOptionsForm from '../format-options-form'

import SelectInput from '@/components/select-input'
import UnderlineTitle from '@/components/underline-title'
import Table from '@/components/table'
import Button from '@/components/button'

const formatOptions = [
  {value: 'csv', label: 'CSV'},
  {value: 'gpkg', label: 'GPKG'},
  {value: 'geojson', label: 'GeoJSON'}
]

const BuildOutputAddress = ({
  format,
  params,
  detectedFormat,
  detectedParams,
  selectedColumns,
  columns,
  rows,
  handleOutputFormat,
  handleParams,
  handleColumns,
  handleStep}) => {
  const handleColumn = useCallback(column => {
    if (selectedColumns.includes(column)) {
      handleColumns(selectedColumns.filter(c => c !== column))
    } else {
      handleColumns([...selectedColumns, column])
    }
  }, [selectedColumns, handleColumns])

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
            autodetected={detectedFormat}
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
        <Table
          columns={columns}
          rows={rows}
          selectedColumns={difference(columns, selectedColumns)}
          isSelectExcludes
          onSelect={handleColumn}
        />
      </section>

      <div className='actions-buttons'>
        <Button onClick={() => handleStep(3)} label='Aller à l’étape précédente' icon={faCircleChevronLeft} color='secondary'>
          Étape précédente
        </Button>
        <Button onClick={() => handleStep(5)} label='Aller à l’étape suivante' icon={faCircleChevronRight}>
          Valider les paramètres
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
          display: grid;
          grid-template-columns: auto 1fr;
          justify-items: center;
          gap: 1;
        }
      `}</style>
    </div>
  )
}

BuildOutputAddress.propTypes = {
  format: PropTypes.string.isRequired,
  params: PropTypes.object.isRequired,
  detectedFormat: PropTypes.string.isRequired,
  detectedParams: PropTypes.object.isRequired,
  columns: PropTypes.array.isRequired,
  rows: PropTypes.array.isRequired,
  selectedColumns: PropTypes.array.isRequired,
  handleOutputFormat: PropTypes.func.isRequired,
  handleParams: PropTypes.func.isRequired,
  handleColumns: PropTypes.func.isRequired,
  handleStep: PropTypes.func.isRequired
}

export default BuildOutputAddress
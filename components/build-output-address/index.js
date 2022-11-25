import {useState, useCallback} from 'react'
import PropTypes from 'prop-types'

import FormatOptionsForm from '../format-options-form'

import FormStepsNav from '@/components/form-steps-nav'
import ColumnsLists from '@/components/build-output-address/columns-lists'
import SelectInput from '@/components/select-input'
import UnderlineTitle from '@/components/underline-title'

const formatOptions = [
  {value: 'csv', label: 'CSV'},
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
  const {fileColumns, geocodeColumns} = columns
  const [exclusionList, setExclusionList] = useState([])

  const toggleExclusionList = useCallback(column => {
    if (exclusionList.includes(column)) {
      setExclusionList(exclusionList.filter(c => c !== column))
      handleColumns([...fileColumns, ...geocodeColumns].filter(c => !exclusionList.includes(c)))
    } else {
      setExclusionList([...exclusionList, column])
    }
  }, [exclusionList, fileColumns, geocodeColumns, handleColumns])

  const onValidate = () => {
    handleColumns(selectedColumns.filter(c => !exclusionList.includes(c)))
    handleStep(5)
  }

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
        <ColumnsLists
          exclusionList={exclusionList}
          fileColumns={fileColumns}
          geocodeColumns={geocodeColumns}
          selectedColumns={selectedColumns}
          isAllFilesSelected={exclusionList.length === 0}
          onSelect={toggleExclusionList} />
      </section>

      <FormStepsNav previous={() => handleStep(3)} next={onValidate} />

      <style jsx>{`
        .format-select {
          width: fit-content;
        }

        section {
          margin-top: 2em;
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

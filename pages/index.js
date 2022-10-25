import {useState, useCallback, useEffect, useContext} from 'react'
import {concat} from 'lodash'
import {faCircleChevronRight, faCircleChevronLeft} from '@fortawesome/free-solid-svg-icons'
import {previewCsvFromBlob} from '@livingdata/tabular-data-helpers'

import geocodeAddedColumns from '../added-columns'
import ScreenContext from '@/contexts/screen-frame'

import Layout from '@/layouts/main'

import StepsProgress from '@/components/steps-progress'
import FileHandler from '@/components/file-handler'
import BuildAddress from '@/components/build-address'
import Spinner from '@/components/spinner'
import FormatOptionsForm from '@/components/format-options-form'
import ErrorMessage from '@/components/error-message'
import Table from '@/components/table'
import Button from '@/components/button'
import Geocoding from '@/components/geocoding'
import UnderlineTitle from '@/components/underline-title'
import BuildOutputAddress from '@/components/build-output-address'

const Home = () => {
  const {isFrame, screenSize} = useContext(ScreenContext)
  const scrollToTop = () => window.scrollTo(0, 0)

  const [file, setFile] = useState()
  const [preview, setPreview] = useState()
  const [formatOptions, setFormatOptions] = useState({})
  const [previewCount, setPreviewCount] = useState(10)
  const [detectedFormatOptions, setDetectedFormatOptions] = useState()
  const [advancedParams, setAdvancedParams] = useState({})
  const [selectedColumns, setSelectedColumns] = useState([])
  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [step, setStep] = useState(1)

  const [outputFormat, setOutputFormat] = useState()
  const [outputParams, setOutputParams] = useState({})
  const [outputSelectedColumns, setOutputSelectedColumns] = useState([])

  const resetOutputOptions = () => {
    setOutputFormat(null)
    setOutputParams(null)
    setOutputSelectedColumns([])
  }

  const handlePreview = useCallback(async params => {
    setError(null)

    if (file) {
      setIsLoading(true)
      const {formatOptions = {}, previewCount} = params || {}
      const options = {format: 'csv', formatOptions, previewCount}

      try {
        const preview = await previewCsvFromBlob(file, options)
        if (!params) {
          setDetectedFormatOptions(preview.formatOptions)
        }

        if (preview.parseErrors) {
          throw new Error(preview.parseErrors[0])
        }

        setPreview(preview)
        setFormatOptions(preview.formatOptions)
        setPreviewCount(preview.rows.length)
        setSelectedColumns([])
        setStep(2)
      } catch (error) {
        setError(error.message)
      }

      setIsLoading(false)
    }
  }, [file])

  const changeStep = step => {
    setStep(step)
    setError(null)
    scrollToTop()
  }

  useEffect(() => {
    resetOutputOptions()
    handlePreview()
  }, [file, handlePreview])

  const handleParamsValidation = () => {
    const isLatLongComplete = (advancedParams.long && advancedParams.lat) || (!advancedParams.long && !advancedParams.lat)

    setError(null)
    if (isLatLongComplete) {
      setOutputFormat('csv')
      setOutputParams(formatOptions)
      setOutputSelectedColumns(concat(preview.columns, geocodeAddedColumns))
      changeStep(4)
    } else {
      setError('Renseigner la longitude nécessite de renseigner la longitude et vice-versa')
    }
  }

  useEffect(() => {
    window.addEventListener('beforeunload', () => {
      scrollToTop()
    })
  }, [])

  return (
    <Layout isFrame={isFrame} screenSize={screenSize}>
      <div className='container'>
        <StepsProgress step={step} handleStep={setStep} />

        <FileHandler file={file} handleFile={setFile} />

        {step === 2 && (
          <>
            <section>
              <FormatOptionsForm
                previewCount={previewCount}
                formatOptions={formatOptions}
                detectedFormatOptions={detectedFormatOptions}
                submitOptions={handlePreview}
              />

              {error ? (
                <ErrorMessage>Les paramètres sélectionnés ne permettent pas l’analyse du fichier</ErrorMessage>
              ) : (
                <div className='table-container'>
                  <UnderlineTitle>Aperçu du fichier</UnderlineTitle>
                  <Table columns={preview.columns} rows={preview.rows} />
                </div>
              )}

            </section>
            <div className='button-position'>
              <Button
                onClick={() => changeStep(3)}
                label='Aller à l’étape suivante'
                icon={faCircleChevronRight}
              >
                Étape suivante
              </Button>
            </div>
          </>
        )}

        {step === 3 && (
          <>
            <section>
              <BuildAddress
                columns={preview.columns}
                rows={preview.rows}
                selectedColumns={selectedColumns}
                handleColumns={setSelectedColumns}
                handleAdvancedParams={setAdvancedParams}
              />
            </section>

            <div className='submit'>
              <div className='actions-buttons'>
                <Button
                  onClick={() => changeStep(2)}
                  label='Aller à l’étape précédente'
                  icon={faCircleChevronLeft}
                  color='secondary'
                >
                  Étape précédente
                </Button>

                <Button onClick={handleParamsValidation} disabled={selectedColumns.length === 0} icon={faCircleChevronRight}>
                  Étape suivante
                </Button>
              </div>

              {error && <ErrorMessage>{error}</ErrorMessage>}
            </div>
          </>
        )}

        {step === 4 && (
          <BuildOutputAddress
            format={outputFormat}
            params={outputParams}
            detectedParams={detectedFormatOptions}
            columns={{fileColumns: preview.columns, geocodeColumns: geocodeAddedColumns}}
            selectedColumns={outputSelectedColumns}
            handleOutputFormat={setOutputFormat}
            handleParams={setOutputParams}
            handleColumns={setOutputSelectedColumns}
            handleStep={changeStep}
          />
        )}

        {step === 5 && (
          <Geocoding
            file={file}
            outputFormat={outputFormat}
            outputParams={outputParams}
            outputSelectedColumns={outputSelectedColumns}
            handleStep={changeStep}
          />
        )}

        <div className='loading'>
          {isLoading && <Spinner />}
        </div>

        <style jsx>{`
          .container {
            display: flex;
            flex-direction: column;
            gap: 1em;
            padding: 2rem;
          }

          section, .table-container {
            margin-top: 2em;
          }

          .button-position {
            display: flex;
            justify-content: flex-end;
          }

          .loading {
            display: flex;
            align-items: center;
            justify-content: center;
          }

          .actions-buttons {
            margin-top: 1.5em;
            display: flex;
            justify-content: space-between;
          }
        `}
        </style>
      </div>
    </Layout>
  )
}

export default Home

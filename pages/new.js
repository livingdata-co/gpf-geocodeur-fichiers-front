import {useState, useCallback, useEffect, useContext} from 'react'
import {concat} from 'lodash'
import {faArrowAltCircleLeft} from '@fortawesome/free-solid-svg-icons'
import {previewCsvFromBlob} from '@livingdata/tabular-data-helpers'

import geocodeAddedColumns from '../added-columns'
import ScreenContext from '@/contexts/screen-frame'

import {getProjects} from '@/lib/api'

import Layout from '@/layouts/main'

import StepsProgress from '@/components/steps-progress'
import FileHandler from '@/components/file-handler'
import BuildAddress from '@/components/build-address'
import FormatOptionsForm from '@/components/format-options-form'
import ErrorMessage from '@/components/error-message'
import Table from '@/components/table'
import FormStepsNav from '@/components/form-steps-nav'
import Geocoding from '@/components/geocoding'
import UnderlineTitle from '@/components/underline-title'
import BuildOutputAddress from '@/components/build-output-address'
import ButtonLink from '@/components/button-link'
import Loading from '@/components/loading'

const New = () => {
  const {isFrame, screenSize} = useContext(ScreenContext)
  const scrollToTop = () => window.scrollTo(0, 0)

  const [hasConcurrentProject, setHasConcurrentProject] = useState()
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

        if (preview.rows.length === 0) {
          throw new Error('Le fichier ne contient aucune ligne.')
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

  const handleFile = file => {
    setStep(1)
    setFile(file)
  }

  const changeStep = selectedStep => {
    if (selectedStep === 1) {
      setFile()
    }

    setStep(selectedStep)
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

  // Ensure no project is already in progress
  useEffect(() => {
    async function fetchCurrentProject() {
      setIsLoading(true)
      const projects = await getProjects()
      const allStatus = new Set(projects.map(({status}) => status))
      const hasConcurrentProject = allStatus.has('waiting') || allStatus.has('processing')
      setHasConcurrentProject(hasConcurrentProject)

      setIsLoading(false)
    }

    fetchCurrentProject()
  }, [])

  if (hasConcurrentProject === undefined && isLoading) {
    return (
      <Layout isFrame={isFrame} screenSize={screenSize}>
        {isLoading && <Loading label='Chargement…' />}
      </Layout>
    )
  }

  if (hasConcurrentProject) {
    return (
      <Layout isFrame={isFrame} screenSize={screenSize}>
        <ErrorMessage>Un géocodage est déjà en cours. Veuillez attendre ou annuler ce géocodage pour en demander un nouveau.</ErrorMessage>
        <ButtonLink href='/' icon={faArrowAltCircleLeft}>Retour</ButtonLink>
      </Layout>
    )
  }

  return (
    <Layout isFrame={isFrame} screenSize={screenSize}>
      <div className='container'>
        <StepsProgress step={step} handleStep={setStep} />

        <FileHandler file={file} handleFile={handleFile} />

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

            <FormStepsNav next={() => changeStep(3)} />
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
              <FormStepsNav previous={() => changeStep(2)} next={selectedColumns.length > 0 ? handleParamsValidation : null} />
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
            format={preview.format}
            formatOptions={formatOptions}
            addressCompositors={selectedColumns}
            advancedParams={advancedParams}
            outputFormat={outputFormat}
            outputParams={outputParams}
            outputSelectedColumns={outputSelectedColumns}
            handleStep={changeStep}
          />
        )}

        {error && <ErrorMessage>{error}</ErrorMessage>}

        <div className='loading'>
          {isLoading && <Loading label='Chargement du fichier' />}
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

          .loading {
            display: flex;
            align-items: center;
            justify-content: center;
            margin: 0 auto;
          }
        `}
        </style>
      </div>
    </Layout>
  )
}

export default New


import {useState, useCallback, useEffect} from 'react'
import {previewCsvFromBlob, validateCsvFromBlob} from 'table-reader/lib/csv'

import Main from '@/layouts/main'

import StepsProgress from '@/components/steps-progress'
import FileHandler from '@/components/file-handler'
import BuildAddress from '@/components/build-address'
import Spinner from '@/components/spinner'
import ValidationProgress from '@/components/validation-progress'
import FormatOptionsForm from '@/components/format-options-form'
import ErrorMessage from '@/components/error-message'
import Table from '@/components/table'
import Button from '@/components/button'
import StepButton from '@/components/step-button'
import SectionHeader from '@/components/section-header'

const Home = () => {
  const [file, setFile] = useState()
  const [preview, setPreview] = useState()
  const [formatOptions, setFormatOptions] = useState({})
  const [previewCount, setPreviewCount] = useState(10)
  const [detectedFormatOptions, setDetectedFormatOptions] = useState()
  const [advancedParams, setAdvancedParams] = useState({})
  const [selectedColumns, setSelectedColumns] = useState([])
  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [validation, setValidation] = useState()
  const [step, setStep] = useState(1)

  const handlePreview = useCallback(async params => {
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
        setStep(2)
      } catch (error) {
        setError(error.message)
      }

      setIsLoading(false)
    }
  }, [file])

  const handleValidationComplete = useCallback(() => {
    setValidation(null)
    // Lancer le géocodage
    // Étape 4
  }, [])

  const validate = useCallback(() => {
    const validation = validateCsvFromBlob(file, {formatOptions: {...formatOptions, ...advancedParams}})
    validation.addListener('progress', setValidation)
    validation.addListener('complete', handleValidationComplete)
    validation.addListener('error', setError)
  }, [file, formatOptions, advancedParams, handleValidationComplete])

  useEffect(() => {
    handlePreview()
  }, [file, handlePreview])

  return (
    <Main>
      <div className='container'>
        <StepsProgress step={step} handleStep={setStep} />

        {step === 1 ? (
          <>
            <SectionHeader>1 - Déposer un fichier</SectionHeader>
            <FileHandler file={file} handleFile={setFile} />
          </>
        ) : (
          <FileHandler file={file} handleFile={setFile} />
        )}

        {step === 2 && (
          <>
            <SectionHeader step={step} handleStep={setStep} stepType='next'>
              2 - Aperçu du fichier et vérification de l’encodage
            </SectionHeader>

            <FormatOptionsForm
              previewCount={previewCount}
              formatOptions={formatOptions}
              detectedFormatOptions={detectedFormatOptions}
              submitOptions={handlePreview}
            />

            {error ? (
              <ErrorMessage>Les paramètres sélectionnés ne permettent pas l’analyse du fichier</ErrorMessage>
            ) : (
              <Table columns={preview.columns} rows={preview.rows} step={step} handleStep={setStep} />
            )}

            <StepButton stepType='next' handleStep={setStep} step={step} />
          </>
        )}

        {step === 3 && (
          <>
            <SectionHeader step={step} handleStep={setStep} stepType='previous'>
              3 - Construire les adresses
            </SectionHeader>

            <BuildAddress
              columns={preview.columns}
              rows={preview.rows}
              previewCount={previewCount}
              selectedColumns={selectedColumns}
              handleColumns={setSelectedColumns}
              handleAdvancedParams={setAdvancedParams}
            />

            <div className='submit'>
              <Button onClick={validate}>Lancer le géocodage</Button>
            </div>
          </>
        )}

        <div className='loading'>
          {isLoading && <Spinner />}
        </div>

        {validation && <ValidationProgress {...validation} />}

        <style jsx>{`
          .container {
            display: flex;
            flex-direction: column;
            gap: 1em;
            padding: 2rem;
          }

          .loading {
            display: flex;
            align-items: center;
            justify-content: center;
          }

          .submit {
            display: flex;
            justify-content: center;
          }
        `}
        </style>
      </div>
    </Main>
  )
}

export default Home

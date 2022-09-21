import {useState, useCallback, useEffect} from 'react'
import {previewCsvFromBlob, validateCsvFromBlob} from 'table-reader/lib/csv'

import Main from '@/layouts/main'

import StepsProgress from '@/components/steps-progress'
import FileHandler from '@/components/file-handler'
import FilePreview from '@/components/file-preview'
import Spinner from '@/components/spinner'
import ValidationProgress from '@/components/validation-progress'

const Home = () => {
  const [file, setFile] = useState()
  const [preview, setPreview] = useState()
  const [detectedFormatOptions, setDetectedFormatOptions] = useState()
  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [validation, setValidation] = useState()

  const handlePreview = useCallback(async params => {
    if (file) {
      setIsLoading(true)
      const {formatOptions = {}, previewCount = 10} = params || {}
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
      } catch (error) {
        setError(error.message)
      }

      setIsLoading(false)
    }
  }, [file])

  const handleValidationComplete = useCallback(() => {
    setValidation(null)
    // Lancer le géocodage
  }, [])

  const validate = useCallback(options => {
    const validation = validateCsvFromBlob(file, options)
    validation.addListener('progress', setValidation)
    validation.addListener('complete', handleValidationComplete)
    validation.addListener('error', setValidation)
  }, [file, handleValidationComplete])

  useEffect(() => {
    handlePreview()
  }, [file, handlePreview])

  return (
    <Main>
      <div className='container'>
        <StepsProgress file={file} preview={preview} />

        <FileHandler file={file} handleFile={setFile} />

        <div className='loading'>
          {isLoading && <Spinner />}
        </div>

        {preview && <FilePreview {...preview} detectedFormatOptions={detectedFormatOptions} error={error} updatePreview={handlePreview} handleSubmit={validate} />}

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
        `}
        </style>
      </div>
    </Main>
  )
}

export default Home

import PropTypes from 'prop-types'
import {useEffect, useState} from 'react'

import SectionHeader from '../section-header'
import {formatFileSize} from '@/lib/file'

import DropzoneContainer from '@/components/file-handler/dropzone-container'

const FILE_MAX_SIZE = 50 * 1024 * 1024
const acceptedFormats = {
  'text/plain': ['.txt'],
  'text/csv': ['.csv', '.tsv']
}
const acceptedExtension = [...Object.values(acceptedFormats)]

const ERROR_LABEL = {
  'too-many-files': 'Vous ne pouvez déposer qu’un seul fichier.',
  'file-invalid-type': `Ce type de fichier n’est pas supporté. Vous devez déposer un fichier au format ${acceptedExtension.join(', ')}.`,
  'file-too-large': `Ce fichier est trop volumineux. Vous devez déposer un fichier de moins de ${formatFileSize(FILE_MAX_SIZE, {round: true})}.`,
  'file-too-small': 'Ce fichier est vide.',
}

const FileHandler = ({file, handleFile}) => {
  const [error, setError] = useState()

  const handleDropRejected = rejectedFiles => {
    const [rejectedFile] = rejectedFiles
    const [error] = rejectedFile.errors
    const label = ERROR_LABEL[error.code]

    setError(label || `Impossible de déposer ce fichier : ${error.message} (${error.code})`)
  }

  const handleDrop = fileList => {
    const [droppedFile] = fileList

    if (droppedFile) {
      setError(null)
      handleFile(droppedFile)
    }
  }

  useEffect(() => {
    if (error) {
      handleFile(null)
    }
  }, [error, handleFile])

  return (
    <section>
      <SectionHeader>1 - Déposer un fichier</SectionHeader>
      <DropzoneContainer
        file={file}
        maxSize={FILE_MAX_SIZE}
        error={error}
        onFileDrop={handleDrop}
        onFileDropRejected={handleDropRejected}
      />
    </section>
  )
}

FileHandler.propTypes = {
  file: null
}

FileHandler.propTypes = {
  file: PropTypes.object,
  handleFile: PropTypes.func.isRequired
}

export default FileHandler

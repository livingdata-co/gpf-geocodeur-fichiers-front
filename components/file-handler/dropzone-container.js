import {useState} from 'react'
import PropTypes from 'prop-types'
import Image from 'next/image'
import Dropzone from 'react-dropzone'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faRotate} from '@fortawesome/free-solid-svg-icons'

import {formatFileSize} from '@/lib/file'

import theme from '@/styles/theme'

import FileDetails from '@/components/file-details'
import Spinner from '@/components/spinner'

const DropzoneContainer = ({file, isLoading, maxSize, error, onFileDrop, onFileDropRejected}) => {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <div className='dropzone-wrapper'>
      <div className='file-handler-container'>
        <Dropzone
          onDrop={onFileDrop}
          onDropRejected={onFileDropRejected}
          multiple={false}
          maxSize={maxSize}
          minSize={1}
          accept={{'text/plain': ['.txt'], 'text/csv': ['.csv', '.tsv']}}
        >
          {({getRootProps, getInputProps, isDragActive}) => {
            const rootProps = getRootProps()
            const inputProps = getInputProps()

            return (
              <div
                {...rootProps}
                className={`dropzone ${file ? 'file' : ''} ${isDragActive ? 'active' : ''}`}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
              >
                <input {...inputProps} />
                {!file && (
                  <div>
                    <Image src='/images/drop-icon.png' height={80} width={80} alt='Glisser un fichier ou l’ajouter en cliquant sur la zone' />
                  </div>
                )}
                <div className='file-container'>{file ? (
                  <div className='file-sumup'>
                    <FileDetails name={file.name} size={file.size} />
                    {isLoading ? (
                      <div className='loading'>
                        Chargement du fichier… <span><Spinner alt aria-hidden='true' /></span>
                      </div>
                    ) : (
                      <div style={{
                        display: isHovered || isDragActive ? 'block' : 'none',
                        margin: '0 1em'
                      }}
                      ><FontAwesomeIcon icon={faRotate} size='2x' />
                      </div>
                    )}
                  </div>
                ) : `Sélectionner ou glisser ici votre fichier à géocoder au format CSV (maximum ${formatFileSize(maxSize, {round: true})})`}
                </div>
              </div>
            )
          }}
        </Dropzone>
      </div>

      {error && (
        <p className='error'>{error}</p>
      )}

      <style jsx>{`
        .dropzone-wrapper {
          width: 100%;
        }

        .file-handler-container {
          display: flex;
          flex-direction: column;
          align-items: center;
          width: 100%;
        }

        .dropzone {
          display: flex;
          flex-flow: column;
          justify-content: center;
          width: 100%;
          border: 5px dashed ${theme.borderSecondary};
          height: 200px;
          text-align: center;
          cursor: pointer;
          border-radius: ${file ? '' : '10px'};
          box-sizing: border-box;
        }

        .dropzone:hover {
          background-color: ${theme.bkgLight};
          border-color: ${theme.borderDark};
        }

        .dropzone.file {
          display: flex;
          flex-flow: column;
          height: auto;
          border: none;
        }

        .file-container {
          width: 100%;
        }

        .file-sumup {
          min-height: 70px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          text-align: left;
          background: ${theme.bkgSecondary};
          color: #fff;
          padding: 0 1em;
          border-radius: 3px;
        }

        .active {
          background-color: ${theme.backgroundColor};
        }

        .loading {
          display: flex;
          align-items: center;
          justify-content: space-between;
          font-style: italic;
        }

        .loading span {
          margin-left: 1em;
        }

        .error {
          color: red;
          margin-top: 1em;
        }
      `}
      </style>
    </div>
  )
}

DropzoneContainer.defaultProps = {
  file: null,
  error: null,
  isLoading: false,
  onSubmit: null
}

DropzoneContainer.propTypes = {
  file: PropTypes.object,
  maxSize: PropTypes.number.isRequired,
  error: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.instanceOf(Error)
  ]),
  isLoading: PropTypes.bool,
  onFileDrop: PropTypes.func.isRequired,
  onFileDropRejected: PropTypes.func.isRequired,
  onSubmit: PropTypes.func
}

export default DropzoneContainer

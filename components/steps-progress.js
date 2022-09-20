import PropTypes from 'prop-types'

import colors from '@/styles/colors'

const {useMemo} = require('react')

const STEPS = {
  1: 'Dépôt du fichier',
  2: 'Aperçu du fichier et vérification de l’encodage',
  3: 'Construire les adresses',
  4: 'Géocodage'
}
const STEP_COUNT = Object.keys(STEPS).length

const StepsProgress = ({file, preview, columns}) => {
  const currentStep = useMemo(() => {
    let step = 1
    if (file) {
      step = 2
      if (preview && !preview.parseErrors) {
        step = 3
      }

      if (columns) {
        step = 4
      }
    }

    return step
  }, [file, preview, columns])

  return (
    <div className='container'>
      <div>Étape {currentStep} sur {STEP_COUNT}</div>
      <h3>{STEPS[currentStep]}</h3>
      <div className='progress'>
        {Object.keys(STEPS).map((step, idx) => <div key={step} className={`step ${idx < currentStep ? 'active' : ''}`} />)}
      </div>
      {STEPS[currentStep + 1] && <div className='next-step'>Étape suivante : {STEPS[currentStep + 1]}</div>}

      <style jsx>{`
        .progress {
            display: grid;
            grid-template-columns: repeat(${STEP_COUNT}, 1fr);
            gap: 1em;
        }

        h4 {
          margin-bottom: .5em;
        }

        .step {
            height: 10px;
            background: ${colors.lightGrey};
        }

        .step.active {
            background: ${colors.blue};
        }

        .next-step {
          font-weight: 100;
        }
        `}
      </style>
    </div>
  )
}

StepsProgress.defaultProps = {
  file: null,
  preview: null,
  columns: null
}

StepsProgress.propTypes = {
  file: PropTypes.object,
  preview: PropTypes.object,
  columns: PropTypes.array
}

export default StepsProgress


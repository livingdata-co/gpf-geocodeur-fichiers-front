import PropTypes from 'prop-types'

import theme from '@/styles/theme'

const STEPS = {
  1: 'Dépôt du fichier',
  2: 'Aperçu du fichier et vérification de l’encodage',
  3: 'Construire les adresses',
  4: 'Paramétrer le fichier de sortie',
  5: 'Géocodage'
}
const STEP_COUNT = Object.keys(STEPS).length

const StepsProgress = ({step}) => (
  <div className='container'>
    <div>Étape {step} sur {STEP_COUNT}</div>
    <div className='step-label'>{STEPS[step]}</div>
    <div className='progress'>
      {Object.keys(STEPS).map((stepLabel, idx) => <div key={stepLabel} className={`step ${idx < step ? 'active' : ''}`} />)}
    </div>
    {STEPS[step + 1] && <div className='next-step'>Étape suivante : {STEPS[step + 1]}</div>}

    <style jsx>{`
        .progress {
            display: grid;
            grid-template-columns: repeat(${STEP_COUNT}, 1fr);
            gap: 1em;
            margin-bottom: 5px;
        }

        .step-label {
          margin: 1em 0;
          font-weight: bold;
        }

        .step {
            height: 10px;
            background: ${theme.bkgDisable};
        }

        .step.active {
            background: ${theme.bkgPrimary};
        }
        `}
    </style>
  </div>
)

StepsProgress.propTypes = {
  step: PropTypes.number.isRequired
}

export default StepsProgress

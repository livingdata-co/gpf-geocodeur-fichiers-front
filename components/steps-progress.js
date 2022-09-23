import PropTypes from 'prop-types'

import colors from '@/styles/colors'

const STEPS = {
  1: 'Dépôt du fichier',
  2: 'Aperçu du fichier et vérification de l’encodage',
  3: 'Construire les adresses',
  4: 'Géocodage'
}
const STEP_COUNT = Object.keys(STEPS).length

const StepsProgress = ({step}) => (
  <div className='container'>
    <div>Étape {step} sur {STEP_COUNT}</div>
    <h3>{STEPS[step]}</h3>
    <div className='progress'>
      {Object.keys(STEPS).map((stepLabel, idx) => <div key={stepLabel} className={`step ${idx < step ? 'active' : ''}`} />)}
    </div>
    {STEPS[step + 1] && <div className='next-step'>Étape suivante : {STEPS[step + 1]}</div>}

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

StepsProgress.propTypes = {
  step: PropTypes.number.isRequired
}

export default StepsProgress

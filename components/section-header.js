import PropTypes from 'prop-types'
import {faCircleChevronRight, faCircleChevronLeft} from '@fortawesome/free-solid-svg-icons'

import colors from '@/styles/colors'

import Button from '@/components/button'

const SectionHeader = ({stepType, handleStep, children}) => {
  const isNext = stepType && stepType === 'next'

  return (
    <div className='section-header'>
      <h2>{children}</h2>

      {stepType && (
        <Button
          onClick={handleStep}
          icon={isNext ? faCircleChevronRight : faCircleChevronLeft}
          label={isNext ? 'Passer à l’étape suivante' : 'Revenir à l’étape précédente'}
        >
          {isNext ? 'Étape suivante' : 'Étape précédente'}
        </Button>
      )}

      <style jsx>{`
        .section-header {
          display: grid;
          grid-template-columns: 1fr auto;
          align-items: center;
        }

        h2 {
          font-weight: 600;
          color: ${colors.lightBlue};
          margin: 0.4em 0;
        }
      `}
      </style>
    </div>
  )
}

SectionHeader.defaultProps = {
  stepType: null
}

SectionHeader.propTypes = {
  stepType: PropTypes.oneOf([
    'next',
    'previous'
  ]),
  handleStep: PropTypes.func,
  children: PropTypes.string.isRequired
}

export default SectionHeader

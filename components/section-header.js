import PropTypes from 'prop-types'

import colors from '@/styles/colors'

import NextButton from '@/components/next-button'
import PreviousButton from '@/components/previous-button'

const SectionHeader = ({step, stepType, handleStep, children}) => {
  const StepButton = stepType && (stepType === 'next' ? NextButton : PreviousButton)

  return (
    <div className='section-header'>
      <h2>{children}</h2>
      {step && <StepButton handleStep={handleStep} step={step} />}

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
  step: null,
  stepType: null
}

SectionHeader.propTypes = {
  step: PropTypes.number,
  stepType: PropTypes.string,
  handleStep: PropTypes.func,
  children: PropTypes.string.isRequired
}

export default SectionHeader

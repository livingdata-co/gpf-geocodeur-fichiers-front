import PropTypes from 'prop-types'
import {faCircleChevronLeft, faCircleChevronRight} from '@fortawesome/free-solid-svg-icons'

import Button from '@/components/button'

const FormStepsNav = ({previous, next, children}) => (
  <div className='nav-buttons'>
    {previous ? (
      <Button
        onClick={previous}
        label='Étape précédente'
        icon={faCircleChevronLeft}
        color='secondary'
      >
        Étape précédente
      </Button>
    ) : <div />}

    {children || (
      <Button onClick={next} disabled={!next} icon={faCircleChevronRight} isIconAfter>
        Étape suivante
      </Button>
    )}

    <style jsx>{`
      .nav-buttons {
          display: flex;
          width: 100%;
          justify-content: space-between;
          flex-wrap: no-wrap;
          gap: 1em;
          margin: 1.5em 0;
        }
      `}</style>
  </div>
)

FormStepsNav.defaultProps = {
  previous: null,
  next: null,
  children: null
}

FormStepsNav.propTypes = {
  previous: PropTypes.func,
  next: PropTypes.func,
  children: PropTypes.node
}

export default FormStepsNav

import PropTypes from 'prop-types'

import Spinner from '@/components/spinner'

const Loading = ({label}) => (
  <div className='loading'>
    <Spinner />
    {label && <label>{label}</label>}

    <style jsx>{`
        .loading {
            display: flex;
            flex-direction: column;
            align-items: center;
            margin: auto;
            height: 100%;
            justify-content: center;
        }

        label {
            margin-top: 1em;
        }
        `}</style>
  </div>
)

Loading.defaultProps = {
  label: null
}

Loading.propTypes = {
  label: PropTypes.string
}

export default Loading

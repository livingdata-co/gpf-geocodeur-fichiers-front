import PropTypes from 'prop-types'

import theme from '@/styles/theme'

const Loader = ({label}) => (
  <>
    <p className='loader'>{label} <span>.</span><span>.</span><span>.</span></p>

    <style jsx>{`
      @keyframes blink {
        0% {
          opacity: .2;
        }
        20% {
          opacity: 1;
        }
        100% {
          opacity: .2;
        }
      }

      .loader {
        font-size: 16px;
        color: ${theme.txtColor};
        font-weight: bold;
      }

      .loader span {
        font-style: normal;
        color: ${theme.txtColor};
        font-size: 20px;
        animation-name: blink;
        animation-duration: 1.2s;
        animation-iteration-count: infinite;
        animation-fill-mode: both;
      }

      .loader span:nth-child(2) {
        animation-delay: .1s;
      }

      .loader span:nth-child(3) {
        animation-delay: .3s;
      }
    `}</style>
  </>
)

Loader.propTypes = {
  label: PropTypes.string
}

Loader.defaultProps = {
  label: null
}

export default Loader

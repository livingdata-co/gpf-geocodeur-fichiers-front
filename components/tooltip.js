import PropTypes from 'prop-types'

const Tooltip = ({content, children}) => (
  <div className='tooltip'>
    {children}<span className='tooltiptext'>{content}</span>
    <style jsx>{`
          .tooltip {
            position: relative;
            display: inline-block;
            border-bottom: 1px dotted black;
        }

        .tooltip .tooltiptext {
            visibility: hidden;
            width: 120px;
            background-color: black;
            color: #fff;
            text-align: center;
            border-radius: 6px;
            padding: 5px 0;
            
            /* Position the tooltip */
            position: absolute;
            z-index: 1;
            bottom: 100%;
            left: 50%;
            margin-left: -60px;
        }

        .tooltip:hover .tooltiptext {
            visibility: visible;
        }
    `}</style>
  </div>
)

Tooltip.propTypes = {
  content: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired
}

export default Tooltip

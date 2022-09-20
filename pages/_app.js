import React from 'react'
import PropTypes from 'prop-types'

import '@/styles/globals.css'
import '@fortawesome/fontawesome-svg-core/styles.css'

// Prepare icons lib
import {config} from '@fortawesome/fontawesome-svg-core'

config.autoAddCss = false // Tell Font Awesome to skip adding the CSS automatically since it's being imported above

const App = ({Component, pageProps}) => (
  <React.StrictMode>
    <Component {...pageProps} />
  </React.StrictMode>
)

App.propTypes = {
  Component: PropTypes.any.isRequired,
  pageProps: PropTypes.object.isRequired,
}

export default App


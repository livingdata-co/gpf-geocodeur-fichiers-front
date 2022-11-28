import React from 'react'
import PropTypes from 'prop-types'

import '@/styles/globals.css'
import '@fortawesome/fontawesome-svg-core/styles.css'

import {config} from '@fortawesome/fontawesome-svg-core'

import {ScreenFrameContextProvider} from '@/contexts/screen-frame'

// Prepare icons lib
config.autoAddCss = false // Tell Font Awesome to skip adding the CSS automatically since it's being imported above

const App = ({Component, pageProps}) => (
  <React.StrictMode>
    <ScreenFrameContextProvider>
      <Component {...pageProps} />
    </ScreenFrameContextProvider>
  </React.StrictMode>
)

App.propTypes = {
  Component: PropTypes.any.isRequired,
  pageProps: PropTypes.object.isRequired
}

export default App


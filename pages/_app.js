import React from 'react'
import PropTypes from 'prop-types'

import '@/styles/globals.css'

// Prepare icons lib
import {library} from '@fortawesome/fontawesome-svg-core'
import {faFile, faPlus, faMinus, faArrowsRotate} from '@fortawesome/free-solid-svg-icons'

library.add(faFile, faPlus, faMinus, faArrowsRotate)

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


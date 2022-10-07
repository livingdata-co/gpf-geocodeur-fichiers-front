import React from 'react'
import PropTypes from 'prop-types'
import Head from 'next/head'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faFaceSadTear} from '@fortawesome/free-solid-svg-icons'

import Header from '@/components/header'
import theme from '@/styles/theme'

class Layout extends React.Component {
  static propTypes = {
    isFrame: PropTypes.bool.isRequired,
    screenSize: PropTypes.number,
    children: PropTypes.node
  }

  static defaultProps = {
    children: null,
    screenSize: null
  }

  render() {
    const {isFrame, screenSize, children} = this.props

    return (
      <>
        <Head>
          <title>Géocodeur</title>
          <meta name='description' content='Géocodeur de fichiers d’adresses de la GéoPlateforme' />
          <meta name='viewport' content='width=device-width, initial-scale=1' />
        </Head>

        {!isFrame && <Header />}

        <main>
          <React.StrictMode>
            {isFrame && screenSize <= 320 ? (
              <div className='too-small-screen'>
                <FontAwesomeIcon icon={faFaceSadTear} size='3x' />
                Le géocodeur de fichier n’est pas adapté à cette taille d’écran
              </div>
            ) : (
              children
            )}
          </React.StrictMode>
        </main>

        <style jsx>{`
          main {
            flex: 1;
          }

          .too-small-screen {
            font-weight: bold;
            height: 100%;
            width: 100%;
            display: flex;
            flex-direction: column;
            justify-content: center;
            gap: 1em;
            text-align: center;
            color: ${theme.error};
          }
        `}
        </style>
      </>
    )
  }
}

export default Layout

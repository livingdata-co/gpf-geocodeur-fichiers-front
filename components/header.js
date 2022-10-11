import PropTypes from 'prop-types'
import Image from 'next/image'

import colors from '@/styles/colors'

const Header = ({isFrame}) => (
  <header>
    {isFrame ? (
      <div className='iframe-header'>
        <Image src='/images/marianne.png' width={123} height={45} layout='fixed' />
        <h1 className='iframe-title'>Géocodeur de fichiers</h1>
      </div>

    ) : (
      <div className='header-container'>
        <div className='logo-container'>
          <Image src='/images/logo-ign.png' width={130} height={138} layout='fixed' />
        </div>
        <div className='title'>
          <h1>Géocodeur de fichiers</h1>
        </div>
      </div>
    )}

    <style jsx>{`
      header {
        min-height: ${isFrame ? 50 : 200}px;
        width: 100vw;
        background-color: ${colors.darkBlue};
        color: #fff;
        padding: 1em;
      }

      .iframe-header {
        display: flex;
        align-items: end;
        gap: 1em;
      }

      .iframe-title {
        font-size: 1em;
        margin: 0;
      }

      .container {
        display: flex;
        flex-flow: wrap;
        height: 100%;
        justify-content: space-between;
        align-items: center;
        padding: 0 2em;
      }

      .logo-container {
        position: relative;
        display: flex;
        justify-content: center;
        align-content: center;
        border-radius: 10px;
        background-color: #fff;
        padding: 4px;
      }

      .title {
        width: 35%;
        text-align: end;
        border-bottom: 4px solid;
      }

      h1 {
        text-transform: uppercase;
      }
    `}
    </style>
  </header>
)

Header.propTypes = {
  isFrame: PropTypes.bool.isRequired
}

export default Header

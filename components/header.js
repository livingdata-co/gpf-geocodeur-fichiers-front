import PropTypes from 'prop-types'
import Link from 'next/link'
import Image from 'next/image'

import theme from '@/styles/theme'

const Header = ({isFrame, isMobile}) => (
  <header>
    <Link href='/'>
      {isFrame || isMobile ? (
        <div className='iframe-header'>
          <Image src='/images/marianne.png' width={123} height={45} layout='fixed' />
          <h1 className='iframe-title'>Géocodeur de fichiers</h1>
        </div>
      ) : (
        <div className='header-container'>
          <Image src='/images/repfr_logo.png' width={114} height={100} layout='fixed' />
          <h1>Géocodeur de fichiers</h1>
        </div>
      )}
    </Link>

    <style jsx>{`
      header {
        min-height: ${isFrame || isMobile ? '50px' : ''};
        width: 100vw;
        border-bottom: 1px solid ${theme.borderLight};
      }

      .header-container {
        display: flex;
        align-items: flex-end;
        width: fit-content;
        gap: 2em;
        border-right: 1px solid ${theme.borderLight};
        padding: 1em;
        cursor: pointer;
      }

      .iframe-header {
        display: flex;
        align-items: end;
        gap: 1em;
        cursor: pointer;
      }

      .iframe-title {
        font-size: 1em;
        margin: 0;
      }
    `}
    </style>
  </header>
)

Header.propTypes = {
  isFrame: PropTypes.bool.isRequired,
  isMobile: PropTypes.bool.isRequired
}

export default Header

import Image from 'next/image'

import colors from '@/styles/colors'

const Header = () => (
  <header>
    <div className='container'>
      <div className='logo-container'>
        <Image src='/images/logo-ign.png' width={130} height={138} layout='fixed' />
      </div>
      <div className='title'>
        <h1>Géocodeur</h1>
      </div>
    </div>

    <style jsx>{`
      header {
        min-height: 200px;
        width: 100vw;
        background-color: ${colors.darkBlue};
        color: #fff;
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

export default Header

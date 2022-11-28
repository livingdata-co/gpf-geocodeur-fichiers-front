import {useContext} from 'react'

import {faArrowAltCircleLeft} from '@fortawesome/free-regular-svg-icons'
import ScreenContext from '@/contexts/screen-frame'

import Layout from '@/layouts/main'
import theme from '@/styles/theme'
import ButtonLink from '@/components/button-link'

const Home = () => {
  const {isFrame, screenSize} = useContext(ScreenContext)

  return (
    <Layout isFrame={isFrame} screenSize={screenSize}>
      <div className='container'>
        <h1>Erreur 404 - Page introuvable</h1>
        <ButtonLink href='/' icon={faArrowAltCircleLeft}>Retour à l’acceuil</ButtonLink>
      </div>

      <style jsx>{`
          .container {
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            width: 100%;
            height: 50vh;
          }

          h1  {
            width: fit-content;
            border-bottom: solid 5px ${theme.borderDark};
            margin: 1em 0;
        }
        `}
      </style>
    </Layout>
  )
}

export default Home

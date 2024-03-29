import {useState} from 'react'
import {Resizable} from 're-resizable'

const ROOT_URL = process.env.NEXT_PUBLIC_ROOT_URL

const Iframe = () => {
  const [size, setSize] = useState({width: 1428, height: 774})

  const getSize = resizeEvent => {
    const {clientY, clientX} = resizeEvent
    setSize({width: clientX, height: clientY})
  }

  return (
    <>
      <div>{`hauteur : ${size.height} x largeur : ${size.width}`}</div>
      <Resizable defaultSize={size} onResize={e => getSize(e)}>
        <iframe src={ROOT_URL} width='100%' height='100%' sandbox />
      </Resizable>
    </>
  )
}

export default Iframe

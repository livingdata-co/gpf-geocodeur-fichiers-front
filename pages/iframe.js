import {useState} from 'react'
import {Resizable} from 're-resizable'

const Iframe = () => {
  const [size, setSize] = useState({width: 200, height: 200})

  const getSize = resizeEvent => {
    const {clientY, clientX} = resizeEvent
    setSize({width: clientX, height: clientY})
  }

  return (
    <>
      <div>{`hauteur : ${size.height} x largeur : ${size.width}`}</div>
      <Resizable defaultSize={size} onResize={e => getSize(e)}>
        <iframe src='http://localhost:3000' width='100%' height='100%' sandbox />
      </Resizable>
    </>
  )
}

export default Iframe

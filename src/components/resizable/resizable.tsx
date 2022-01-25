import './resizable.css'
import { useEffect, useState } from 'react'
import { ResizableBox, ResizableBoxProps } from 'react-resizable'

interface ResizableProps {
  direction: 'horizontal' | 'vertical'
}

const Resizable: React.FC<ResizableProps> = ({ direction, children }) => {
  let resizableProps: ResizableBoxProps

  const [innerHeight, setInnerHeight] = useState(window.innerHeight)
  const [innerWidth, setInnerWidth] = useState(window.innerWidth)

  useEffect(() => {
    let timer: any

    const listener = () => {
      // debounce resize, prevent lag
      if (timer) {
        clearTimeout(timer)
      }
      timer = setTimeout(() => {
        setInnerHeight(window.innerHeight)
        setInnerWidth(window.innerWidth)
      }, 100)
    }
    window.addEventListener('resize', listener)

    return () => {
      window.removeEventListener('resize', listener)
    }
  }, [])

  if (direction === 'horizontal') {
    // Horizontal resizer props
    resizableProps = {
      className: 'resize-horizontal',
      maxConstraints: [innerWidth * 0.75, Infinity],
      minConstraints: [innerWidth * 0.2, Infinity],
      height: Infinity,
      width: innerWidth * 0.75,
      resizeHandles: ['e'],
    }
  } else {
    // Vertical resizer props
    resizableProps = {
      maxConstraints: [Infinity, innerHeight * 0.9],
      minConstraints: [Infinity, 36],
      height: 300,
      width: Infinity,
      resizeHandles: ['s'],
    }
  }

  return <ResizableBox {...resizableProps}>{children}</ResizableBox>
}

export default Resizable

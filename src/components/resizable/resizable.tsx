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
  // state to synchronize width on resize of browser window
  const [width, setWidth] = useState(window.innerWidth * 0.75)

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

        // prevent resizing browser window beyond dimensions of preview
        if (window.innerWidth * 0.75 < width) {
          setWidth(window.innerWidth * 0.75)
        }
      }, 100)
    }
    window.addEventListener('resize', listener)

    return () => {
      window.removeEventListener('resize', listener)
    }
  }, [width])

  if (direction === 'horizontal') {
    // Horizontal resizer props
    resizableProps = {
      className: 'resize-horizontal',
      maxConstraints: [innerWidth * 0.75, Infinity],
      minConstraints: [innerWidth * 0.2, Infinity],
      height: Infinity,
      width,
      resizeHandles: ['e'],
      onResizeStop: (event, data) => {
        setWidth(data.size.width)
      },
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

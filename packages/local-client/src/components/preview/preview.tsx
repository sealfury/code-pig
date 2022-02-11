import './preview.css'
import { useEffect, useRef } from 'react'

interface PreviewProps {
  code: string
  bundleErr: string
}

const html = /*html*/ `
    <html>
      <head>
        <style>html { background-color: #f2fffe; };</style>
      </head>
      <body>
        <div id="root"></div>
        <script>
            const handleError = (err) => {
              const root = document.querySelector('#root')
                root.innerHTML = 
                  '<div style="color: #ff0d5d;"><h3>Runtime Error</h3>' + err + '</div>'
                console.error(err)
            }

            window.addEventListener('error', (event) => {
              event.preventDefault()
              handleError(event.error)
            })

            window.addEventListener('message', (event) => {
              try {
                eval(event.data)
              } catch (err) {
                handleError(err)
              }
            }, false)
        </script>
      </body>
    </html>
  `

const Preview: React.FC<PreviewProps> = ({ code, bundleErr }) => {
  const iframe = useRef<any>()

  useEffect(() => {
    // reset contents of iframe after submit
    iframe.current.srcdoc = html
    // give event listener time to set up
    setTimeout(() => {
      iframe.current.contentWindow.postMessage(code, '*')
    }, 50)
  }, [code])

  return (
    <div className='preview-wrapper'>
      <iframe
        style={{ backgroundColor: 'white' }}
        title='preview'
        ref={iframe}
        sandbox='allow-scripts'
        srcDoc={html}
      />
      {bundleErr && <div className='preview-error'>{bundleErr}</div>}
    </div>
  )
}

export default Preview

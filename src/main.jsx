import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

const rootElement = document.getElementById('root')
const root = createRoot(rootElement)

// Simple client-side routing to load Sanity Studio dynamically
if (window.location.pathname.startsWith('/studio')) {
  // Dynamically import Sanity Studio to avoid bloating the main app bundle
  import('sanity').then(({ Studio }) => {
    import('./studio/sanity.config.js').then(({ default: config }) => {
      // Create a full-page container for Studio
      rootElement.style.height = '100vh'
      rootElement.style.width = '100vw'
      rootElement.style.margin = '0'
      rootElement.style.padding = '0'
      rootElement.style.position = 'absolute'
      rootElement.style.top = '0'
      rootElement.style.left = '0'
      
      root.render(
        <StrictMode>
          <Studio config={config} />
        </StrictMode>
      )
    })
  })
} else {
  // Render the main Scout Wizard app
  root.render(
    <StrictMode>
      <App />
    </StrictMode>
  )
}

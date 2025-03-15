import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import { ThemeProvider } from './components/ThemeProvider.tsx'
import { TextProvider } from './components/TextProvider.tsx'
import './index.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider>
      <TextProvider>
        <App />
      </TextProvider>
    </ThemeProvider>
  </StrictMode>,
)

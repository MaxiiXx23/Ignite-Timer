import { ThemeProvider } from 'styled-components'
import { BrowserRouter } from 'react-router-dom'

import { defaultTheme } from './styles/themes/default'
import { GlobalCss } from './globalCss'
import { RouterApp } from './routes/index.routes'
import { CyclesContextProvider } from './contexts/CyclesContextProvider'

export function App() {
  return (
    <ThemeProvider theme={defaultTheme}>
      <GlobalCss />
      <BrowserRouter>
        <CyclesContextProvider>
          <RouterApp />
        </CyclesContextProvider>
      </BrowserRouter>
    </ThemeProvider>
  )
}

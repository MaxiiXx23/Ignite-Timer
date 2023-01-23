import { ThemeProvider } from 'styled-components'
import { BrowserRouter } from 'react-router-dom'

import { defaultTheme } from './styles/themes/default'
import { GlobalCss } from './globalCss'
import { RouterApp } from './routes/index.routes'

export function App() {
  return (
    <ThemeProvider theme={defaultTheme}>
      <GlobalCss />
      <BrowserRouter>
        <RouterApp />
      </BrowserRouter>
    </ThemeProvider>
  )
}

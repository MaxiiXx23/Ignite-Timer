import { createGlobalStyle } from 'styled-components'

export const GlobalCss = createGlobalStyle`
    * {
        box-sizing: border-box;
        padding: 0;
        margin: 0;
    }

    :focus {
        outline: 0;
        box-shadow: 0 0 0 2px ${({ theme }) => theme['gray-500']};
    }

    body {
        background-color: ${({ theme }) => theme['gray-900']};
        color: ${({ theme }) => theme['gray-300']};
    }

    body, input, textarea, button {
        font-family: 'Roboto', sans-serif;
        font-weight: 400;
        font-size: 1rem;
        -webkit-font-smoothing: antialiased;
    }
`

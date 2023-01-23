import styled from 'styled-components'

export type TypeVariants = 'primary' | 'secondary' | 'danger' | 'success'

interface IButtonContainer {
  variant: TypeVariants
}

const buttonVariants = {
  primary: '#9333ea',
  secondary: '#8b5cf6',
  danger: '#e11d48',
  success: '#22c55e',
}

export const ButtonContainer = styled.button<IButtonContainer>`
  background-color: ${({ variant }) => {
    return buttonVariants[variant]
  }};
  color: ${({ theme }) => theme['gray-500']};
`

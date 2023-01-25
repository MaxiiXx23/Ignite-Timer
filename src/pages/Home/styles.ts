import styled from 'styled-components'

export const HomeContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  form {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 3.5rem;
  }
`

export const BaseButton = styled.button`
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 1.25rem;
  width: 100%;
  border-radius: 8px;
  border: 0;
  color: ${({ theme }) => theme['gray-100']};
  font-weight: bold;

  &:focus {
    box-shadow: none;
  }
`

export const StartCountDownButton = styled(BaseButton)`
  background: ${({ theme }) => theme['green-500']};

  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }

  &:not(:disabled):hover {
    background: ${({ theme }) => theme['green-700']};
    transition: 0.5s;
  }
`
export const StopCountDownButton = styled(BaseButton)`
  background: ${({ theme }) => theme['red-500']};

  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }

  &:not(:disabled):hover {
    background: ${({ theme }) => theme['red-700']};
    transition: 0.5s;
  }
`

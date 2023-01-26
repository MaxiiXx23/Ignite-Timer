import { useContext } from 'react'

import { FormProvider, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as zod from 'zod'

import { HandPalm, Play } from 'phosphor-react'

import { CyclesContext } from '../../contexts/CyclesContextProvider'

import {
  HomeContainer,
  StartCountDownButton,
  StopCountDownButton,
} from './styles'
import { Form } from './components/FormContainer'
import { Countdown } from './components/CountdownContainer'

interface INewCycleFormData {
  task: string
  minutesAmount: number
}

const createNewCycleValidationSchema = zod.object({
  task: zod.string().trim().min(1, 'Informe uma tarefa.'),
  minutesAmount: zod.number().min(5).max(60),
})

// exportando para conseguir usar nos components dentro do provider com useContext

export function Home() {
  const { createNewCycle, activeCycle, interruptCurrentCycle } =
    useContext(CyclesContext)

  // Uncontrolled Form
  const newCycleForm = useForm<INewCycleFormData>({
    resolver: zodResolver(createNewCycleValidationSchema),
    defaultValues: {
      task: '',
      minutesAmount: 0,
    },
  })

  const { watch, handleSubmit, reset } = newCycleForm

  function handleCreateNewCycle(data: INewCycleFormData) {
    createNewCycle(data)
    reset()
  }

  const task = watch('task')
  const isSubmitDisabled = !task

  return (
    <HomeContainer>
      <form onSubmit={handleSubmit(handleCreateNewCycle)} action="">
        {/* context Provider do react-hook-form */}
        <FormProvider {...newCycleForm}>
          <Form />
        </FormProvider>
        <Countdown />

        {activeCycle ? (
          <StopCountDownButton type="button" onClick={interruptCurrentCycle}>
            <HandPalm size={24} /> Interromper
          </StopCountDownButton>
        ) : (
          <StartCountDownButton type="submit" disabled={isSubmitDisabled}>
            <Play size={24} /> Começar
          </StartCountDownButton>
        )}
      </form>
    </HomeContainer>
  )
}

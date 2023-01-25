import { useState, createContext } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as zod from 'zod'
import { v4 as uuidV4 } from 'uuid'

import { HandPalm, Play } from 'phosphor-react'

import {
  HomeContainer,
  StartCountDownButton,
  StopCountDownButton,
} from './styles'
import { Form } from './components/FormContainer'
import { Countdown } from './components/CountdownContainer'

interface ICycle {
  id: string
  task: string
  minutesAmount: number
  startDate: Date
  interruptDate?: Date
  finishedDate?: Date
  // isActiveCycle: boolean <-- outra maneira de sabe se o ciclo está ativo ou não
}

interface ICyclesContent {
  activeCycle: ICycle | undefined
  activeCycleId: string | null
  amountSecondsPassed: number
  markCurrentCycleAsFinished: () => void
  changeActivedCycleIdToNull: () => void
  setSecondsPassed: (seconds: number) => void
}
interface INewCycleFormData {
  task: string
  minutesAmount: number
}

const createNewCycleValidationSchema = zod.object({
  task: zod.string().trim().min(1, 'Informe uma tarefa.'),
  minutesAmount: zod.number().min(1).max(60),
})

// exportando para conseguir usar nos components dentro do provider com useContext
export const CyclesContext = createContext<ICyclesContent>({} as ICyclesContent)

export function Home() {
  const [cycles, setCycles] = useState<ICycle[]>([])
  const [activeCycleId, setActiveCycleId] = useState<string | null>(null)
  const [amountSecondsPassed, setAmountSecondsPassed] = useState(0)

  // Uncontrolled Form
  const newCycleForm = useForm<INewCycleFormData>({
    resolver: zodResolver(createNewCycleValidationSchema),
    defaultValues: {
      task: '',
      minutesAmount: 0,
    },
  })

  const { watch, reset, handleSubmit } = newCycleForm

  function handleCreateNewCycle(data: INewCycleFormData) {
    const id = uuidV4()

    const newCycle: ICycle = {
      id,
      task: data.task,
      minutesAmount: data.minutesAmount,
      startDate: new Date(),
    }

    setCycles((state) => [...state, newCycle])
    setActiveCycleId(id)
    setAmountSecondsPassed(0)

    reset()
  }

  function handleInterruptCycle() {
    setCycles((state) =>
      state.map((cycle) => {
        if (cycle.id === activeCycleId) {
          return { ...cycle, interruptDate: new Date() }
        } else {
          return cycle
        }
      }),
    )
    setActiveCycleId(null)
  }

  function setSecondsPassed(seconds: number) {
    setAmountSecondsPassed(seconds)
  }

  function markCurrentCycleAsFinished() {
    setCycles((state) =>
      state.map((cycle) => {
        if (cycle.id === activeCycleId) {
          return { ...cycle, finishedDate: new Date() }
        } else {
          return cycle
        }
      }),
    )
  }

  function changeActivedCycleIdToNull() {
    setActiveCycleId(null)
  }

  const activeCycle = cycles.find((cycle) => cycle.id === activeCycleId)

  const task = watch('task')
  const isSubmitDisabled = !task

  return (
    <HomeContainer>
      <form onSubmit={handleSubmit(handleCreateNewCycle)} action="">
        <CyclesContext.Provider
          value={{
            activeCycle,
            activeCycleId,
            markCurrentCycleAsFinished,
            changeActivedCycleIdToNull,
            amountSecondsPassed,
            setSecondsPassed,
          }}
        >
          {/* context Provider do react-hook-form */}
          <FormProvider {...newCycleForm}>
            <Form />
          </FormProvider>
          <Countdown />
        </CyclesContext.Provider>

        {activeCycle ? (
          <StopCountDownButton type="button" onClick={handleInterruptCycle}>
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

import { ReactNode, createContext, useState } from 'react'
import { v4 as uuidV4 } from 'uuid'

interface ICycle {
  id: string
  task: string
  minutesAmount: number
  startDate: Date
  interruptDate?: Date
  finishedDate?: Date
  // isActiveCycle: boolean <-- outra maneira de sabe se o ciclo está ativo ou não
}

interface INewCycleFormData {
  task: string
  minutesAmount: number
}

interface ICyclesContent {
  activeCycle: ICycle | undefined
  activeCycleId: string | null
  amountSecondsPassed: number
  createNewCycle: (data: INewCycleFormData) => void
  interruptCurrentCycle: () => void
  markCurrentCycleAsFinished: () => void
  changeActivedCycleIdToNull: () => void
  setSecondsPassed: (seconds: number) => void
}

interface ICyclesContextProvider {
  children: ReactNode
}

// posso exportado e usa-lo com useContext
export const CyclesContext = createContext<ICyclesContent>({} as ICyclesContent)

export function CyclesContextProvider({ children }: ICyclesContextProvider) {
  const [cycles, setCycles] = useState<ICycle[]>([])
  const [activeCycleId, setActiveCycleId] = useState<string | null>(null)
  const [amountSecondsPassed, setAmountSecondsPassed] = useState(0)

  function createNewCycle(data: INewCycleFormData) {
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

    // reset()
  }

  function interruptCurrentCycle() {
    setCycles((state) =>
      state.map((cycle) => {
        if (cycle.id === activeCycleId) {
          document.title = 'Promodoro Ignite'
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

  return (
    <CyclesContext.Provider
      value={{
        activeCycle,
        activeCycleId,
        createNewCycle,
        interruptCurrentCycle,
        markCurrentCycleAsFinished,
        changeActivedCycleIdToNull,
        amountSecondsPassed,
        setSecondsPassed,
      }}
    >
      {children}
    </CyclesContext.Provider>
  )
}

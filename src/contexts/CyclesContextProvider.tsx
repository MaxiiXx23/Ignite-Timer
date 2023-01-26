import { ReactNode, createContext, useReducer, useState } from 'react'

import { v4 as uuidV4 } from 'uuid'

import { ICycle, cyclesReducer } from '../reducers/cycles/reducer'
import {
  addNewCycleAction,
  interruptCurrentCycleAction,
  markCurrentCycleAsFinishedAction,
} from '../reducers/cycles/actions'

interface INewCycleFormData {
  task: string
  minutesAmount: number
}

interface ICyclesContent {
  cycles: ICycle[]
  activeCycle: ICycle | undefined
  activeCycleId: string | null
  amountSecondsPassed: number
  createNewCycle: (data: INewCycleFormData) => void
  interruptCurrentCycle: () => void
  markCurrentCycleAsFinished: () => void
  setSecondsPassed: (seconds: number) => void
}

interface ICyclesContextProvider {
  children: ReactNode
}

// posso exportado e usa-lo com useContext
export const CyclesContext = createContext<ICyclesContent>({} as ICyclesContent)

export function CyclesContextProvider({ children }: ICyclesContextProvider) {
  // useReducer

  const [cyclesState, dispatch] = useReducer(cyclesReducer, {
    cycles: [],
    activeCycleId: null,
  })

  /* 
    // Sem o uso do reducer
    const [cycles, setCycles] = useState<ICycle[]>([])
    const [activeCycleId, setActiveCycleId] = useState<string | null>(null)
  */
  const [amountSecondsPassed, setAmountSecondsPassed] = useState(0)

  function createNewCycle(data: INewCycleFormData) {
    const id = uuidV4()

    const newCycle: ICycle = {
      id,
      task: data.task,
      minutesAmount: data.minutesAmount,
      startDate: new Date(),
    }

    dispatch(addNewCycleAction(newCycle, id))
    // setActiveCycleId(id)
    setAmountSecondsPassed(0)
  }

  function interruptCurrentCycle() {
    // Com o useReducer
    dispatch(interruptCurrentCycleAction())

    /* 
      // Sem o useReducer

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
    
    */
    // setActiveCycleId(null)
  }

  function setSecondsPassed(seconds: number) {
    setAmountSecondsPassed(seconds)
  }

  function markCurrentCycleAsFinished() {
    dispatch(markCurrentCycleAsFinishedAction())
  }

  const { cycles, activeCycleId } = cyclesState

  const activeCycle = cycles.find((cycle) => cycle.id === activeCycleId)

  return (
    <CyclesContext.Provider
      value={{
        cycles,
        activeCycle,
        activeCycleId,
        createNewCycle,
        interruptCurrentCycle,
        markCurrentCycleAsFinished,
        amountSecondsPassed,
        setSecondsPassed,
      }}
    >
      {children}
    </CyclesContext.Provider>
  )
}

export interface ICycle {
  id: string
  task: string
  minutesAmount: number
  startDate: Date
  interruptDate?: Date
  finishedDate?: Date
  // isActiveCycle: boolean <-- outra maneira de sabe se o ciclo está ativo ou não
}

interface ICycleStateReducer {
  cycles: ICycle[]
  activeCycleId: string | null
}

export enum ActionTypes {
  'ADD_NEW_CYCLE' = 'ADD_NEW_CYCLE',
  'INTERRUP_CURRENT_CYCLE' = 'INTERRUP_CURRENT_CYCLE',
  'MARK_CURRENT_CYCLE_AS_FINISHED' = 'MARK_CURRENT_CYCLE_AS_FINISHED',
}

export function cyclesReducer(state: ICycleStateReducer, action: any) {
  switch (action.type) {
    case ActionTypes.ADD_NEW_CYCLE:
      return {
        ...state,
        cycles: [...state.cycles, action.payload.newCycle],
        activeCycleId: action.payload.id,
      }

    case ActionTypes.INTERRUP_CURRENT_CYCLE:
      return {
        ...state,
        cycles: state.cycles.map((cycle) => {
          if (cycle.id === state.activeCycleId) {
            document.title = 'Promodoro Ignite'
            return { ...cycle, interruptDate: new Date() }
          } else {
            return cycle
          }
        }),
        activeCycleId: null,
      }
    case ActionTypes.MARK_CURRENT_CYCLE_AS_FINISHED:
      return {
        ...state,
        cycles: state.cycles.map((cycle) => {
          if (cycle.id === state.activeCycleId) {
            return { ...cycle, finishedDate: new Date() }
          } else {
            return cycle
          }
        }),
        activeCycleId: null,
      }
    default:
      return state
  }
}

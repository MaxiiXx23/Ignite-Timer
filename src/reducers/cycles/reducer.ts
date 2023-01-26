import produce from "immer"
export interface ICycle {
  id: string
  task: string
  minutesAmount: number
  startDate: Date
  interruptDate?: Date
  finishedDate?: Date
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

interface IActions {
  type: ActionTypes
  payload?: any
}

export function cyclesReducer(state: ICycleStateReducer, action: IActions) {
  switch (action.type) {
    case ActionTypes.ADD_NEW_CYCLE:
      return {
        ...state,
        cycles: [...state.cycles, action.payload.newCycle],
        activeCycleId: action.payload.id,
      }

    case ActionTypes.INTERRUP_CURRENT_CYCLE: {

      /* 
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

      */
      // exemplo da implementação do immer no projeto, para utilizarmos mutabilidade em estado imutáveis
      
      const indexCycleFound = state.cycles.findIndex((cycle) => cycle.id === state.activeCycleId)

      if(indexCycleFound < 0) {
        return {...state}
      }

      const stateCycle = produce(state, draft => {
        draft.activeCycleId = null
        draft.cycles[indexCycleFound].interruptDate = new Date()
      }) 

      return {
        ...stateCycle
      }

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

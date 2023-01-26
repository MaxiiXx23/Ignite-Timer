import { ActionTypes, ICycle } from './reducer'

export function addNewCycleAction(newCycle: ICycle, id: string) {
  return {
    type: ActionTypes.ADD_NEW_CYCLE,
    payload: {
      newCycle,
      id,
    },
  }
}
export function interruptCurrentCycleAction() {
  return {
    type: ActionTypes.INTERRUP_CURRENT_CYCLE,
    payload: {},
  }
}
export function markCurrentCycleAsFinishedAction() {
  return {
    type: ActionTypes.MARK_CURRENT_CYCLE_AS_FINISHED,
    payload: {},
  }
}

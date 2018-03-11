import { createStore } from 'redux'
import { rootReducer } from './reducers'

export const createSmartLogger = () => createStore(rootReducer)

export const trackState = (...params) => store.dispatch({
    type: 'TRACK',
    state: params
})

export const reportState = () => store.dispatch({
    type: 'WRITE'
})

import { createStore } from 'redux'
import { rootReducer } from './reducers'

export const startSmartLogger = () => createStore(rootReducer)

// Can take single element or take a params obj that holds multiple params
export const trackParams = (params) => store.dispatch({
    type: 'TRACK',
    state: params
})

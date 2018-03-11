import { createStore } from 'redux'
import { rootReducer } from './reducers'

export const createSmartLogger = () => {
    const store = createStore(rootReducer)
    return {
        trackState: (...params) => store.dispatch({
            type: 'TRACK',
            state: params
        }),
        reportState: () => store.dispatch({
            type: 'WRITE'
        }),
        resetState: () => store.dispatch({
            type: 'RESET'
        })
    }
}

// export const trackState = (...params) => .dispatch({
//     type: 'TRACK',
//     state: params
// })
//
// export const reportState = () => store.dispatch({
//     type: 'WRITE'
// })

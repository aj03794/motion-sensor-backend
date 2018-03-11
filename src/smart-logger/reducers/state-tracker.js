import fs from 'fs-extra'

export const stateTracker = (state = {}, action) => {
    switch(action.type) {
        case 'TRACK':
            return { ...state, action.state }
        case 'WRITE'
            fs.appendFileSync(`log.${Date.now}.txt`, state)
            return state
        default:
            console.log('No matching action types')
            return state
    }
}

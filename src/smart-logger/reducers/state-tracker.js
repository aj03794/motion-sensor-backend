import fs from 'fs-extra'
import path from 'path'
import { merge } from 'lodash'

export const stateTracker = (state = {}, action) => {
    switch(action.type) {
        case 'TRACK':
            console.log('In track')
            return merge(state, action.state)
        case 'WRITE':
            console.log('In write')
            console.log('State in write',state)
            fs.appendFileSync(path.resolve(__dirname, `logs.${Date.now()}.txt`), JSON.stringify(state))
            return state
        case 'RESET':
            console.log('In restart')
            return state = {}
        default:
            console.log('No matching action types')
            return state
    }
}

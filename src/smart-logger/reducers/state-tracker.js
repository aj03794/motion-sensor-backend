import fs from 'fs-extra'
import path from 'path'
import { merge } from 'lodash'
import os from 'os'

export const stateTracker = (state = {}, action) => {
    switch(action.type) {
        case 'TRACK':
            console.log('In track')
            return merge(state, action.state)
        case 'WRITE':
            console.log('In write')
            console.log('State in write',state)
            fs.appendFileSync(path.resolve(__dirname, `log.txt`), JSON.stringify(state) + os.EOL)
            return state
        case 'RESET':
            console.log('In restart')
            return state = {}
        default:
            console.log('No matching action types')
            return state
    }
}

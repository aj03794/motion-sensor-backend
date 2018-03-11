export const stateTracker = (state = {}, action) {
    switch(action.type) {
        case: 'TRACK':
            return { ...state, action.state }
    }
}

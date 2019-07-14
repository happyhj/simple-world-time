import {
    UTC_TIME_AQUIRED,
    LOCAL_TIMEZONE_AQUIRED
} from '../actions/constants'

const app = (state = {
    UTCTimestamp: null,
    localTomezoneOffset: null
}, action) => {
    switch(action.type) {
        case UTC_TIME_AQUIRED:
            return Object.assign({}, state, {
                UTCTimestamp: action.UTCTimestamp,
            })  
        case LOCAL_TIMEZONE_AQUIRED:
            return Object.assign({}, state, {
                localTomezoneOffset: action.localTomezoneOffset,
            })             
        default:
            return state
    }
}

export default app
import {
    UTC_TIME_AQUIRED,
    LOCAL_TIMEZONE_AQUIRED
} from './constants'

export const aquireUTCTime= () => {
    return dispatch => {
        let currentUTCTimestamp = new Date().getTime()

        dispatch({
            type: UTC_TIME_AQUIRED,
            UTCTimestamp: currentUTCTimestamp
        })
    }
}
export const aquireLocalTimezone= () => {
    return dispatch => {
        dispatch({
            type: LOCAL_TIMEZONE_AQUIRED,
            localTomezoneOffset: new Date().getTimezoneOffset()
        })
    }
}
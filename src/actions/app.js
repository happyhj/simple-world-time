import {
    UTC_TIME_AQUIRED,
    LOCAL_TIMEZONE_AQUIRED,
    SEARCH_RESULT_FETCHED,
    NEAR_CITIES_FETCHED,
    CITY_ADDED,
    CITY_REMOVED
} from './constants'

import api from './API'



export const removeCity= (city) => {
    return dispatch => {
        dispatch({
            type: CITY_REMOVED,
            city
        })
    }
}


export const addCity= (city) => {
    return dispatch => {
        dispatch({
            type: CITY_ADDED,
            city
        })
    }
}

export const getNearCities= (query) => {
    return dispatch => {
        api.getNearCities().then(nearCities => {
            dispatch({
                type: NEAR_CITIES_FETCHED,
                nearCities
            })
        })
    }
}


export const search= (query) => {
    return dispatch => {
        api.search(query.trim()).then(searchResultCities => {
            dispatch({
                type: SEARCH_RESULT_FETCHED,
                searchResultCities
            })
        })
    }
}

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
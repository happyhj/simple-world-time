import {
    UTC_TIME_AQUIRED,
    LOCAL_TIMEZONE_AQUIRED,
    SEARCH_RESULT_FETCHED,
    NEAR_CITIES_FETCHED,
    CITY_ADDED,
    CITY_REMOVED
} from '../actions/constants'

const app = (state = {
    nearCities: [],
    searchResultCities: [],
    primaryCity: null,
    cities: [],
    UTCTimestamp: null,
    localTomezoneOffset: null
}, action) => {
    let newCities
    switch(action.type) {
        case CITY_REMOVED:
            newCities = state.cities.slice()
            newCities.splice(newCities.indexOf(action.city), 1)
            localStorage.setItem("cities", JSON.stringify(newCities))
            return Object.assign({}, state, {
                cities: newCities
            }) 
        case CITY_ADDED:            
            if (state.cities.some(city => city[0] === action.city[0])) return state
            newCities = state.cities.slice()
            newCities.push(action.city)
            localStorage.setItem("cities", JSON.stringify(newCities))
            return Object.assign({}, state, {
                cities: newCities
            })  
        case NEAR_CITIES_FETCHED:
            return Object.assign({}, state, {
                nearCities: action.nearCities,
                primaryCity: action.nearCities[0]
            })  
        case SEARCH_RESULT_FETCHED:
            return Object.assign({}, state, {
                searchResultCities: action.searchResultCities
            })  
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
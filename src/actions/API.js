import timezones from '../assets/timeZones.js'
import cities from '../assets/cities15000.js'
import TSV from 'tsv'

const MAX_RESULT = 6

const NAME_KEY = 1
const POPULATION_KEY = 14
const ALT_NAME_KEY = 3
const LATITUDE_KEY = 4
const LONGITUDE_KEY = 5
const TIMEZONE_KEY = 17

class API {
    constructor() {
        this.cities = TSV.parse(cities)
        this.timezones = TSV.parse(timezones)
        console.log(this.cities)
        console.log(this.timezones)
    }
    getNearCities() {
        return new Promise(async (res, rej) => {
            const {latitude, longitude} = await getPosition()
            const cities = []
            
            // sort by distance 
            const totalCities =
            this.cities.slice(1, this.cities.length).sort((a, b) => { 
                const d1 = distance(latitude, longitude, a[LATITUDE_KEY], a[LONGITUDE_KEY]) 
                const d2 = distance(latitude, longitude, b[LATITUDE_KEY], b[LONGITUDE_KEY]) 
                return  d1 - d2
            })
            
            res(this._addOffsetToCities(totalCities.splice(0, MAX_RESULT)))
        })
    }
    _addOffsetToCities(cities) {
        return cities.map(city => {
            return Object.assign({}, city, {
                "offset": this.timezones.slice(1, this.timezones.length).filter(v => {
                    return v[NAME_KEY].indexOf(city[TIMEZONE_KEY])!== -1
                })[0][2]
            })
        })
    }
    search(query) {  
        return new Promise((res, rej) => {
            const cities = []
            const totalCities =
            this.cities.slice(1, this.cities.length).sort((a, b) => { 
                return  b[POPULATION_KEY] - a[POPULATION_KEY]
            })

            if (query.length > 0) {
                for (let cityIdx in totalCities) {
                    const city = totalCities[cityIdx]
                    if (city[NAME_KEY].indexOf(query) != -1 ||
                    city[ALT_NAME_KEY].indexOf(query) != -1 ||
                    city[TIMEZONE_KEY].indexOf(query) != -1) {
                        cities.push(city)
                    }
                    if (cities.length >= MAX_RESULT) break
                }
            }
            
            res(this._addOffsetToCities(cities))
        })
    }
}
const api = new API()

function getPosition() {
    return new Promise(async (res, rej) => {
        if ("geolocation" in navigator) {
            /* 지오로케이션 사용 가능 */
            console.log("지오로케이션 사용 가능")
            navigator.geolocation.getCurrentPosition(position => {
                res({
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude
                })
            }, e => { console.log(e);rej() }
            , {
                enableHighAccuracy: true, 
                maximumAge        : 30000, 
                timeout           : 27000
            })
        } else {
            rej()
        }
    })
}

function distance(lat1, lon1, lat2, lon2, unit="K") {
	if ((lat1 == lat2) && (lon1 == lon2)) {
		return 0;
	}
	else {
		var radlat1 = Math.PI * lat1/180;
		var radlat2 = Math.PI * lat2/180;
		var theta = lon1-lon2;
		var radtheta = Math.PI * theta/180;
		var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
		if (dist > 1) {
			dist = 1;
		}
		dist = Math.acos(dist);
		dist = dist * 180/Math.PI;
		dist = dist * 60 * 1.1515;
		if (unit=="K") { dist = dist * 1.609344 }
		if (unit=="N") { dist = dist * 0.8684 }
		return dist;
	}
}

export default api
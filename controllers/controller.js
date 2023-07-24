// const fetch = require('node-fetch');
import fs from 'fs';
import fetch from 'node-fetch';

const city = 'London';
const key = 'f63de25760b14835a8565248232407';

let hour = 1;
let tempC = 0;
let windMph = 0;

async function weatherapi() {
    try {

        const response = await fetch(`http://api.weatherapi.com/v1/current.json?key=${key}&q=${city}`);
        const json = await response.json();

        

        const data = {
            "location_name": json.location.name,
            "Country": json.location.country,
            "temperature_in_celsius": json.current.temp_c,
            "temperature_in_fahrenheit": json.current.temp_f,
            "wind_mph": json.current.wind_mph,
            "wind_kph": json.current.wind_kph,
            "last_updated": json.current.last_updated,
        }


        fs.appendFile(`../model/json.json`, JSON.stringify(data), () => {
            console.log('success')
        })
        

        const forecast_data = {
            "location_name": json.location.name,
            "Country": json.location.country,
            "temperature_in_celsius": tempC/hour,
            "temperature_in_fahrenheit": ((tempC/hour)*9/5) + 32,
            "wind_mph": windMph/hour,
            "wind_kph": (windMph/hour)/3.6,
            "last_updated": json.current.last_updated,
        }

        fs.writeFile(`../model/forecast.json`, JSON.stringify(forecast_data), () => {
            console.log('success')
        });


        console.log(json.location.Country);
        console.log(json.location.name);
        console.log(json.current.temp_c);
        console.log(json.current.temp_f);
        console.log(json.current.wind_mph);
        console.log(json.current.wind_kph);

        hour++;
        console.log(hour);

    } catch (error) {
        console.log(error);
    }
}

setInterval(weatherapi, 3600);
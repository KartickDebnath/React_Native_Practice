// import axios from 'axios'
// import {apiKey} from '../constants/index.jsx'

// const forecastEndpoint = params =>`http://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${params.name}&days=${params.days}&aqi=no&alerts=no`;

// const locationEndPoint = params =>`http://api.weatherapi.com/v1/search.json?key=${apiKey}&q=${params.name}`;

// const apiCall= async(endpoint)=>{
//     const options={
//         method:'GET',
//         url:endpoint
//     }
//     try{
//         const response = await axios.request(options);
//         return response.data;

//     }catch(err){
//         console.log('error',err);
//         return null;
//     }
// }
// export const fetchWeatherForecast = params=>{
//     return apiCall(forecastUrl = forecastEndpoint(params))
// }
// export const fetchLocation = params=>{
//     return apiCall(locationEndPoint = fetchLocation(params))
// }

import axios from 'axios';
import { apiKey } from '../constants';

const forecastEndpoint = (params) =>
  `http://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${params.name}&days=${params.days}&aqi=no&alerts=no`;

const locationEndPoint = (params) =>
  `http://api.weatherapi.com/v1/search.json?key=${apiKey}&q=${params.name}`;

const apiCall = async (endpoint) => {
  try {
    const response = await axios.get(endpoint);
    return response.data;
  } catch (err) {
    console.log('error', err);
    return null;
  }
};

export const fetchWeatherForecast = (params) => {
  return apiCall(forecastEndpoint(params));
};

export const fetchLocation = (params) => {
  return apiCall(locationEndPoint(params));
};

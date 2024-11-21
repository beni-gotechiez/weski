import axios from "axios";
import hotelApis from "../config/hotles/apis.js";

async function fetchHotelsFromApi(params, api) {
  const { name, url, method, reqDataConvertion, resDataConvertion } = hotelApis[api];
  try {
    let response;
    if (method === "get") {
      response = await axios.get(url, {
        params: reqDataConvertion(params),
      });
    } else if (method === "post") {
      response = await axios.post(url, reqDataConvertion(params));
    }
    return resDataConvertion(response.data);
  } catch (error) {
    console.error(`${name} Error:`, error.message);
    throw new Error(`Failed to fetch data from ${name}`);
  }
}

const GUESTS_LIMIT = 10;

function searchHotels(searchParams) {
  const hotelSearchesPromises = Object.keys(hotelApis).reduce(
    (promises, api) => {
      for (let i = +searchParams.guests; i <= GUESTS_LIMIT; i++) {
        promises.push(fetchHotelsFromApi({ ...searchParams, guests: i }, api));
      }
      return promises;
    },
    []
  );

  return hotelSearchesPromises;
}

export default {
  searchHotels,
};

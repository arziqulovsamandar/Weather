import api from "@/plugins/axios";
const url = import.meta.env.VITE_BASE_URL2;

function apifetchRegionAll(cityName: any) {
  return api.get(
    url + `/direct?q=${cityName.name}&appid=9dd86907fe501cec50da3d087e4e9dc0`
  );
}

function apifetchWeatherAll() {
  return api.get(
    "/onecall?lat=41.311081&lon=69.240562&exclude=minutely,hourly,alerts&appid=9dd86907fe501cec50da3d087e4e9dc0&units=metric&lang=ru"
  );
}

function apifetchWeatherSingil(params: any, lang: any) {
  return api.get(
    `/onecall?lat=${params.lat}&lon=${params.lon}&exclude=minutely,hourly,alerts&appid=9dd86907fe501cec50da3d087e4e9dc0&units=metric&lang=${lang}`
  );
}
export { apifetchWeatherAll, apifetchWeatherSingil, apifetchRegionAll };

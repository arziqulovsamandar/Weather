import { defineStore } from "pinia";
import {
  apifetchWeatherAll,
  apifetchWeatherSingil,
  apifetchRegionAll,
} from "@/api/weather";
import { Dataweathers, DataweathersAll, ZonaAll } from "@/modules/interface";
export const useAdminStore = defineStore("product", {
  state: () => ({
    weathers: [] as DataweathersAll[],
    weatherData: {} as Dataweathers,
    Zona: [] as ZonaAll[],
  }),
  actions: {
    async getWeather() {
      try {
        const res = await apifetchWeatherAll();
        if (!res.data?.admins && res.status !== 200) {
          return;
        }
        this.weathers = res.data;
      } catch (error) {
        if (error instanceof Error) {
          return;
        }
      } finally {
      }
    },

    async getSingilWeather(params: any, lang: any) {
      try {
        const res = await apifetchWeatherSingil(params, lang);
        if (!res.data?.admins && res.status !== 200) {
          return;
        }
        this.weatherData = res.data;
      } catch (error) {
        if (error instanceof Error) {
          return;
        }
      } finally {
      }
    },

    async getRegionAll(cityName: any) {
      try {
        const res = await apifetchRegionAll(cityName);
        if (!res.data?.admins && res.status !== 200) {
          return;
        }
        this.Zona = res.data;
      } catch (error) {
        if (error instanceof Error) {
          return;
        }
      } finally {
      }
    },
  },
});

export interface Dataweathers {
  current: {
    temp: string;
    humidity: number;
    wind_speed: number;
    weather: { icon: string }[];
  };
  daily: [temp: any];
}

export interface DataweathersAll {
  current: {
    temp: string;
    humidity: number;
    wind_speed: number;
  };
  daily: [];
}

export interface ZonaAll {
  lat: number;
  lon: number;
}
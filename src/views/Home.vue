<template>
  <div class="menu">
    <div class="menu_2">
      <h2>{{ t("arias") }}</h2>
      <form action="/action_page.php" class="linklar">
        <input
          type="radio"
          name="fav_language"
          @click="handleClick('Toshkent')"
        />
        <label>Toshkent</label><br />

        <input
          @click="handleClick('Andijon')"
          type="radio"
          name="fav_language"
        />
        <label>Andijon</label><br />

        <input
          type="radio"
          name="fav_language"
          @click="handleClick('Buxoro')"
        />
        <label>Buxoro</label><br />

        <input
          type="radio"
          name="fav_language"
          @click="handleClick('Guliston')"
        />
        <label>Guliston</label><br />

        <input
          type="radio"
          name="fav_language"
          @click="handleClick('Jizzax')"
        />
        <label>Jizzax</label><br />

        <input
          type="radio"
          name="fav_language"
          @click="handleClick('Zarafshon')"
        />
        <label>Zarafshon</label><br />

        <input
          type="radio"
          name="fav_language"
          @click="handleClick('Qarshi')"
        />
        <label>Qarshi</label><br />

        <input
          type="radio"
          name="fav_language"
          @click="handleClick('Navoiy')"
        />
        <label>Navoiy</label><br />

        <input type="radio" name="fav_language" @click="handleClick('Nukus')" />
        <label>Nukus</label><br />

        <input
          type="radio"
          name="fav_language"
          @click="handleClick('Samarqand')"
        />
        <label>Samarqand</label><br />

        <input
          type="radio"
          name="fav_language"
          @click="handleClick('Termiz')"
        />
        <label>Termiz</label><br />

        <input
          type="radio"
          name="fav_language"
          @click="handleClick('Urganch')"
        />
        <label>Urganch</label><br />

        <input
          type="radio"
          name="fav_language"
          @click="handleClick('Fargona')"
        />
        <label>Farg'ona</label><br />

        <input type="radio" name="fav_language" @click="handleClick('Xiva')" />
        <label>Xiva</label><br />
      </form>
    </div>

    <div style="width: 70%">
      <h1 style="color: white">{{ cityName.name }}</h1>
      <div style="display: flex; gap: 10px">
        <h3 style="color: rgb(122, 198, 245)">{{ currentDayName }}</h3>
        <h4 style="margin: 3px; color: rgb(0, 187, 255)">
          {{ daysInWeek[0] }}-{{ nextSundayYear }}
        </h4>
      </div>
      <div v-if="!weatherData">
        <loading />
      </div>
      <div v-else>
        <div style="display: flex; gap: 10px; justify-content: space-between">
          <p
            v-if="weatherData.current"
            style="color: rgb(104, 104, 218); margin: 20px; font-size: 45px"
          >
            {{ weatherData.current.temp }}°C
          </p>
          <img
            v-if="img"
            :src="img"
            alt=""
            style="width: 100px; height: 100px"
          />
        </div>
        <p v-if="weatherData && weatherData.current" style="color: white">
          Namlik: {{ weatherData.current.humidity }}%
        </p>
        <p v-if="weatherData && weatherData.current" style="color: white">
          Shamol tezligi: {{ weatherData.current.wind_speed }} km/h
        </p>
      </div>
      <div class="days">
        <v-table class="my-2" style="background: linear-gradient(to bottom, #65ceff, #ffd54f);">
          <thead>
            <tr>
              <th
                v-for="(day, index) in daysInWeek"
                :key="index"
                class="text-left"
              >
                {{ day }}
              </th>
            </tr>
          </thead>
          <tbody>
            <tr v-if="weatherData && weatherData.daily">
              <td
                class="text-left"
                v-for="(weath, i) in weatherData.daily"
                :key="'temp-' + i"
              >
                {{ weath.temp.day }}°C
              </td>
            </tr>
            <tr v-if="weatherData && weatherData.daily">
              <td
                class="text-left"
                v-for="(weath, i) in weatherData.daily"
                :key="'weather-' + i"
              >
                <img
                  style="width: 50px; height: 50px"
                  v-if="weath && weath.weather && weath.weather[0].icon"
                  :src="
                    'https://openweathermap.org/img/wn/' +
                    weath.weather[0].icon +
                    '@2x.png'
                  "
                  alt=""
                />
              </td>
            </tr>
          </tbody>
        </v-table>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { ref, onMounted } from "vue";
import loading from "@/components/loading.vue";
import { useAdmin } from "@/composables/weather";
const { weathers, weatherData, Zona } = useAdmin();
import { useI18n } from "vue-i18n";
const { t } = useI18n();
import { useAdminStore } from "@/store/weather";

const currentDayName = ref("");
const nextSundayDate = ref<number>(0);
const nextSundayMonth = ref<number>(0);
const nextSundayYear = ref<number>(0);

export interface Weather {
  temp: {
    day: string;
  };
}
const daysInWeek = [];
const { getSingilWeather, getRegionAll } = useAdminStore();
onMounted(() => {
  const today = new Date();
  const weekDays = [
    "Yakshanba",
    "Dushanba",
    "Seshanba",
    "Chorshanba",
    "Payshanba",
    "Juma",
    "Shanba",
  ];
  currentDayName.value = weekDays[today.getDay()];

  const nextSunday = new Date(today); // Keyingi yakshanba
  nextSunday.setDate(today.getDate() + (7 - today.getDay()));
  nextSundayDate.value = nextSunday.getDate();
  nextSundayMonth.value = nextSunday.getMonth();
  nextSundayYear.value = nextSunday.getFullYear();

  for (let i = 0; i < 8; i++) {
    const nextDay = new Date();
    nextDay.setDate(nextDay.getDate() + i);
    const dateStr = `${nextDay.getDate()}-${nextDay.getMonth() + 1}`;
    daysInWeek.push(dateStr);
  }
});

let params = {
  lat: 41.311081,
  lon: 69.240562,
};

const lang = localStorage.getItem("lang");
let cityName = {
  name: "Toshkent",
};

onMounted(async () => {
  try {
    weatherData.value = weathers;
  } catch (error) {
    console.error("Error fetching weather data:", error);
  }
});

const handleClick = async (labelText: any) => {
  try {
    cityName = { name: labelText };
    getRegionAll(cityName);
    params.lat = Zona.value[0].lat;
    params.lon = Zona.value[0].lon;
    fetchWeatherData();
  } catch (error) {
    console.error("Error fetching weather data:", error);
  }
};
let img = "";
const fetchWeatherData = async () => {
  try {
    getSingilWeather(params, lang);
    const iconCode = weatherData.value.current.weather[0].icon;
    const weatherIconUrl = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
    img = weatherIconUrl;
  } catch (error) {
    console.error("Error fetching weather data:", error);
  }
};
</script>
<style scoped>
.days {
  margin: 10px;
  border-radius: 10px;
  justify-content: space-between;
}
.menu_2 {
  border: 0.1px solid rgb(157, 144, 144);
  border-radius: 10px;
  padding: 10px;
  width: 25%;
}
.menu {
  display: flex;
  margin: 20px;
  gap: 10px;
}
.linklar {
  overflow-wrap: break-word;
  padding: 5px;
}
.linklar label {
  margin: 5px;
  text-decoration: none;
  font-weight: 600;
}
</style>

import { useAdminStore } from "@/store/weather";
import { storeToRefs } from "pinia";
import { onMounted } from "vue";
export const useAdmin = () => {
  const storee = useAdminStore();
  const { weathers, weatherData, Zona } = storeToRefs(storee);
  const { getWeather } = useAdminStore();

  onMounted(async () => {
    await getWeather();
  });

  return { weathers, weatherData, Zona };
};

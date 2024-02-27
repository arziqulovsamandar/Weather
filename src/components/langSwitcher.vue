<template>
  <div class="langswitcher">
    <v-menu open-on-hover>
      <template v-slot:activator="{ props }">
        <span id="lang" class="langs" v-bind="props">{{ currentLang }}</span>
      </template>
      <v-list>
        <v-list-item
          v-for="(item, i) in langs"
          :key="i"
          @click="onLangChange(item)"
        >
          <v-list-item-title>{{ item.text }}</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useI18n } from "vue-i18n";
import { useRoute } from "vue-router";
import { updateMeta } from "../router";

type langObj = {
  text: string;
  locale: string;
};

const currentLang = localStorage.getItem("lang") || "uz";
const showList = ref<boolean>(false);
const { locale } = useI18n();
const route = useRoute();
const langs = ref<langObj[]>([
  {
    text: "O'zbek",
    locale: "uz",
  },
  {
    text: "English",
    locale: "en",
  },
  {
    text: "Russkiy",
    locale: "ru",
  },
]);

function onLangChange(lang: langObj) {
  showList.value = false;
  locale.value = lang.locale;
  localStorage.setItem("lang", lang.locale);
  const langElement = document.getElementById("lang");
  if (langElement) {
    langElement.textContent = lang.locale;
  } else {
    console.error("Element with id 'lang' not found.");
  }
  updateMeta(route?.meta?.title as string);
}
</script>

<style scoped>
.langswitcher {
  position: relative;
  width: 100px;
}
.langs {
  cursor: pointer;
  text-transform: uppercase;
  border-radius: 9999px;
  transition-property: all;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 150ms;
}
.langs:hover {
  --tw-bg-opacity: 1;
  background-color: rgb(241 241 241 / var(--tw-bg-opacity));
}
</style>

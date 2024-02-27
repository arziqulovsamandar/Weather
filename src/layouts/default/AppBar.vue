<template>
  <v-app-bar
    :elevation="1"
    color="#fdfdfd"
    class="py-2 flex items-center justify-between"
  >
    <img src="../../assets/icons8-sun-50.png" alt="" class="mx-2"/>
    <v-app-bar-nav @click="onSidebarToggle" class="me-auto">
      <h2 class="mx-3" style="font-weight: 600">{{ t("weather") }}</h2>
    </v-app-bar-nav>
    <langSwitcher />
  </v-app-bar>
</template>

<script setup lang="ts">
import { useI18n } from "vue-i18n";
const { t } = useI18n();
import { ref } from "vue";
import langSwitcher from "@/components/langSwitcher.vue";
const permanent = ref<boolean>(false);

const emit = defineEmits<{
  (e: "toggleSidebar", permanent: boolean): void;
}>();

function onSidebarToggle(): void {
  permanent.value = !permanent.value;
  emit("toggleSidebar", permanent.value);
}
</script>

<style scoped></style>

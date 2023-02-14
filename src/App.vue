<template>
  <main>
    <RouterView></RouterView>
  </main>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import { useAuthStore } from './stores/useAuthStore';

const authStore = useAuthStore()

onMounted(() => {
  authStore.init()
})
</script>
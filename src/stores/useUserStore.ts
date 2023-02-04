import { defineStore } from "pinia";
import { computed, ref } from "vue";

export const useUserStore = defineStore("userStore", () => {
    const firstName = ref<string>("Bojan")
    const lastName = ref<string>("Stojanovic")
    const fullName = computed(() => `${firstName.value} ${lastName.value}`)
    const remainingHolidayDays = ref<number>(25)

    return {
        fullName,
        remainingHolidayDays
    }
})
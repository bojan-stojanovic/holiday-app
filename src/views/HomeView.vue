<template>
    <div class="container">
        <button @click="authStore.logoutHandler">Log out</button>
    </div>
    <div class="container">
        <div class="card">
            <h1>Holiday app</h1>
            <Transition name="fade" mode="out-in">
                <form action="" method="POST" @submit.prevent="submitHandler" v-if="!_submited">
                    <h2>Welcome {{ authStore.fullName }}!</h2>
                    <p>You have {{ authStore._user.daysRemaining }} remaining holiday days.</p>
                    <p><small></small></p>
                    <p>I wish to take <input type="number" name="days" id="days" placeholder="5 days" maxlength="3"
                            pattern="[0-9]*" inputmode="numeric" v-model="_requestedDays" @keydown="_maxDays($event)">
                        days of
                        holiday.</p>
                    <div class="date">
                        <div>
                            <label for="fromDate">From:</label>
                            <input type="date" name="fromDate" id="fromDate" v-model="_fromDate">
                        </div>
                        <div>
                            <label for="toDate">To:</label>
                            <input type="date" name="toDate" id="toDate" v-model="_toDate">
                        </div>
                    </div>
                    <div class="submit">
                        <button type="submit" :disabled="!_requestedDays || !_fromDate || !_toDate || _submited">Submit
                            request</button>
                    </div>
                </form>
                <div v-else>
                    <h2>Success</h2>
                </div>
            </Transition>

        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useAuthStore } from '@/stores/useAuthStore';

const authStore = useAuthStore()

// FORM
const _requestedDays = ref<number>()
const _fromDate = ref<string>("")
const _toDate = ref<string>("")
const _numbersOnly: RegExp = new RegExp("[0-9]")
const _submited = ref<boolean>(false)

const _maxDays = (e: any) => {
    const char: string = String.fromCharCode(e.keyCode)
    const currentLength: number = e.target.value.length
    const maxLength: number = +e.target.getAttribute("maxlength")

    if (!_numbersOnly.test(char) || currentLength === maxLength) e.preventDefault()
}

const submitHandler = () => {
    console.log("requested days: ", _requestedDays.value)
    console.log("from date: ", _fromDate.value)
    console.log("to date: ", _toDate.value)

    _submited.value = !_submited.value
}
</script>

<style scoped>
.date {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(9rem, max-content));
    gap: 1rem;
    margin-bottom: 2rem;
}

.date>div {
    flex: 0 1 50%;
    display: flex;
    flex-direction: column;
}

input[type="number"] {
    width: auto;
    border-top: none;
    border-right: none;
    border-left: none;
    text-align: right;
    width: 3.25rem;
    border-color: var(--color-text);
    appearance: textfield;
    border-radius: 0;
    padding: 0 .125rem;
}

input[type="date"] {
    color: var(--color-text);
}

input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
    appearance: none;
}

.submit {
    text-align: right;
}
</style>
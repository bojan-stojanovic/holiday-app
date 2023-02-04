<template>
  <div class="container">
    <div class="card">
      <h1>Holiday app</h1>
      <h2>Welcome {{ store.fullName }}!</h2>
      <p>You have {{ store.remainingHolidayDays }} remaining holiday days.</p>

      <form action="" method="POST" @submit.prevent="submitHandler">
        <p>I wish to take <input type="number" name="days" id="days" placeholder="5 days" maxlength="3"
            inputmode="numeric" v-model="_requestedDays" @keypress="_maxDays($event)"> days of holiday.</p>
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
          <button type="submit" :disabled="!_requestedDays || !_fromDate || !_toDate">Submit request</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useUserStore } from '../stores/useUserStore'

// STORE
const store = useUserStore()

// FORM
const _requestedDays = ref<number>()
const _fromDate = ref<string>("")
const _toDate = ref<string>("")
const _numbersOnly: RegExp = new RegExp("[0-9]")

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
}
</script>

<style scoped>
.card {
  background-color: var(--color-white);
  padding: 2rem 1rem;
  border-radius: .25rem;
}

h1 {
  text-transform: uppercase;
  text-align: center;
  margin-bottom: 2rem;
}

h2 {
  margin-bottom: 1.5rem;
}

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
  width: 3.15rem;
  border-color: var(--color-text);
  appearance: textfield;
}

input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  appearance: none;
}

.submit {
  text-align: right;
}
</style>
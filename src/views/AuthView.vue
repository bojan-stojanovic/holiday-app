<template>
    <div class="container">
        <div class="card">
            <h1>{{ _headline }}</h1>
            <form action="" @submit.prevent="submitHandler">
                <Transition name="fade" mode="out-in">
                    <div v-if="!_forgotPassword">
                        <div>
                            <label for="email">Email</label>
                            <input type="email" id="email" placeholder="Email" autocomplete="username" v-model="_credentials.email">
                        </div>
                        <div>
                            <label for="passwod">Password</label>
                            <input type="password" id="password" autocomplete="current-password" placeholder="password"
                                v-model="_credentials.password">
                        </div>
                        <div>
                            <button class="forgot-password" @click="_forgotPassword = !_forgotPassword"
                                type="button">Forgot password?</button>
                        </div>
                    </div>
                    <div v-else>
                        <label for="email-forgot-password">Email</label>
                        <input type="email" id="email-forgot-password" placeholder="Email" autocomplete="username"
                            v-model="_emailForgot">
                    </div>
                </Transition>

                <div class="submit">
                    <button type="submit"
                        :disabled="(!_credentials.email && !_forgotPassword || !_credentials.password && !_forgotPassword) || (!_emailForgot && _forgotPassword)">Submit</button>
                </div>
            </form>
        </div>
    </div>
</template>

<script setup lang="ts">
import { computed, reactive, ref } from 'vue';
import {useAuthStore} from "../stores/useAuthStore"

// STORE
const store = useAuthStore()


// FORM
const _credentials = reactive({
    email: "",
    password: ""
})

const _emailForgot = ref<string>("")
const _forgotPassword = ref<boolean>(false)
const _headline = computed(() => _forgotPassword.value ? "Forgot password" : "Login")

const submitHandler = () => {
    if (!_forgotPassword.value) {
        store.loginHandler(_credentials)
    } else {
        console.log("forgot")
    }

}
</script>

<style scoped>
.forgot-password {
    background-color: transparent;
    color: var(--color-text);
    border: none;
    padding: 0;
    font-weight: 400;
    text-decoration: underline;
}

label {
    margin-bottom: .25rem;
}

input {
    max-width: 100%;
    width: 100%;
    padding: .25rem;
}

form>div:not(:last-of-type) {
    margin-bottom: 1rem;
}

.submit {
    text-align: right;
}
</style>
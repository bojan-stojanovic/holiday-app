import { defineStore } from "pinia";
import { signOut, signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import { collection, doc, getDoc } from "firebase/firestore";
import { auth, db } from "../firebase"
import { computed, ref } from "vue";
import router from "@/router";

const userRef = collection(db, "users");

export const useAuthStore = defineStore("authStore", () => {
    const _user = ref<any>({});
    const fullName = computed(() => `${_user.value.firstName} ${_user.value.lastName}`);

    const init = () => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                getUserData(user.uid)
                router.push("/")
            } else {
                _user.value = {}
                router.replace("/auth");
            }
        })
    }

    const getUserData = async (uid: string) => {
        console.log("get user data")
        // Check if user exist in sessionStorage and set state
        if (sessionStorage.getItem("user")) {
            console.log("from local storage");

            const sessionItem: any = sessionStorage.getItem("user");
            const sessionUser: any = JSON.parse(sessionItem);

            _user.value.firstName = sessionUser.firstName;
            _user.value.lastName = sessionUser.lastName;
            _user.value.daysRemaining = sessionUser.daysRemaining;

            return;
        }

        // Get user from database and set state
        const docRef = doc(userRef, uid);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            _user.value.firstName = docSnap.data().first_name;
            _user.value.lastName = docSnap.data().last_name;
            _user.value.daysRemaining = docSnap.data().days_remaining;

            // Save user data in sessionStorage
            sessionStorage.setItem("user", JSON.stringify(_user.value));
        } else {
            // doc.data() will be undefined in this case
            console.log("No such document!");
        }
    }

    const loginHandler = (credentials: any) => {
        signInWithEmailAndPassword(auth, credentials.email, credentials.password)
            .then(async (userCredential) => {
                // Signed in 
                const user = userCredential.user;
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log("Error Code: ", errorCode);
                console.log("Error Message: ", errorMessage);
            });
    }

    const logoutHandler = () => {
        signOut(auth)
            .then(() => {
                // Clear user from sessionStorage
                if (sessionStorage.getItem("user")) {
                    sessionStorage.removeItem("user");
                }
            })
            .catch(error => {
                console.log("error ", error);
            })
    }

    return {
        _user,
        fullName,
        init,
        loginHandler,
        logoutHandler
    }
})
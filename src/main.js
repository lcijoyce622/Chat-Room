import { createApp} from 'vue'
import App from './App.vue'
// import "bootstrap/dist/css/bootstrap.min.css";
// import "bootstrap";
import BootstrapIcon from '@dvuckovic/vue3-bootstrap-icons';

import firebase from 'firebase'
import router from './router/index.js'

require("firebase/firestore");
var firebaseConfig = {
    apiKey: "AIzaSyDNCBU3TCldT2R3Qk22CRsKgKy-6HdSqw0",
    authDomain: "vue-chatroom-8284f.firebaseapp.com",
    projectId: "vue-chatroom-8284f",
    storageBucket: "vue-chatroom-8284f.appspot.com",
    messagingSenderId: "90281558685",
    appId: "1:90281558685:web:501da9a49fcc7013ebca74",
    measurementId: "G-TVMZ5YNHKT"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Get a reference to the database service


const app = createApp(App).use(router).use(router)
app.use(router)
app.component('BootstrapIcon', BootstrapIcon);

app.mount('#app')

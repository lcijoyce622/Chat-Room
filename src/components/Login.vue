<template>
  <div>
    <h3>Please Login with your google account to continue.</h3>
    <button @click="login">Login with google</button>
  </div>
</template>

<script>
import firebase from "firebase";
export default {
  methods: {
    login() {

      let provider = new firebase.auth.GoogleAuthProvider();
      firebase
        .auth()
        .signInWithPopup(provider)
        .then((result) => {
          let token = result.credential.accessToken;
          let user = result.user;
          console.log(token); // Token
          console.log(user); // User that was authenticated
          this.$router.push('/')
        })
        .catch((err) => {
          console.log(err,'錯誤'); // This will give you all the information needed to further debug any errors
        });
    },
  },
};
</script>

<style>
</style>
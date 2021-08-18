<template>
  <div class="container">
    <h1>Please Login with your google account to continue.</h1>
    <button class="btn" @click="login">Login with google</button>
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
          this.$router.push("/");
        })
        .catch((err) => {
          console.log(err, "錯誤"); // This will give you all the information needed to further debug any errors
        });
    },
  },
};
</script>

<style lang="scss" scope>
.container {
  margin-top: 20%;
    color: rgb(188, 236, 255);
    h1{
      font-weight: 600;
    }
  .btn {
    font-weight: 600;
      margin-top: 50px;
    font-size: 25px;
    position: relative;
    padding: 20px 50px;
    border-radius: 20px;
    border: 4px solid rgb(188, 236, 255);
    color: rgb(188, 236, 255);
  }
  .btn:before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 0;
    // height: 0;
      transition: all 0.1s;
    // background-color: rgb(188, 236, 255);
     background: linear-gradient(to right,  #86a8e7, rgb(188, 236, 255));
         border-radius: 20px;

    z-index: -1;
  }
  .btn:hover {
          border: 4px solid rgb(11, 73, 114);
      color: rgb(11, 73, 114);
    &:before {
      width: 100%;
      height: 100%;
    }
  }
}
</style>
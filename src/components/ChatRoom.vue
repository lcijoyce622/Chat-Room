<template>
  <div class="container col-8">
    <div class="messaging">
      <div class="inbox_msg">
        <div class="title_bar">
          <h3>Vue3 & Firebase Chat Room</h3>
        </div>
        <div class="msg_history">
          <div v-for="message in messages" :key="message.key">
            <div
              :class="[
                message.author == authUser.displayName
                  ? 'sent_msg'
                  : 'received_msg',
              ]"
            >
              <span class="name">{{ message.author }}</span>

              <div class="received_withd_msg">
                <img
                  class="incoming_msg_img"
                  :src="message.photo"
                  alt="sunil"
                />
                <p>{{ message.message }}</p>
                <span class="time_date">
                  {{ new Date(message.time).toLocaleDateString() }}
                  {{ new Date(message.time).toLocaleTimeString() }}
                </span>
              </div>
            </div>
          </div>
        </div>
        <div class="type_msg">
          <div class="input_msg_write">
            <input
              v-model="message"
              @keyup.enter="saveMessage"
              type="text"
              class="write_msg"
              placeholder="Type a message"
            />
            <button @click="saveMessage" class="msg_send_btn" type="button">
              <BootstrapIcon icon="cursor" />
            </button>
          </div>
        </div>
        <!-- </div> -->
      </div>
    </div>
  </div>
</template>

<script>
import firebase from "firebase";
export default {
  data() {
    return {
      message: null,
      messages: [],
      authUser: {},
    };
  },
  methods: {
    scrollToBottom() {
      let box = document.querySelector(".msg_history");
      box.scrollTop = box.scrollHeight;
    },
    saveMessage() {
      if (this.message == null || this.message == "") {
        return;
      }
      const key = firebase.database().ref("chat").push().key;
      firebase
        .database()
        .ref("chat")
        .child(key)
        .set({
          message: this.message,
          author: this.authUser.displayName,
          photo: this.authUser.photoURL,
          time: Date.now(),
          key,
        })
        .then(() => {
          console.log(this.authUser, this.messages);
          this.scrollToBottom();
        });
      this.message = null;
    },

    fetchMessage() {
      firebase
        .database()
        .ref()
        .child("chat")
        .on("value", (snapshot) => {
          let allMessages = [];
          snapshot.forEach((doc) => {
            allMessages.push(doc.val());
          });
          this.messages = allMessages;
          setTimeout(() => {
            this.scrollToBottom();
          }, 500);
        });
    },
  },
  created() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.authUser = user;
      } else {
        this.authUser = {};
      }
    });
    this.fetchMessage();
  },

  beforeRouteEnter(to, from, next) {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        next();
      } else {
        next("/login");
      }
    });
  },
};
</script>

<style lang="scss">
.container {
  margin: auto;
  .title {
    padding: 2vh;
  }
  .inbox_msg {
    border: 1px solid #c4c4c4;
    clear: both;
    overflow: hidden;
    background-color: rgba(0, 0, 0, 0.4);
    border-radius: 5px;
    p {
      border-radius: 3px;
      font-size: 14px;
      padding: 5px 10px 5px 12px;
      max-width: 70%;
      word-break: break-all;
      margin: 0;
    }
    .title_bar {
      padding: 15px 0;
      color: #f1f1f1;
      border-bottom: 1px solid #f1f1f1;
    }
    .msg_history {
      height: 80vh;
      overflow-y: auto;
      padding: 20px;
      .name {
        font-size: 12px;
        margin: 8px 0;
        color: #f1f1f1;
      }

      .received_withd_msg {
        .incoming_msg_img {
          border-radius: 50%;
          width: 2rem;
        }
        .time_date {
          color: #a7a7a7;
          display: block;
          font-size: 12px;
          margin: 8px 2.5rem;
        }
      }
      .received_msg {
        position: relative;
        text-align: left;
        //  clear: both;
        p {
          display: inline-block;

          background: #82ccdd none repeat scroll 0 0;
          margin-left: 2.5rem;
        }
       
        .incoming_msg_img {
          position: absolute;
          left: 0;
        }
      }
      .sent_msg {
        position: relative;
        // float: right;
        // clear: both;
        text-align: right;
        p {
          display: inline-block;
          background: #78e08f none repeat scroll 0 0;
          margin-right: 2.5rem;
        }

        .incoming_msg_img {
          position: absolute;
          right: 0;
          margin-left: 10px;
        }
      }
    }
    .type_msg {
      border-top: 1px solid #c4c4c4;
      position: relative;
      padding: 10px 50px 10px 10px;
      .input_msg_write {
        .write_msg {
          background: rgba(34, 34, 56, 0.589) none repeat scroll 0 0;
          border-radius: 10px;
          border: medium none;
          color: #f1f1f1;
          font-size: 15px;
          min-height: 48px;
          width: 100%;
        }

        .msg_send_btn {
          background: #739da7 none repeat scroll 0 0;
          border: medium none;
          border-radius: 50%;
          color: #fff;
          cursor: pointer;
          font-size: 17px;
          height: 33px;
          position: absolute;
          right: 10px;
          top: 15px;
          width: 33px;
        }
      }
    }
  }
}
</style>
<template>
  <div class="container col-8">
    <h3 class="title">Chat Room</h3>
    <div class="messaging">
      <div class="inbox_msg">
        <!-- <div class="inbox_people"> -->
        <!-- <div class="headind_srch">
            <div class="recent_heading">
              <h4>Recent</h4>
            </div>
            <div class="srch_bar">
              <div class="stylish-input-group">
                <input type="text" class="search-bar" placeholder="Search" />
                <span class="input-group-addon">
                  <button type="button">
                    <i class="fa fa-search" aria-hidden="true"></i>
                  </button>
                </span>
              </div>
            </div>
          </div> -->
        <!-- <div class="inbox_chat">
            <div class="chat_list active_chat">
              <div class="chat_people">
                <div class="chat_img">
                  <img
                    src="https://ptetutorials.com/images/user-profile.png"
                    alt="sunil"
                  />
                </div>
                <div class="chat_ib"></div>
              </div>
            </div>
          </div> -->
        <!-- </div> -->
        <!-- <div class="mesgs"> -->
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

//!重新把樣式寫過
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
    p {
      border-radius: 3px;
      font-size: 14px;
      padding: 5px 10px 5px 12px;
      max-width: 80%;
      word-break: break-all;
      margin: 0;
    }

    .msg_history {
      height: 80vh;
      overflow-y: auto;
      padding: 20px;
      .name {
        font-size: 12px;
        margin: 8px 0;
      }

      .received_withd_msg {
        .incoming_msg_img {
          border-radius: 50%;
          width: 2rem;
          // padding: 50px;
        }
        .time_date {
          color: #747474;
          display: block;
          font-size: 12px;
          margin: 8px 2.5rem;
        }
      }
      .received_msg {
        position: relative;
        text-align: left;
        p {
          background: #ebebeb none repeat scroll 0 0;

          margin-left: 2.5rem;
        }

        float: left;
        clear: both;
        .incoming_msg_img {
          // float: left;
          position: absolute;
          left: 0;
        }
      }
      .sent_msg {
        position: relative;
        float: right;
        clear: both;
        text-align: right;
        p {
          display: inline-block;
          background: #05728f none repeat scroll 0 0;
          color: #fff;
          margin-right: 2.5rem;
        }

        .incoming_msg_img {
          // float: right;
          // clear: both;
          position: absolute;
          right: 0;
          margin-left: 10px;
        }
      }
    }
    .type_msg {
      border-top: 1px solid #c4c4c4;
      position: relative;
      .input_msg_write {
        .write_msg {
          background: rgba(0, 0, 0, 0) none repeat scroll 0 0;
          border: medium none;
          color: #4c4c4c;
          font-size: 15px;
          min-height: 48px;
          width: 100%;
        }

        .msg_send_btn {
          background: #05728f none repeat scroll 0 0;
          border: medium none;
          border-radius: 50%;
          color: #fff;
          cursor: pointer;
          font-size: 17px;
          height: 33px;
          position: absolute;
          right: 0;
          top: 11px;
          width: 33px;
        }
      }
    }
  }
}
</style>
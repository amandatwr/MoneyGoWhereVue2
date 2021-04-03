<template>
  <div>
    <v-card id="profile">
      <div id="profile-container">
        <div class="avatar-container">
          <v-avatar
            class="avatar"
            color="grey"
            size="150"
            v-on:click="toggleChangePicture()"
          >
            <img v-bind:src="imageSource"
          /></v-avatar>
        </div>
        <h2 class="profile-header">{{name}}</h2>
        <div class='greeting-message'>
        <p class='intro'>Welcome to MoneyGoWhere! As a registered user, you can:</p>
        <p class='intro'>1. Add and edit any plans that you have saved under<br>2. View your personalised analytics dashboard<br>3. Find the best plans using our Savings Recommender</p>
                <p class='intro'>Click on your profile picture to change it!</p>

        </div>
        <div v-if="change">
          <input
            id="file-input"
            v-if="change"
            type="file"
            v-on:change="chooseFile"
          />
          <div class="container-login100-form-btn">
            <div class="wrap-login100-form-btn upload-button">
              <div class="login100-form-bgbtn"></div>
              <button class="login100-form-btn" v-on:click="upload">
                Upload
              </button>
            </div>
          </div>
        </div>
      </div>
    </v-card>
  </div>
</template>


<script>
import firebase from "firebase";
import database from './../firebase.js';

export default {
  data() {
    return {
      change: false,
      imageSource: null,
      file: null,
      name: ''
    };
  },
  components: {},
  methods: {
    fetchItems: async function (user) {
        database
        .collection("TestUsers")
        .doc(user.uid)
        .get()
        .then((querySnapShot) => {
            var data = querySnapShot.data()
            this.name = data.name
        })
        
      await firebase
        .storage()
        .ref("users/" + user.uid + "/user.png")
        .getDownloadURL()
        .then((imgURL) => {
          console.log(imgURL);
          this.imageSource = imgURL;
        })
        .catch((err) => {
          console.log(err.message);
          this.imageSource = require("./../assets/user.png");
        });
    },

    chooseFile: function (event) {
      var file = event.target.files[0];
      console.log(file);
      this.file = file;
    },

    upload: async function () {
      var uid = await firebase.auth().currentUser.uid;

      await firebase
        .storage()
        .ref("users/" + uid + "/user.png")
        .put(this.file)
        .then(() => {
          console.log("profile picture succesfully uploaded");
        })
        .catch((err) => {
          console.log(err.message);
        });
      location.reload();
    },

    toggleChangePicture: function () {
      this.change = !this.change;
    },
  },
  created() {
    var user = firebase.auth().currentUser;
    this.fetchItems(user);
  },
};
</script>

<style>
@import "./../css/util.css";
@import "./../css/main.css";

#profile {
  width: 275px;
  height: 700px;
}

.profile-header {
  text-align: center;
}

.avatar-container {
  margin: 20px;
  display: flex;
  justify-content: center;
  align-content: center;
}
.avatar {
  color: grey;
}

#file-input {
  padding-left: 13px;
}

#profile-container {
  padding: 30px;
}

.upload-button {
  width: 195px;
}

.greeting-message {
    margin: 10px 0;
    padding: 0 10px;
}

.intro {
    text-align: center;
}
</style>
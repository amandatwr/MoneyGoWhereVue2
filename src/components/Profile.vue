<template>
  <div>
    <v-card id="profile">
      <div id="profile-container">
        <div class="avatar-container flex" v-on:click="change = !change">
          <v-avatar
            class="avatar"
            color="grey"
            size="150"
           @mouseover="hover=true" @mouseleave="hover=false"
           
          >
            <img v-bind:src="imageSource" />
           </v-avatar
          > <div class="hover" v-if='hover'>
              <img class='change-picture-button' src='./../assets/edit.png' v-on:click='change=!change'/>
            </div>
        </div>
        <h2 class="profile-header">{{ name }}</h2>
        <div class="greeting-message">
        <p class="intro">{{email}}</p>
          <p class="intro">
            Welcome to MoneyGoWhere, <br>{{ name }}! <br>
          </p>
          <!-- <p class='intro'>1. Add and edit any plans that you have saved under<br>2. View your personalised analytics dashboard<br>3. Find the best plans using our Savings Recommender</p>
                <p class='intro'>Click on your profile picture to change it!</p> -->
        </div>
        <div v-if="change">
          <input class='overflow-hidden'
            id="file-input"
            v-if="change"
            type="file"
            v-on:change="chooseFile"
          />
              <div class='button-container flex'><button class=
            'button' v-on:click="upload">
                Upload
              </button>
              </div>
            </div>
      </div>
    </v-card>
   
  </div>
</template>


<script>
import firebase from "firebase";
import database from "./../firebase.js";

export default {
  data() {
    return {
      change: false,
      imageSource: null,
      file: null,
      name: "",
      email: '',
      hover: false,
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
          var data = querySnapShot.data();
          this.name = data.name;
          this.email = data.email
        });

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

<style scoped>
@import "./../css/util.css";
@import "./../css/main.css";

#profile {
  width: 250px;
  height: 530px;
}

.profile-header {
  text-align: center;
}

.flex {
  display: flex;
  justify-content: center;
}

.avatar-container {
  margin: 20px;
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
  margin: 10px 0 35px 0;
  padding: 0 10px;
}

.intro {
  text-align: center;
  padding: 0;
  margin: 0;
}

.avatar > img:hover {
  filter: brightness(40%)
}

.hover {
  position: absolute;
  margin: 63px  0 0 12px;
}

.hover > img {
  height: 25px;
}

.button {
    font-family: Poppins-Regular;
    background-color: white;
    color: #545454;
    border: 1px solid grey;
    align-items: center;
    display: inline-block;
    padding: 13px 45px;
}

.button:hover {
    background-color: #192841;
    color: white
}

.button-container {
  margin-top: 20px;
}
</style>
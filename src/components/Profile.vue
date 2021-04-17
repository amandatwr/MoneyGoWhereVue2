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
              <v-icon medium color='white' >mdi-pencil</v-icon>
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
          <input
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
    <v-card class="my-goal-card">
        <div class='my-goal-wrapper'>
<v-card-actions class='icon'>
            <!-- Provide a tooltip for the edit and close button -->
            <v-tooltip bottom>
              <template v-slot:activator="{ on: tooltip }">
                <!-- When the button is clicked, we flip the component state into show_form state. Setting planAmount forces planAmount to be updated always when the edit button is pressed -->
                <v-btn
                  icon
                  v-on="{ ...tooltip }"
                  @click="
                    show_form = !show_form;
                  "
                >
                  <v-icon v-if="show_form">mdi-close</v-icon>
                  <v-icon v-else>mdi-pencil</v-icon>
                </v-btn>
              </template>
              <span v-if="show_form">Cancel</span>
              <span v-else>Edit</span>
            </v-tooltip>
          </v-card-actions>
          <div class='flex'>
          <div class='my-goal flex'>
          <!-- <h2 class='my-goal-amount'>{{this.formatter().format(goal)}}</h2> -->
          <div class="display-1" v-if="!show_form">
            {{ this.formatter().format(goal) }}
          </div>
          <v-text-field
            type="number"
            class='test'
            v-else
            v-model="updatedGoal"
            prefix="$"
          >
            <!-- v-text-field allows for appended elements. We put a tooltip and button there -->
            <template v-slot:append-outer>
              <v-tooltip bottom>
                <template v-slot:activator="{ on: tooltip }">
                  <v-btn
                    icon
                    color="success"
                    v-on="{ ...tooltip }"
                    @click="editGoal"
                  >
                    <v-icon>mdi-content-save</v-icon>
                  </v-btn>
                </template>
                <span>Save</span>
              </v-tooltip>
            </template>
          </v-text-field>
          </div>
          </div>
          <div class='subheading'> 
          <p>My Savings Goal</p>
          </div>
          <div v-if="error">
              <p class="alert">Invalid input amount.</p>
            </div>
          </div>
          <div class='color-strip color1'></div>
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
      goal: null,
      show_form: false,
      updatedGoal: null,
      error: false
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
          this.goal = data.goal
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

    formatter: function () {
      return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
        minimumFractionDigits: 2,
      })
    },

    editGoal: function() {
      if (this.updatedGoal < 0) {
        this.error = true;
      } else {
      var uid = firebase.auth().currentUser.uid;

      firebase
        database.collection("TestUsers").doc(uid).update({
        goal: parseFloat(this.updatedGoal)
      }).then(() => {
          console.log('goal edited')
        })
        .catch((err) => {
          console.log(err.message);
        }).then( () => {
          location.reload();
        })
      }
    }
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
  /* height: 530px; */
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
  margin-top: 10px;
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

.my-goal-card {
  margin-top: 20px;
}

.color1 {
  background-color: #282726
}

.color-strip {
  height: 15px;
  padding: 0;
  margin: 0;
  width: 100%;
}

.subheading > p{
  text-align: center;
  font-size: 12px;
  padding: 0;
  margin-top: 3px;
}

.my-goal-wrapper {
  padding: 15px 10px 0px 10px;
}

.icon {
  position:absolute;
  top:-4px;
  right: -4px;
}

.my-goal {
  margin-top: 20px;
  width:75%;
}

.my-goal-amount {
  font-size: 35px;
}

.test {
  margin: -15px 0px -11px 0px;
}
</style>
<template>
  <div class="addNew">
    <div class="tooltip">
    <button class="addButton" @click="show_form = !show_form"></button>
      <span class="tooltiptext">
      Click here to add a plan to your dashboard!
      </span>
    </div>
    <div v-if="show_form" class="centerimg2">
      <!-- when the form is submitted, add the plan to the database -->
      <!-- .prevent prevents the submission event from "reloading" the page -->
      <v-card class="card">
        <br />
        <form @submit.prevent="addPlan">
          <label>Add a Plan: </label>
          <!-- Bidirectionally bind planSelect to this select element -->
          <select v-model="planSelect" class="drawbox">
            <option
              v-for="plan in plans"
              v-bind:key="plan.name"
              v-bind:value="plan.id"
            >
              {{ plan.name }}
            </option>
            <!-- <option value="other">Other</option> -->
          </select>

          <!-- Bidirectionally bind planAmount -->
          <br />
          Amount:
          <input
            type="number"
            v-model="planAmount"
            placeholder="Enter Amount Saved"
          />
          <br /><br />
          <button type="submit"
            class="submitbutton"
          >
            Submit
          </button>
          <div v-if='error'><p class='alert'>{{this.errorMessage}}</p></div>
        </form>
      </v-card>
    </div>
    <br /><br /><br />
  </div>
</template>

<script>
import db from "../firebase.js";
import firebase from "firebase";

export default {
  data() {
    return {
      show_form: false,
      plans: [],
      planSelect: "",
      planName: "",
      planInterest: "",
      planMinYrs: "",
      planAmount: 0,
      planProvider: "",
      planID: "",
      error: false,
			errorMessage: 'Invalid input Amount.'
    };
  },
  methods: {
    camelize: function (str) {
      return str.replace(/(?:^\w|[A-Z]|\b\w|\s+)/g, function (match, index) {
        if (+match === 0) return ""; // or if (/\s+/.test(match)) for white spaces
        return index === 0 ? match.toLowerCase() : match.toUpperCase();
      });
    },

    fetchItems: function () {
      db.collection("Listings")
        .get()
        .then((querySnapShot) => {
          let list = {};
          querySnapShot.forEach((doc) => {
            list = doc.data();
            list.id = doc.id;
            this.plans.push(list);
          });
        });
    },
    // Event handler for form submission
    addPlan: async function () {
      var user = firebase.auth().currentUser;
      console.log(user)

      var currentDate = new Date();

      if (parseFloat(this.planAmount) > 0) {
      await db.collection("TestUsers")
        .doc(user.uid)
        .update({
          plans: firebase.firestore.FieldValue.arrayUnion({
            amount: parseFloat(this.planAmount),
            dateSaved: currentDate,
            planID: this.planSelect,
          }),
          
        }).then(this.$emit('wantPlanUpdate'))
        location.reload();
    } else {
        this.error =true;
    }

    },
  },
  

  created() {
    this.fetchItems();
  },
};
</script>

<style scoped>
.alert {
	margin-top: 20px;
	color: red;
}

.banner-buttons {
  width: 100%;
  padding: 0px 180px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  text-align: center;
}

.addButton {
  background-image: url("../assets/addiconsq.png");
  background-size: 64px 64px;
  height: 66px;
  width: 67px;
  color: black;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 10px;
}

/* button {
    background-color: white;
    color: #545454;
    border: 1px solid grey;
    align-items: center;
    display: inline-block;
    padding: 13px 28px;
} */

button:hover {
    background-color: #192841;
    color: white
}

.addNew {
  text-align: center;
  margin-left: auto;
  margin-right: auto;
  width: 70%;
  font-size: 18px;
  justify-content: center;
  font-family: Optima;
}

.centerimg2 {
  display: block;
  margin-left: auto;
  margin-right: auto;
  width: 60%;
}

.card {
  margin: 0px 20px;
  padding: 5%;
  height: 200px;
}

.drawbox {
  border-bottom: 2px solid grey;
  width: 150px;
}

.submitbutton {
  border: 1px solid grey;
  background-color: white;
  color: #545454;
  align-items: center;
  display: inline-block;
}



.tooltip {
  position: relative;
  display: inline-block;

}

.tooltip .tooltiptext {
  visibility: hidden;
  width: 300px;
  background-color: black;
  color: #fff;
  text-align: center;
  border-radius: 6px;
  padding: 5px 0;
  position: absolute;
  z-index: 1;
  bottom: 100%;
  left: 50%;
  margin-left: -150px;
  
  /* Fade in tooltip - takes 1 second to go from 0% to 100% opac: */
  opacity: 0;
  transition: opacity 1s;
}

.tooltip:hover .tooltiptext {
  visibility: visible;
  opacity: 1;
}


</style>

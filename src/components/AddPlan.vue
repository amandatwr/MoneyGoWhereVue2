<template>
  <div class="addNew">
    <div class="tooltip">
    <button @click="show_form = !show_form; togglePopup()">Add a Plan</button>
      <span class="tooltiptext">
      Click here to add a plan to your dashboard!
      </span>
    </div>
    <div class="popup" id="popup-1">
            <div class="overlay"></div>
            <div class="content">
                <div class="close-btn" @click="togglePopup">&times;</div>
                <div class="centerimg2">
                <!-- when the form is submitted, add the plan to the database -->
                <!-- .prevent prevents the submission event from "reloading" the page -->
                <!-- <v-card class="card"> -->
                  
                  <form @submit.prevent="addPlan">
                    <h2> Add a Plan </h2><br>
                    <label>Plan Name: </label>
                    <!-- Bidirectionally bind planSelect to this select element -->
                    <select v-model="planSelect" class="drawbox" style="width:300px">
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
                      style="width:200px; padding-top:20px;"
                      placeholder="Enter Amount Saved"
                    />
                    <br><br>
                    <button type="submit"
                      class="submitbutton"
                    >
                      Add
                    </button>
                    <div v-if='error'><p class='alert'>{{this.errorMessage}}</p></div>
                  </form>
                <!-- </v-card> -->
              
              </div>
            </div>
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
			errorMessage: "Invalid input amount."
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
    togglePopup: function() {
            document.getElementById("popup-1").classList.toggle("active");
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
  margin-bottom: -5%;
}

.banner-buttons {
  width: 100%;
  padding: 0px 180px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  text-align: center;
}

.input{
  padding : 20px;
  margin-top:10px;
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

button {
    background-color: white;
    color: #545454;
    border: 1px solid grey;
    align-items: center;
    display: inline-block;
    padding: 13px 28px;
}

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
  font-family: Poppins-Regular;
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
  font-family: Poppins-Regular;
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

.popup .overlay {
    position: fixed;
    top: 0px;
    left: 0px;
    width: 100vw;
    height: 100vh;
    background: rgba(0, 0, 0, 0.7);
    z-index: 1;
    display: none;
    overflow: auto;
}

.popup .content {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%) scale(0);
    background: #fff;
    width: 700px;
    max-height: 560px;
    z-index: 2;
    text-align: center;
    padding: 10px 10px 40px 10px;
    box-sizing: border-box;
    font-family: "Open Sans", sans-serif;
    overflow: auto;
}

.popup .close-btn {
    cursor: pointer;
    position: sticky;
    left: 95%;
    top: 0%;
    width: 40px;
    height: 40px;
    background: #222;
    color: #fff;
    font-size: 25px;
    font-weight: 600;
    line-height: 40px;
    text-align: center;
    border-radius: 50%
}

.popup.active .overlay {
    display: block;
}

.popup.active .content {
    transition: all 300ms ease-in-out;
    transform: translate(-50%, -50%) scale(1);
}


</style>

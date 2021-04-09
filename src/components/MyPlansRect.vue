<template>
  <div>
    <v-card class="myplan-card">
      <div class="a">
        <button
          v-bind:id="plan.id"
          class="editButton"
          v-on:click="show_form = !show_form"
        ></button>
        <!-- @submit.prevent="delItems" -->
        <button
          v-bind:id="plan.id"
          class="delButton"
          v-on:click="delItems()"
        ></button>
      </div>
      <div class="tooltip">
        <!-- <img src=plan.image width= "120" height="100"> -->
        <p id="name">
          <b>{{ plan.name }}</b>
        </p>
        <p id="provider">{{ plan.provider }}</p>
        <h3 text-align:center id="amount">{{ plan.amount }}</h3>
        <span class="tooltiptext">
          Interest Rate: {{ plan.interest }}<br />Capital Guaranteed:
          {{ plan.capital_guaranteed }}<br />
          Min. no. of Years: {{ plan.min_years }}</span
        >
      </div>
    </v-card>

    <div v-if="show_form">
      <!-- when the form is submitted, edit plan amount to the database -->
      <!-- .prevent prevents the submission event from "reloading" the page -->
      <v-card class="editcard">
        <form @submit.prevent="editAmount">
          <label> Edit Amount: </label>
          <input
            type="number"
            min="0"
            v-model="planAmount"
            placeholder="Enter Value"
          />
        </form>
      </v-card>
    </div>
  </div>
</template>


<script>
import database from "../firebase.js";
import firebase from "firebase";

export default {
  name: "MyPlan",
  props: {
    item: Object,
    plan: Object,
    myIndex: Number,
  },
  data() {
    return {
      textValue: "",
      plans: [],
      show_form: false,
      planAmount: 0,
      plansRaw: [],
      havePlans: false,
    };
  },
  methods: {
    fetchItems: function () {
      // Log user account creation date
      var user = firebase.auth().currentUser;
      var signupDate = new Date(user.metadata.creationTime);
      var currDate = new Date();
      this.days = this.getDateDiff(currDate, signupDate);

      database
        .collection("TestUsers")
        .doc(user.uid)
        .get()
        .then((querySnapShot) => {
          var plans = querySnapShot.data().plans;
          this.plansRaw = plans;
          // if (this.plans != null) {
          //   this.havePlans = true;
          // }
          for (let i = 0; i < plans.length; i++) {
            var planID = plans[i].planID;
            database
              .collection("Listings")
              .doc(planID)
              .get()
              .then((listing) => {
                var listingDetails = listing.data();
                var planDetails = {};
                planDetails["name"] = listingDetails.name;
                planDetails["provider"] = listingDetails.provider;
                planDetails["interest"] = this.round(
                  100 * listingDetails.interest_pa,
                  2
                );
                planDetails["image"] = listingDetails.image;
                planDetails["capital_guaranteed"] =
                  listingDetails.capital_guaranteed;
                planDetails["min_years"] = listingDetails.min_years;
                planDetails["amount"] = this.formatter().format(
                  plans[i].amount
                );
                planDetails["dateSaved"] = plans[i].dateSaved
                  .toDate()
                  .toLocaleDateString();
                planDetails["dateWithdraw"] = this.getReturnsDate(
                  plans[i].dateSaved.toDate(),
                  listingDetails.min_years
                ).toLocaleDateString();
                this.plans.push(planDetails);
              });
          }
        });
    },
    editAmount: async function () {
      // console.log(this.myIndex);
      // console.log(typeof parseFloat(this.planAmount));
      this.plansRaw[this.myIndex].amount = parseFloat(this.planAmount);
      // console.log(this.plansRaw);
      var user = firebase.auth().currentUser;
      await database.collection("TestUsers").doc(user.uid).update({
        plans: this.plansRaw,
      });
      location.reload();
      // alert('updated')
    },

    delItems: async function () {
      this.plansRaw.splice(this.myIndex, 1);
      var user = firebase.auth().currentUser;
      await database.collection("TestUsers").doc(user.uid).update({
        plans: this.plansRaw,
      });
      location.reload();
    },

    round: function (value, decimals) {
      return Number(
        Math.round(value + "e" + decimals) + "e-" + decimals
      ).toFixed(decimals);
    },
    getReturnsDate: function (dateSaved, numYears) {
      return new Date(
        dateSaved.setFullYear(new Date().getFullYear() + numYears)
      );
    },

    getDateDiff: function (from, to) {
      // console.log(from, to);
      return Math.floor((from - to) / 86400000);
    },

    formatter: function () {
      return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
        minimumFractionDigits: 2,
      });
    },
  },
  created() {
    this.fetchItems();
  },
};
</script>

<style scoped>
#a {
  display: inline-block;
  vertical-align: middle;
}

.editButton {
  /* border: solid; */
  background-image: url("../assets/editplan.png");
  background-size: contain;
  background-repeat: no-repeat;
  height: 6px;
  /* width: 16px; */
  max-width: 6px;
  color: black;
  display: inline-block;
  margin-left: 700px;
  /* margin-bottom: 270px; */
  margin-top: 15px;
  margin-right: 0px;
  vertical-align: middle;
}

.delButton {
  /* border: solid; */
  background-image: url("../assets/delbutton.png");
  background-size: contain;
  background-repeat: no-repeat;
  height: 16px;
  width: 5px;
  color: black;
  display: inline-block;
  margin-left: 0px;
  /* margin-bottom: 270px; */
  margin-top: 15px;
  margin-right: 0px;
  vertical-align: middle;
}

.tooltip {
  position: relative;
  display: inline-block;
  height: 200px;
  width: 30em;
  vertical-align: middle;
  /* border: solid;
  border-color: #e1c9c5; */
}

.tooltip .tooltiptext {
  visibility: hidden;
  width: 200px;
  background-color: black;
  color: #fff;
  text-align: center;
  border-radius: 6px;
  padding: 5px 0;
  position: absolute;
  z-index: 1;
  top: -5px;
  left: 110%;
  vertical-align: middle;
  /* margin-left: -100px; */
}

.tooltip .tooltiptext::after {
  content: "";
  position: absolute;
  /* bottom: 100%;
  left: 50%; */
  top: 50%;
  right: 100%; /* To the left of the tooltip */
  margin-top: -5px;
  border-width: 5px;
  border-style: solid;
  border-color: transparent black transparent transparent;
  vertical-align: middle;
}

.tooltip:hover .tooltiptext {
  visibility: visible;
}

h6 {
  color: black;
  text-align: center;
  text-justify: auto;
}

#listings {
  /* padding-top: 100px; */
  text-align: center;
}

#name {
  font-size: 18px;
  white-space: nowrap;
  text-align: center;
}

#provider {
  font-size: 14px;
  white-space: nowrap;
  text-align: center;
}

ul {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
}

li {
  flex: 1 0 25%;
  margin: 15px;
  width: 10%;
}

p {
  margin-top: 0px;
  margin-bottom: 10px;
  margin-left: auto;
  margin-right: auto;
}

/* #flex-container {
  display:flex;
  flex-flow: row wrap;
  justify-content: space-around;
  padding: 0;
  margin: 0;
  list-style: none;

}

#flex-item{
  padding: 5px;
  margin-top: 10px;
  line-height: 150px;
  color: white;
} */

.myplan-card {
  /* margin: 0 25px; */
  height: 200px;
  width: 110% !important;
  /* padding-top: 35px; */
}
</style>

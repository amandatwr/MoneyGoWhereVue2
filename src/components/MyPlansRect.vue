<template>
  <div>
    <v-card>
    <!-- Each plan is a card -->
    <div class="d-flex flex-no-wrap">
      <!-- Put the image on the left -->
      <v-img class="rounded-l" :src="plan.image" max-width="250" />
      <!-- Put the content on the right -->
      <div class="flex-grow-1">
        <!-- Content should take up as much space (flex-grow) -->

        <!-- In the content, we have the title, subtitle and action buttons -->
        <div class="d-flex">
          <!-- Put the title and subtile on the left of the action buttons -->
          <div class="flex-grow-1">
            <!-- Title and subtitle should take up as much space (flex-grow) -->
            <v-card-title class="prevent-break">{{ plan.name }}</v-card-title>
            <v-card-subtitle>{{ plan.provider }}</v-card-subtitle>
          </div>

          <!-- Put the action buttons on the right -->
          <v-card-actions>
            <!-- Provide a tooltip for the edit and close button -->
            <v-tooltip bottom>
              <template v-slot:activator="{ on: tooltip }">
                <!-- When the button is clicked, we flip the component state into show_form state. Setting planAmount forces planAmount to be updated always when the edit button is pressed -->
                <v-btn
                  icon
                  v-on="{ ...tooltip }"
                  @click="
                    show_form = !show_form;
                    planAmount = plan.amount;
                  "
                >
                  <v-icon v-if="show_form">mdi-close</v-icon>
                  <v-icon v-else>mdi-pencil</v-icon>
                </v-btn>
              </template>
              <span v-if="show_form">Cancel</span>
              <span v-else>Edit</span>
            </v-tooltip>

            <!-- Provide a tooltip for the delete button -->
            <v-tooltip bottom>
              <template v-slot:activator="{ on: tooltip }">
                <v-btn
                  icon
                  color="error"
                  v-on="{ ...tooltip }"
                  @click="deletePlan"
                >
                  <v-icon>mdi-delete</v-icon>
                </v-btn>
              </template>
              <span>Delete</span>
            </v-tooltip>
          </v-card-actions>
        </div>

        <!-- Show amount under the title, subtitle and action buttons -->
        <v-card-text class="fixed-height">
          <!-- If not in the show_form state, show a formatted version of the currency -->
          <div class="display-1" v-if="!show_form">
            {{ plan.amount }}
          </div>
          <!-- If in the show_form state, show text input with a save button -->
          <v-text-field
            type="number"
            class="pt-0"
            v-else
            v-model="planAmount"
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
                    @click="editAmount"
                  >
                    <v-icon>mdi-content-save</v-icon>
                  </v-btn>
                </template>
                <span>Save</span>
              </v-tooltip>
            </template>
          </v-text-field>
        </v-card-text>
      </div>
    </div>
  </v-card>
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
      var user = firebase.auth().currentUser;
      await database.collection("TestUsers").doc(user.uid).update({
        plans: this.plansRaw,
      });
      location.reload();
      // alert('updated')
    },

    deletePlan: async function () {
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

    formatter: function (value, currency = "USD") {
      return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency,
        minimumFractionDigits: 2,
      }).format(value);
    },

    // formatter: function () {
    //   return new Intl.NumberFormat("en-US", {
    //     style: "currency",
    //     currency: "USD",
    //     minimumFractionDigits: 2,
    //   });
    // },
  },
  created() {
    this.fetchItems();
  },
};
</script>

<style scoped>
.fixed-height {
  /* Keep a fixed height for the textarea and amount, reducing jumping */
  height: 5.5em;
}
.prevent-break {
  word-break: break-word;
}

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

.button{
  margin:0px;
  padding:0px;
}

.displayImage {
  margin:20px;
  height: 40px;
  width: 40px;
}

.content {
  margin:auto;
}

.flexWrap {
  display: inline-block;
  flex: 1 1 25%;
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




#name {
  font-size: 18px;
  white-space: nowrap;

}

#provider {
  font-size: 14px;
  white-space: nowrap;
 
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

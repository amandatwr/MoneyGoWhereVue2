<template>
  <div>
    <AccountBanner></AccountBanner>
    
    <div class="flex">
      <div class="flex2">
      <Profile class="profile"></Profile>
       <v-card class="my-progress-card ">
        <div class='my-progress-card-contents flex align-vertical-center'>
          <div class="header-container my-progress-text">
            <h2 class="my-progress-text"><b>My Goal</b></h2>
            <br><br>
          </div>
          <div
            class="progress-bar-container align-vertical-center flex flex-vertical"
          ><br>
            <v-progress-linear
              :rounded="true"
              :height="20"
              :value="value"
              color="#192841"
            ></v-progress-linear> <br>
            <p>{{ this.formatter().format(projectedReturns) }} of {{this.formatter().format(goal)}}</p>
          </div><br>
          <div>
            <h3 class='poppins'>{{ Math.round(value * 100) / 100 }}%</h3>
          </div>
          </div>
        </v-card>
        </div>

      <div class="container">
        
        <v-card class="test" min-width="85%">
          <div class="header-container padding-top-30">
            <h1>My Savings Plans</h1>
          </div>
          <div class="savings">
            <EditPlan></EditPlan>
            <br />
            <AddPlan v-on:wantPlanUpdate="fetchItems" />
          </div>
        </v-card>
      </div>
      <!-- <EditGoals></EditGoals> -->
      <!-- <br><br><br><br><br><br> -->
    </div>
  </div>
</template>

<script>
// import EditGoals from "./EditGoals.vue";
import Profile from './Profile.vue';
import AddPlan from "./AddPlan.vue";
import AccountBanner from './AccountBanner.vue'
import EditPlan from "./EditPlan.vue";
import db from "../firebase.js";

import database from "../firebase.js";
import firebase from "firebase";

export default {
  data() {
    return {
        plans:[],
        value: 0,
        goal: null,
        projectedReturns: 0
    };
  },

components: {
    // EditGoals: EditGoals,
    AddPlan: AddPlan,
    Profile: Profile,
    AccountBanner: AccountBanner,
    EditPlan: EditPlan,
  },


   methods: {
    fetchItems: async function () {
      this.plans=[];
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

      await database
        .collection("TestUsers")
        .doc(firebase.auth().currentUser.uid)
        .get()
        .then((querySnapShot) => {
          this.goal = querySnapShot.data().goal
          console.log(this.goal)
          var plans = querySnapShot.data().plans
          for ( let i = 0 ; i < plans.length ; i++ ) {
            this.hasPlans = true;
            var planID = plans[i].planID
            database
              .collection("Listings")
              .doc(planID)
              .get()
              .then((listing) => {
                var listingDetails = listing.data();
                this.projectedReturns += plans[i].amount * listingDetails.interest_pa * listingDetails.min_years
                this.value += plans[i].amount * listingDetails.interest_pa * listingDetails.min_years/ this.goal * 100
              })}
        });          
    },
    formatter: function () {
      return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
        minimumFractionDigits: 2,
      })
    }
},

  created() {
    this.fetchItems();
  },
};
</script>

<style scoped>
@font-face {
  font-family: "Poppins-Medium";
  src: local("Poppins-Medium"),
   url(../fonts/poppins/Poppins-Medium.ttf) format("truetype");
}

.flex {
  display: flex;
  padding: 50px 50px;
}

.flex2 {
  display: flex;
  /* margin: 10px; */
  /* padding: 50px 50px; */
  flex-direction:column;
}

.profile {
  margin-right: 25px;
}

.header-container {
  display: flex;
  justify-content: center;
}

.container {
  padding: 0;
  margin: 0;
  width: 90%;
}

.progress-bar-container {
  height: 100px;
  width: 100%;
  padding: 40px 40px 0 0px;
}

.my-progress-card {
  margin-top: 20px;
  width:250px;
}

.align-vertical-center {
  align-items: center;
  justify-content: center;
}

.my-progress-text {
  width: 150px;
}

.flex-vertical {
  flex-direction: column;
}

.my-progress-card-contents {
  padding: 0px 10%;
}

.padding-top-30 {
  padding-top: 30px;
}

.poppins {
  font-family: 'Poppins-Medium';
}
</style>

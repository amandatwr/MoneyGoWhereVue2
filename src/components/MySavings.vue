<template>
  <div>
  <AccountBanner></AccountBanner>
    <div class='flex'>
    <Profile class='profile'></Profile>
    <div class='container'>
    <v-card class='my-progress-card flex align-vertical-center'>
    <div class='header-container my-progress-text'>
    <h3 class='my-progress-text'>My Progress</h3>
    </div>
    <div class='progress-bar-container align-vertical-center flex'>
     <v-progress-linear
      :rounded="true"
      :height="20"
      :value="value"
      color="#192841"
      
    ><template v-slot="{ value }">
        <strong>{{value}}%</strong>
      </template></v-progress-linear>
    </div>
    </v-card>
    <v-card class='test'
    min-width='85%'>
    <div class='header-container'>
    <h1>My Savings</h1>
    </div>
    <div class='savings'>
    <EditPlan></EditPlan>
    <br>
    <AddPlan  v-on:wantPlanUpdate="fetchItems" />
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
        goal: null
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
                this.value += plans[i].amount * listingDetails.interest_pa / this.goal * 100
              })}
        });          
    },
    
  },

  created() {
    this.fetchItems();
  },
};
</script>

<style scoped>
.flex {
  display: flex;
  padding: 50px 50px;
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

.test {
  padding:0;
  margin: 0;
}

.progress-bar-container {
  height: 100px;
  width: 100%;
  padding: 0 40px;
}

.my-progress-card {
  margin-bottom: 20px;
}

.align-vertical-center {
  align-items: center;
}

.my-progress-text {
  width: 175px;
  padding-left: 20px;
}
</style>

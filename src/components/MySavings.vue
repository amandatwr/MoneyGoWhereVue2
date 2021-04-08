<template>
  <div>
  <AccountBanner></AccountBanner>
    <div class='flex'>
    <Profile class='profile'></Profile>
    <div class='container'>
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

// import database from "../firebase.js";
// import firebase from "firebase";

export default {
  data() {
    return {
        plans:[],
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
    fetchItems: function () {
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

</style>

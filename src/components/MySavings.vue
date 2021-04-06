<template>
  <div>
  <AccountBanner></AccountBanner>
    <div class='flex'>
    <Profile class='profile'></Profile>
    <v-card>
    <div class='header-container'>
    <h1>My Savings</h1>
    </div>
    <div class='savings'>
    <MyPlansRect/>
    <br><br><br>
    <AddPlan></AddPlan>
    </div>
    </v-card>
    <!-- <EditGoals></EditGoals> -->
    <!-- <br><br><br><br><br><br> -->
    </div>
    </div>
</template>

<script>
// import EditGoals from "./EditGoals.vue";
import Profile from './Profile.vue'
import MyPlansRect from "./MyPlansRect.vue";
import AddPlan from "./AddPlan.vue";
import AccountBanner from './AccountBanner.vue'
// import database from "../firebase.js";
// import firebase from "firebase";

export default {
  data() {
    return {
        
    };
  },

components: {
    // EditGoals: EditGoals,
    MyPlansRect: MyPlansRect,
    AddPlan: AddPlan,
    Profile: Profile,
    AccountBanner: AccountBanner
  },


   methods: {
    fetchItems: function () {
    } 
    
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

</style>

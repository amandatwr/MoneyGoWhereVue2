<template>
  <div>
    <br><br><br>
    <h1>My Savings</h1>
    <div class='flex'>
    <Profile></Profile>
    <div class='savings'>
    <EditPlan></EditPlan>
    <br><br><br>
    <AddPlan></AddPlan>
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
import EditPlan from "./EditPlan.vue";
// import database from "../firebase.js";
// import firebase from "firebase";

export default {
  data() {
    return {
        
    };
  },

components: {
    // EditGoals: EditGoals,
    AddPlan: AddPlan,
    Profile: Profile,
    EditPlan: EditPlan,
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
}

</style>

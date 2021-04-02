<template>
  <div>
    <br><br><br>
    <h1>My Savings</h1>
    <MyPlansRect/>
    <br><br><br>
    <AddPlan></AddPlan>
    <!-- <EditGoals></EditGoals> -->
    <!-- <br><br><br><br><br><br> -->
    </div>
</template>

<script>
// import EditGoals from "./EditGoals.vue";
import MyPlansRect from "./MyPlansRect.vue";
import AddPlan from "./AddPlan.vue";
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

</style>

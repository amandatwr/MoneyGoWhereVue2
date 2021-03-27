<template>
  <div>
    <br><br><br>
    <h1>My Savings</h1>
    <br><br><br>
    <MyPlansRect/>
    <h6 v-for="name in plans" v-bind:key="name">
            <p id="name">{{name}}</p>
    </h6>
    <br><br><br>
    <EditGoals></EditGoals>
    <br><br><br><br><br><br>
    </div>
</template>

<script>
import EditGoals from "./EditGoals.vue";
import MyPlansRect from "./MyPlansRect.vue";
import database from "../firebase.js";
import firebase from "firebase";

export default {
  data() {
    return {
        
    };
  },

components: {
    EditGoals: EditGoals,
    MyPlansRect: MyPlansRect,
  },


   methods: {
    fetchItems: function () {
      // Log user account creation date
      var user = firebase.auth().currentUser;
      var signupDate = new Date(user.metadata.creationTime);
      var currDate = new Date();
      this.days = this.getDateDiff(currDate, signupDate);
      this.accCreationDate = this.getAccCreationDate(signupDate);

      database
        .collection("TestUsers")
        .doc(user.uid)
        .get()
        .then((doc) => {
          let plans = doc.data().plans;
          Object.entries(plans).forEach(([key, value]) => {
            var copy = Object.assign({}, value);
            database
              .collection("Listings")
              .doc(key)
              .get()
              .then((listing) => {
                var listingDetails = listing.data();
                // console.log(listingDetails)
                copy["name"] = listingDetails.name;
                copy["provider"] = listingDetails.provider;
                copy["amount"] = this.formatter().format(value.amount);
                // console.log(value.dateSaved.toDate())
                copy['dateSaved'] = value.dateSaved.toDate().toLocaleDateString()
                this.plans.push(copy);
              });
          });
        })
    },

    getAccCreationDate: function (dateObj) {
      var month = dateObj.getUTCMonth() + 1;
      var day = dateObj.getUTCDate();
      var year = dateObj.getUTCFullYear();
      console.log(day, month, year);
      return day.toString() + "/" + month.toString() + "/" + year.toString();
    },

    
  },

  created() {
    this.fetchItems();
  },
};
</script>

<style scoped>

</style>

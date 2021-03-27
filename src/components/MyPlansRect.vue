<template>

<div class="tooltip">
  <h6 v-for="description in myPlans" v-bind:key="description">
            <p id="name">Plan Name:{{doc_id}}</p>
  </h6>
  <br><br>
    <input v-model="textValue" placeholder="input amount">
  <span class="tooltiptext">Provider: {fetch this}<br> Interest Rate: {fetch this}<br>Capital Guaranteed: {T/F}<br> Min. years:{fetch this}</span>
<br><br>
</div>
</template>


<script>
import database from "../firebase.js";
import firebase from "firebase";

export default {
    name: 'MyPlan',
  props: {
      item: Object
  },
  data() {
    return {
      myPlans:[],
      
      
    }
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
            // console.log(key);
            // console.log(value.amount);
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
  },
    created() {
    this.fetchItems();
  },
       
}
</script>

<style>
.tooltip {
  position: relative;
  display: inline-block;
  height: 150px;
  width: 150px;
  background-color: #e1c9c5;
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
  top: 120%;
  left: 50%;
  margin-left: -100px;
}

.tooltip .tooltiptext::after {
  content: "";
  position: absolute;
  bottom: 100%;
  left: 50%;
  margin-left: -5px;
  border-width: 5px;
  border-style: solid;
  border-color: transparent transparent black transparent;
}

.tooltip:hover .tooltiptext {
  visibility: visible;
}

</style>

<template>
<div id="listings">
  <div class="w3-row" style="padding:20px 50px 50px 50px">
  
      
      <ul style="padding:0px">
          <li v-for="plan in plans" v-bind:key="plan">
            <div class="tooltip">
              <div class="w3-col s4 w3-center" style="padding:30px">
                  <p id="name"><b>{{plan.name}}</b></p>
                  <p id="provider">{{plan.provider}}</p>
                  <h3 text-align:center id = "amount"> {{plan.amount}}</h3>
                  <span class="tooltiptext"> Interest Rate: {{plan.interest}}<br>Capital Guaranteed: {{plan.capital_guaranteed}}<br> Min. no. of Years: {{plan.min_years}}</span>
              </div>
            </div>
          </li>
      </ul>
  
  </div>
    <!--<input v-model="textValue" placeholder="input amount">-->
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
      textValue:"",
      plans: [],      
    }
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
          var plans = querySnapShot.data().plans
          for ( let i = 0 ; i < plans.length ; i++ ) {
            var planID = plans[i].planID
            database
              .collection("Listings")
              .doc(planID)
              .get()
              .then((listing) => {
                var listingDetails = listing.data();
                var planDetails = {}
                planDetails["name"] = listingDetails.name;
                planDetails["provider"] = listingDetails.provider;
                planDetails["interest"] = this.round((100 * (listingDetails.interest_pa)), 2);
                planDetails["capital_guaranteed"] = listingDetails.capital_guaranteed;
                planDetails["min_years"] = listingDetails.min_years;
                planDetails["amount"] = this.formatter().format(plans[i].amount);
                planDetails['dateSaved'] = plans[i].dateSaved.toDate().toLocaleDateString();
                planDetails['dateWithdraw'] = this.getReturnsDate(plans[i].dateSaved.toDate(), listingDetails.min_years).toLocaleDateString();
                this.plans.push(planDetails);
          
        })}
    
    });

    },
    

    round: function (value, decimals) {
        return Number(Math.round(value +'e'+ decimals) +'e-'+ decimals).toFixed(decimals);
    },
     getReturnsDate: function (dateSaved, numYears) {
                return (new Date(
                  dateSaved.setFullYear(new Date().getFullYear() + numYears)
                ))
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
  }
       
}
</script>

<style>
.tooltip {
  position: relative;
  display: inline-block;
  height: 200px;
  width: 20em;
  border: solid;
  border-color: #e1c9c5;
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
  top: 100%;
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

h6 {
  color: black;
  text-align: center;
  text-justify: auto;
  
}

#listings {
    padding-top: 100px;
    text-align:center;
}

#name {
    font-size: 18px;
    white-space: nowrap;
    text-align:center;
}

#provider {
    font-size: 14px;
    white-space: nowrap;
    text-align:center;
}

ul{
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;

}

li {
  flex: 1 0 21%;
  margin: 15px;
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
</style>

<template>
<div>
  <br><br><br><br><br><br>
  <div id="goals">
    <span> End goal: 
      <form>
        <textarea v-model="endVal" rows="1" cols="5"></textarea>
      </form>
    <div class ="newbutton" v-on:click="move()">Update</div>
    <div id="myProgress">
      <div id="myBar">{{totalReturns}}</div>
    </div>
    </span>
  </div>
  <br><br><br><br><br><br>
  </div>
</template>


<script>
//npm install -S k-progress
//import KProgress from "k-progress";
//Vue.component("k-progress", KProgress);
import database from "../firebase.js";
import firebase from "firebase";


export default {
  data() {
      return{
          endVal: 0,
          i : 0,
          id: 0,
          totalSavings: 0,
          plans:[],
          totalEndowment: 0,
        capitalGuaranteed: 0,
        projectedReturns: 0,
        returnsGuaranteed: 0,
        totalReturns:0,
        movePercent:0,
      };
    
  },
  methods: {
      
    move: function () {
      if (this.i == 0) {
        this.i = 1;
        this.id = setInterval(this.frame, 10);
      }
    },
    frame: function () {
        var elem = document.getElementById("myBar");
        var width = 10;
        var movePercent = this.totalReturns / this.endVal * 100;
          if (width >= movePercent) {
            clearInterval(this.id);
            this.i = 0;
          } else {
            width++;
            elem.style.width = width + "%";
            elem.innerHTML = width + "%";
          }
        },
      
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
                planDetails["amount"] = this.formatter().format(plans[i].amount);
                planDetails['dateSaved'] = plans[i].dateSaved.toDate().toLocaleDateString();
                planDetails['dateWithdraw'] = this.getReturnsDate(plans[i].dateSaved.toDate(), listingDetails.min_years).toLocaleDateString();
                this.plans.push(planDetails);

                this.totalEndowment += plans[i].amount;
                this.projectedReturns += plans[i].amount * listingDetails.interest_pa;
                //reduce((a, b) => a + b, 0)
                this.totalReturns += plans[i].amount + this.projectedReturns;
                if (listingDetails.returns_guaranteed) {
                  this.returnsGuaranteed += plans[i].amount * listingDetails.interest_pa;
                }
                if (listingDetails.capital_guaranteed) {
                  this.capitalGuaranteed += plans[i].amount
                }
              })}
        });
           
          
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
  },
};
</script>

<style scoped>
#goals {
  width: 300px;
  height: 100px;
  border: 1px;
  background-color: #e1c9c5;
  text-align: center;
  font-family: "Times New Roman", serif;
  font-size: 25px;
  padding: 5px;
  margin: 5px;
  font-weight: bold;
}



div {
  width: 100%;
}

p {
  position: inline-block;
  text-align: center;
}

#myProgress {
  width: 100%;
  background-color: #e1c9c5;
  border-radius: 20px;
}

#myBar {
  width: 10%;
  height: 30px;
  background-color: #cc5241;
  border-radius: 20px;
  text-align: center;
  line-height: 30px;
  color: white;
}

label {
  font-size: 20px;
}

#newbutton {
    background-color: white;
    color: #545454;
    border: 1px solid grey;
    align-items: center;
    display: inline-block;
}

</style>

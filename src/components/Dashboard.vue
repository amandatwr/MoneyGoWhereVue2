<template>
  <div class='outline'>
    <div class="dashboard">
    <div class="chart-title"><h1>Analytics Overview</h1></div>
      <div class="dashboard-row first-row-alignment">
        <v-card class="card first-row">
          <!-- <div class="icon total-savings-icon">
            <img class="icon-image" src="./../assets/summation.png" />
          </div> -->
          <div class="content">
            <div class="heading">
              <h2>{{ this.formatter().format(totalEndowment) }}</h2>
            </div>
            <div class="subheading"><p>Total Endowment</p></div>
            
          </div>
          <div class='color-strip color1'></div>
          
        </v-card>
        <v-card class="card first-row">
          <div class="icon total-savings-icon">
          </div>
          <div class="content">
            <div class="heading">
              <h2>{{ this.formatter().format(capitalGuaranteed) }}</h2>
            </div>
            <div class="subheading"><p>Capital Guaranteed</p></div>
          </div>
          <div class='color-strip color2'></div>
        </v-card>
        <v-card class="card first-row">
          <div class="content">
            <div class="heading">
              <h2>{{ this.formatter().format(projectedReturns) }}</h2>
            </div>
            <div class="subheading"><p>Total Projected Returns (PR)</p></div>
          </div>
          <div class='color-strip color3'></div>
        </v-card>
        <v-card class="card first-row">
          <div class="content">
            <div class="heading">
              <h2>{{ this.formatter().format(returnsGuaranteed) }}</h2>
            </div>
            <div class="subheading"><p>PR Guaranteed</p></div>
          </div>
          <div class='color-strip color4'></div>
        </v-card>
      </div>

      <div class="dashboard-row">
        <v-card class="card market-performance-card">
        <h2 class="heading">Summary</h2>
          <v-data-table
            :items="plans"
            :headers="headers"
            hide-default-footer
            :items-per-page="4"
            :page.sync="page"
            @page-count="pageCount = $event"
            
          ></v-data-table>
           <div class="text-center pt-2">
      <v-pagination
        v-model="page"
        :length="pageCount"
      ></v-pagination>
    </div>
        </v-card>
        <v-card class="card savings-distribution-card">
        <h2>My Goal</h2>
        <v-progress-circular class='progress-bar'
      :rotate="90"
      :size="225"
      :width="12.5"
      :value="value"
      color="#282726"
    ><h2>Progress<br>{{ Math.round(value * 100) / 100}}%</h2>
   
      
    </v-progress-circular>
     <p>You are at {{this.formatter().format(projectedReturns)}} of {{this.formatter().format(goal)}}</p>
</v-card>
      </div>

      <div class="dashboard-row last-row">
        <v-card class="card market-performance-card">
          <market-performance
            class="market-performance-canvas"
          ></market-performance
        ></v-card>
        <v-card class="card savings-distribution-card"
          >
          <h2>Savings Distribution</h2>
          <div v-if='!hasPlans'><p>No data available</p></div>
          <savings-distribution v-if='hasPlans'
            class="savings-distribution-canvas"
          ></savings-distribution
        ></v-card>
      </div>
    </div>
  </div>
</template>

<script>
import database from "../firebase.js";
import firebase from "firebase";
import MarketPerformance from "../charts/marketperformance.js";
import SavingsDistribution from "../charts/savingsdistribution.js";
export default {
  data() {
    return {
      totalEndowment: 0,
      capitalGuaranteed: 0,
      projectedReturns: 0,
      returnsGuaranteed: 0,
      goal: 0,
      page: 1,
        pageCount: 0,
      headers: [
        { text: "Plan Name", value: "name" },
        { text: "Plan Provider", value: "provider" },
        { text: "Amount Saved", value: "amount" },
        {text: 'Date Saved', value: 'dateSaved'},
        { text: 'Earliest Withdrawal', value: 'dateWithdraw'}
      ],
      hasPlans: false,
      plans: [],
      value: 0,
    };
  },
  components: {
    MarketPerformance,
    SavingsDistribution,
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
                var planDetails = {}
                planDetails["name"] = listingDetails.name;
                planDetails["provider"] = listingDetails.provider;
                planDetails["amount"] = this.formatter().format(plans[i].amount);
                planDetails['dateSaved'] = plans[i].dateSaved.toDate().toLocaleDateString();
                planDetails['dateWithdraw'] = this.getReturnsDate(plans[i].dateSaved.toDate(), listingDetails.min_years).toLocaleDateString();
                this.plans.push(planDetails);
                this.totalEndowment += plans[i].amount;
                this.projectedReturns += plans[i].amount * listingDetails.interest_pa;
                this.value += plans[i].amount * listingDetails.interest_pa / this.goal * 100
                
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

<style>
.dashboard {
  text-align: center;
  margin-top: 85px;
}
.dashboard-row {
  padding: 25px;
  width: 100%;
  display: flex;
  overflow: hidden;
  justify-content: center;
}
.card {
  margin: 0 25px;
  padding: 3%;
  height: 375px;
  padding-top: 0;
}
.market-performance-card {
  width: 60%;
  padding-top: 35px;
}
.market-performance-canvas {
  height: 275px;
  width: 100%;
}
.progress-bar-card {
  width: 30%;
  padding: 0;
  margin: 0;
}
.savings-distribution-card {
  width: 30%;
  padding-top: 30px;
}
.savings-distribution-canvas {
  height: 300px;
  padding: 0;
  margin-top: 0;
}
.last-row {
  margin-bottom: 25px;
}
.first-row {
  height: 110px;
  width: 20% !important;
  padding: 0;
}
/* .first-row-alignment {
  padding-left: 35px;
  padding-right: 35px;
} */
.heading {
  text-align: center;
  padding: 0;
  margin: -5px 0;
}
.heading > h2 {
  font-size: 40px !important;
  font-style: bold;
}
.subheading > p{
  text-align: center;
  font-size: 12px;
  padding: 0;
  margin: 0;
}
.icon {
  width: 100px;
  border-bottom-left-radius: 4px !important;
  border-top-right-radius: 0 !important;
  display: flex;
  align-items: center;
  justify-content: center;
  /* margin: 5px; */
}
.color-strip {
  height: 15px;
  padding: 0;
  margin: 0;
  width: 100%;
}
.color1 {
  background-color: #282726 !important;
}
.color2 {
  background-color: #a7414a !important;
}
.color3 {
  background-color: #6a8a82 !important;
}
.color4 {
  background-color: #a37c27 !important;
}
.content {
  color: black;
  padding: 12.5px;
}
.icon > img {
  max-height: 60%;
}
.v-data-footer {
  display: flex !important;
  justify-items: center;
  flex-direction: row !important; 
  /* height: 50px;
  overflow: hidden; */
}
.v-data-footer__select {
  display: none;  width: 100% !important;
}
.text-centre {
  font-size: 50px;
}
.progress-bar {
  margin: 10px 0 20px 0;
}
</style>
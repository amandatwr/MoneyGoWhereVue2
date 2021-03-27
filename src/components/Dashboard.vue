<template>
  <div>
    <h1>Dashboard</h1>
    
    <div class="chart-title"><h1>Bar Chart</h1></div>
    <div class="dashboard">
    <div class="chart-title"><h1>My Dashboard</h1></div>
      <div class="dashboard-row first-row-alignment">
        <v-card class="card first-row">
          <!-- <div class="icon total-savings-icon">
            <img class="icon-image" src="./../assets/summation.png" />
          </div> -->
          <div class="content">
            <div class="heading">
              <h2>{{ this.formatter().format(totalSavings) }}</h2>
            </div>
            <div class="subheading"><p>Total Endowment</p></div>
            
          </div>
          <div class='color-strip'></div>
          
        </v-card>
        <v-card class="card first-row">
          <div class="icon total-savings-icon">
          </div>
          <div class="content">
            <div class="heading">
              <h2>{{ this.formatter().format(totalSavings) }}</h2>
            </div>
            <div class="subheading"><p>Capital Guaranteed</p></div>
          </div>
        </v-card>
        <v-card class="card first-row">
          <div class="content">
            <div class="heading">
              <h2>{{ this.formatter().format(totalEarnings) }}</h2>
            </div>
            <div class="subheading"><p>Total Projected Returns (PR)</p></div>
          </div>
        </v-card>
        <v-card class="card first-row">
          <div class="content">
            <div class="heading">
              <h2>{{ this.formatter().format(totalEarnings / days) }}</h2>
            </div>
            <div class="subheading"><p>PR Guaranteed</p></div>
          </div>
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
        <v-card class="card savings-distribution-card"></v-card>
      </div>

      <div class="dashboard-row last-row">
        <v-card class="card market-performance-card">
          <market-performance
            class="market-performance-canvas"
          ></market-performance
        ></v-card>
        <v-card class="card savings-distribution-card"
          ><savings-distribution
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
      totalSavings: 0,
      totalEarnings: 0,
      accCreationDate: null,
      days: null,
      loaded: false,
      items: [],
      itemsSelected: [],
      page: 1,
        pageCount: 0,
      headers: [
        { text: "Plan Name", value: "name" },
        { text: "Plan Provider", value: "provider" },
        { text: "Amount Saved", value: "amount" },
        {text: 'Date Saved', value: 'dateSaved'}
      ],
      plans: [],
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
  margin: 65px 65px 0px 65px;
  text-align: center;
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
}

.market-performance-card {
  width: 60%;
  padding-top: 35px;
}

.market-performance-canvas {
  height: 275px;
  width: 100%;
}

.savings-distribution-card {
  width: 30%;
}

.savings-distribution-canvas {
  height: 300px;
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
  background-color: chocolate !important;
  height: 15px;
  padding: 0;
  margin: 0;
  width: 100%;
}

.total-savings-icon {
  background-color: #f78888;
}

.total-earnings-icon {
  background-color: #5da2d5;
}

.average-earnings-icon {
  background-color: #f3d250;
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

</style>


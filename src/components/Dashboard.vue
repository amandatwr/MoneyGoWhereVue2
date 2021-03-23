<template>
  <div>
    <h1>Dashboard</h1>
    <EditGoals></EditGoals>
    <div id="itemsList">
      <ul>
        <li v-bind:key="item" v-for="item in items">
          <h1 id="itemName">{{ item.name }}</h1>
          <img :src="item.imageURL" />
          <br />
          <div id="price">{{ "$" + item.price }}</div>
          <br />
          <MyPlansRect v-bind:item = "item" vue: v-on:counter="onCounter"/>
        </li>
      </ul>
    </div>
    <div class="chart-title"><h1>Bar Chart</h1></div>
    <div class="dashboard">
      <div class="dashboard-row">
        <v-card class="card first-row">
          <div class="icon total-savings-icon">
            <img class="icon-image" src="./../assets/summation.png" />
          </div>
          <div class="content">
            <div class="heading">
              <h2>{{ this.formatter().format(totalSavings) }}</h2>
            </div>
            <div class="subheading"><p>Total Savings</p></div>
          </div>
        </v-card>
        <v-card class="card first-row">
          <div class="icon total-earnings-icon">
            <img class="icon-image" src="./../assets/dollar.png" />
          </div>
          <div class="content">
            <div class="heading">
              <h2>{{ this.formatter().format(totalEarnings) }}</h2>
            </div>
            <div class="subheading"><p>Total Earnings Per Annum</p></div>
          </div>
        </v-card>
        <v-card class="card first-row">
          <div class="icon average-earnings-icon">
            <img class="icon-image" src="./../assets/slash.png" />
          </div>
          <div class="content">
            <div class="heading">
              <h2>{{ this.formatter().format(totalEarnings / days) }}</h2>
            </div>
            <div class="subheading"><p>Average Earnings Per Day</p></div>
          </div>
        </v-card>
      </div>

      <div class="dashboard-row">
        <v-card class="card market-performance-card">
          <v-data-table
            :items="plans"
            :headers="headers"
            :disable-items-per-page="true"
            :items-per-page="1"
            height="200px"
            :footer-props="{
              disableItemsPerPage: true
            }"
          ></v-data-table>
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
    <v-data-table></v-data-table>
  </div>
</template>

<script>
import EditGoals from "./EditGoals.vue";
import MyPlansRect from "./MyPlansRect.vue";
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
      headers: [
        { text: "Plan Name", value: "name" },
        { text: "Plan Provider", value: "provider" },
        { text: "Amount Saved", value: "amount" },
      ],
      plans: [],
    };
  },

  components: {
    MarketPerformance,
    SavingsDistribution,
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
            console.log(key);
            console.log(value.amount);
            var plans = Object.assign({}, value);
            database
              .collection("Listings")
              .doc(key)
              .get()
              .then((listing) => {
                var listingDetails = listing.data();
                plans["name"] = listingDetails.name;
                plans["provider"] = listingDetails.Provider;
                plans["amount"] = this.formatter().format(value.amount);
                this.plans.push(plans);

                this.totalSavings +=
                  listing.data().InterestPA * value.amount + value.amount;
                this.totalEarnings += listing.data().InterestPA * value.amount;
              });
          });
        })
        .then(() => {
          console.log(this.plans);
        });
    },

    getAccCreationDate: function (dateObj) {
      var month = dateObj.getUTCMonth() + 1;
      var day = dateObj.getUTCDate();
      var year = dateObj.getUTCFullYear();
      console.log(day, month, year);
      return day.toString() + "/" + month.toString() + "/" + year.toString();
    },

    getDateDiff: function (from, to) {
      console.log(from, to);
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

  // computed: {
  //   headers: function() {
  //     return [
  //       {text: 'Plan Name', value: 'plans'},
  //       {text: 'Plan Provider', value: 'providers'},
  //       {text: 'Amount Saved', value: 'amount'}
  //     ]
  //   }

  // },

  created() {
    this.fetchItems();
  },
};
</script>

<style>
#dashboard {
  margin-top: 65px;
  text-align: center;
  width: 100%;
}

.chart-title {
  text-align: center;
  margin-top: 200px;
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
  width: 180%;
}

.market-performance-canvas {
  height: 300px;
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
  height: 100px;
  /* background-color: # !important; */
  width: 30%;
  color: white !important;
  padding: 0;
  display: flex;
}

.heading {
  text-align: center;
  padding: 0;
  margin: -5px 0;
}

.heading > h2 {
  font-size: 40px !important;
  font-style: bold;
}

.subheading {
  text-align: center;
  font-size: 12px;
  padding: 0;
  margin: 0;
}

.icon {
  width: 110px;
  border-bottom-left-radius: 4px !important;
  border-top-right-radius: 0 !important;
  display: flex;
  align-items: center;
  justify-content: center;
  /* margin: 5px; */
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
  padding: 15px;
}

.icon > img {
  max-height: 60%;
}

/* .v-data-footer {
  display: inline-flex !important;
  flex-direction: row !important; 
flex-flow: row nowrap;
  height: 50px;
  overflow: hidden;
} */

/* .v-data-footer__select {
  visibility: hidden;
} */
</style>


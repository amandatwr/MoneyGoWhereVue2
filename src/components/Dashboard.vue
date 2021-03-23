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
          Total Savings 
          ${{ totalSavings }}
        </v-card>
        <v-card class="card first-row"> Total Earnings
        ${{ totalEarnings }}</v-card>
        <v-card class="card first-row">
        ${{Math.round(totalEarnings / days * 100) / 100}} </v-card>
      </div>

      <div class="dashboard-row">
        <v-card class="card savings-distribution-card">
          Since your account creation on {{ accCreationDate }}
          {{ totalSavings }}
          {{ totalEarnings }}
          {{ days }}
        </v-card>
        <v-card class="card savings-distribution-card"
          ><savings-distribution
            class="savings-distribution-canvas"
          ></savings-distribution
        ></v-card>
        <v-card class="card savings-distribution-card"
          ><savings-distribution
            class="savings-distribution-canvas"
          ></savings-distribution
        ></v-card>
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
      items: [],
      itemsSelected: [],
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
            database
              .collection("Listings")
              .doc(key)
              .get()
              .then((listing) => {
                this.totalSavings += Math.round((listing.data().InterestPA * value.amount + value.amount) * 100) / 100
                this.totalEarnings += Math.round(listing.data().InterestPA * value.amount * 100) / 100
                });
              });
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
  },

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
  height: 150px;
  background-color: #424242 !important;
  width: 30%;
  color: white !important;
}
</style>


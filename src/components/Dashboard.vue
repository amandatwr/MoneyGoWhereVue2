<template>
  <div id="dashboard">
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
    <div class="dashboard-row">
      <v-card class="card market-performance-card">
      <market-performance class='market-performance-canvas'></market-performance></v-card>
      <v-card class="card savings-distribution-card" 
        ><savings-distribution class='savings-distribution-canvas'></savings-distribution
      ></v-card>
    </div>
  </div>
</template>

<script>
import EditGoals from "./EditGoals.vue";
import MyPlansRect from "./MyPlansRect.vue";
import database from "../firebase.js";
import MarketPerformance from "../charts/marketperformance.js";
import SavingsDistribution from "../charts/savingsdistribution.js";

export default {
  data() {
    return {
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
      database
        .collection("menu")
        .get()
        .then((querySnapShot) => {
          let item = {};
          querySnapShot.forEach((doc) => {
            item = doc.data();
            item.show = false;
            this.items.push(item);
          });
        });
    },
    created() {
      this.fetchItems();
    },
  },
};
</script>

<style>

#dashboard {
  margin-top: 65px;
  text-align: center;
  width: 100%
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
  margin: 25px;
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
</style>


<template>
  <div id='dashboard'>
    <h1>Dashboard</h1>
    <EditGoals></EditGoals>
    <div id='itemsList'>
            <ul>
                <li v-bind:key="item" v-for="item in items">
                    <h1 id='itemName'>{{item.name}}</h1>
                    <img :src="item.imageURL"/>
                    <br>
                    <div id='price'>{{"$"+item.price}}</div>  
                    <br>
<MyPlansRect v-bind:item = "item" vue: v-on:counter="onCounter"/>
                </li>
            </ul>
        </div>
    <div class="chart-title"><h1>Bar Chart</h1></div>
    <div id='dashboard-row-1' class='dashboard-row'>
    <v-card class='sti'><market-performance></market-performance></v-card>
    <v-card>Some other nonsense</v-card>
    </div>
  </div>
</template>

<script>
import EditGoals from "./EditGoals.vue";
import MyPlansRect from "./MyPlansRect.vue";
import database from "../firebase.js";
import MarketPerformance from "../charts/marketperformance.js";

export default{
  data() {
    return {
      items:[],
      itemsSelected: [],
    };
  },

  components: {
    MarketPerformance,
    EditGoals: EditGoals,
    MyPlansRect: MyPlansRect,
  },

  methods: {
    fetchItems: function() {
                database.collection('menu').get().then((querySnapShot)=>{
                    let item={}
                    querySnapShot.forEach(doc=>{
                        item=doc.data()
                        item.show=false
                        this.items.push(item)
                    })
                })
            },
        created() {
            this.fetchItems()
        }
  }
}


</script>

<style>
#dashboard {
    margin-top: 65px;
    text-align: center;
}

.chart-title {
    text-align: center;
    margin-top: 200px; 
}

.sti {
  width: 100%;
  height: 500px;
}

.dashboard-row {
  margin:2%;
  padding: 25px;
}

#dashboard-row-1 {
  display: flex;
  width: 95%;
}
</style>


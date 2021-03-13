<template>
  <div id='dashboard'>
    <h1>Dashboard</h1>
    <div class="chart-title"><h1>Bar Chart</h1></div>
    <bar-chart></bar-chart>
  </div>
</template>

<script>

import BarChart from "./../charts/barchart.js";


export default {
  components: {
    BarChart
  }
};

</script>

<style>
#dashboard {
    margin-top: 65px;
    text-align: center;
}

.chart-title {
    text-align: center;
}
</style>


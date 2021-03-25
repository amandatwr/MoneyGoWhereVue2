<template>
<div class="tooltip">Plan Name: {fetch this}
    <input v-model="textValue" placeholder="input amount">
  <span class="tooltiptext">Provider: {fetch this}<br> Interest Rate: {fetch this}<br>Capital Guaranteed: {T/F}<br> Min. years:{fetch this}</span>
</div>
</template>


<script>
export default {
    name: 'MyPlan',
  props: {
      item: Object
  },
  data() {
    return {
      title: 'Plan',
      amount: 0,
      textValue: "",
      
    }
  }, 
  methods: {
    editAmount() {
      this.amount = this.textValue;
      
    }, 
    }
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

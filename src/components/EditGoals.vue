<template>
    <div id='goals'>
 
    <div id="ex2">
      <label> My Goals: <label>
      <select v-model="time">
        
        <option value="Financial Independence in shortest possible time">Financial Independence in shortest possible time</option>
        <option value="Long term stable passive income">Long term stable passive income</option>
        <option value="Short term highest risk investment">Short term highest risk investment</option>
      </select>
      <br>
      <p v-if="this.time != null">{{time}}</p>
 
    </div>   
    </div>
</template>


<script>
export default {

  data() {
    time: null
  }
};



</script>

<style>
#goals {
  width: 500px;
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

#ex2 {
  display: inline-block;
  text-align: center;
  position: center;
    
}

div{
  width: 100%;
}

p {
  position: inline-block;
  text-align: center;
}

</style>

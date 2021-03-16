<template>
  <div id="goals">
    <h1>My Goals</h1>
    <div id="ex5">
      <form>
        <label>End goal: </label>
        <textarea v-model="endVal" rows="1" cols="5"></textarea><br />
        <button v-on:click="move()">Update</button>
      </form>
    </div>
    <br /><br />
    <div id="myProgress">
      <div id="myBar"></div>
    </div>
  </div>
</template>


<script>
//npm install -S k-progress
//import KProgress from "k-progress";
//Vue.component("k-progress", KProgress);

export default {
  data() {
      return{
          endVal: 0,
          i : 0,
          id: 0,
          currVal: 0,

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
        
          if (width >= this.currVal) {
            clearInterval(this.id);
            this.i = 0;
          } else {
            width++;
            elem.style.width = width + "%";
            elem.innerHTML = width + "%";
          }
        },
      
    
  },
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

#ex5 {
  display: inline-block;
  text-align: center;
  position: center;
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
  text-size: 20px;
}
</style>

<template>
<div class="tooltip" v-bind:key = "plan">Plan Name: {{planRect.key}}
<!-- v-for="plan in planRect" -->
    <input v-model="textValue" placeholder="input amount">
  <span class="tooltiptext">Provider: {fetch this}<br> Interest Rate: {fetch this}<br>Capital Guaranteed: {T/F}<br> Min. years:{fetch this}</span>
</div>
</template>


<script>
import firebase from 'firebase';
import database from '../router/index.js'


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
      planRect: [],
      doc_id: this.$route.params.id,
      
    }
  }, 
  methods: {
    editAmount() {
      this.amount = this.textValue;
      
    },
    
    fetchUser: function() {
      var user = firebase.auth().currentUser;
      var signupDate = new Date(user.metadata.creationTime);
      var currDate = new Date();
      console.log(user);
      console.log(signupDate);
      console.log(currDate);
      console.log(user.uid);
    },

    fetchPlan: function() {
      let doc_id = this.$route.params.id;
      database.collection('TestUsers').doc(doc_id).get().then((querySnapShot) => {
                this.planRect.push(querySnapShot.data())
            })
      Object.entries(this.planRect).forEach(([key, value]) => console.log(`${key}: ${value}`)); 
    },
    created() {
      this.fetchUser()
      this.fetchItems()
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

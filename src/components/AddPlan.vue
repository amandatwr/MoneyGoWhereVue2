<template>
   <div class = "addNew">
      <button id = "addButton"
        @click="show_form = true"
      >
      </button>

    <div v-if="show_form" class="centerimg2">
      <form id="add-plan-form">
          <label>Add a Plan: </label>
                <select v-model="planSelect" >
                    <option v-for="plan in plans"  v-bind:key="plan.name" v-bind:value="plan.name">{{plan.name}}</option>
                    <option value="other">Other</option>
                </select>
                <p v-if="this.planSelect != other">You are adding {{planSelect}}</p>
                <p v-if="this.planSelect == other">
                    <input type="text" name="planName" placeholder= "Enter Plan Name">
                    <input type="text" name="planInterest" placeholder= "Enter Interest Rate">
                    <input type="text" name="planMinYrs" placeholder= "Enter Minimum No. of Years">
                </p>
      
          
          <input type ="text" name="amount" placeholder="Enter Amount Saved">
          <button>Add Plan</button>
      </form>
    </div>
    </div>

       

</template>

<script>
import db from "../firebase.js";
import firebase from "firebase";
export default {
    data() {
        return{
            show_form: false,
            planes:[],
        };
    },

    components: {

    },

    methods: {
        fetchItems: function() {
            let doc_id = this.$route.params.id;
            db.collection('Listings').doc(doc_id).get().then((querySnapShot) => {
                this.plans.push(querySnapShot.data())
            })
        },
        setItems: function () {
        var user = firebase.auth().currentUser;
        var form = document.querySelector('#add-plan-form');

        
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            db.collection('TestUsers').doc(user.uid).add({
                //here, should add the existing plan using planSelect value instead
                planID: form.planSelect.value,
                amount: form.amount.value

            });

            db.collection('Listings').doc(user.uid).add({
                //here, new plans will be added into our list?? 
                name: form.planName.value,
                min_years: form.planMinYrs.value,
                interest_pa: form.planInterest.value,
            });
            
            form.plans.planName.value= '';
            form.plans.amount.value='';
        })
        }
    },

    created() {
        this.fetchItems();
    }

    
};

</script>


<style scoped>

.banner-buttons {
  width: 100%;
  padding: 0px 180px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  text-align: center;
}

.addButton {
    background-image: "./../assets/add-new(1).png";
    background-size: 64px 64px;
    height: 100px;
    width: 100px;
}

.addNew {
    text-align: center;
    margin-left: auto;
    margin-right: auto;
    width: 60%;
}

.centerimg2 {
  display: block;
  margin-left: auto;
  margin-right: auto;
  width: 60%;
}

</style>
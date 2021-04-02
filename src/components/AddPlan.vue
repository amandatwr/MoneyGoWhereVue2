<template>
   <div class = "addNew">
      <button id = "addButton"
        @click="show_form = true"
      >
      </button>

    <div v-if="show_form" class="centerimg2">
      <form id="add-plan-form">
          <input type="text" name="planName" placeholder= "Enter Plan Name">
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
            
        };
    },

    components: {

    },

    methods: {
        
        setItems: function () {
        var user = firebase.auth().currentUser;
        var form = document.querySelector('#add-plan-form');

        
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            db.collection('TestUsers').doc(user.uid).add({
                planID: form.planName.value,
                amount: form.amount.value
            });
            form.plans.planName.value= '';
            form.plans.amount.value='';
        })
        }
    },

    created() {
        this.setItems;
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
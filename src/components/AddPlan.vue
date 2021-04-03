<template>
	<div class="addNew">
		<button class="addButton" @click="show_form = true"></button>
		<div v-if="show_form" class="centerimg2">
			<!-- when the form is submitted, add the plan to the database -->
			<!-- .prevent prevents the submission event from "reloading" the page -->
			<v-card class="card"> 
            <form @submit.prevent="addPlan">
				<label>Add a Plan: </label>
				<!-- Bidirectionally bind planSelect to this select element -->
				<select v-model="planSelect" class="drawbox">
					<option v-for="plan in plans" v-bind:key="plan.name" v-bind:value="plan.name">{{plan.name}}</option>
					<option value="other">Other</option>
				</select>
                <br><br>
				<div v-if="planSelect != 'other'">
					You are adding {{planSelect}}
				</div>
				<div v-else>
					<!-- The user wants to add a new plan -->
					<!-- Bidirectionally bind planName, planInterest, planMinYrs to these input elements -->
					<input type="text" v-model="planName" placeholder="Enter Plan Name">
                    <br>
                    <input type="text" v-model="planProvider" placeholder="Enter Plan Provider">
                    <br>
					<input type="text" v-model="planInterest" placeholder="Enter Interest Rate">
                    <br>
					<input type="text" v-model="planMinYrs" placeholder="Enter Minimum No. of Years">
				</div>

				<!-- Bidirectionally bind planAmount -->
				<input type="text" v-model="planAmount" placeholder="Enter Amount Saved">
				<br><br>
                <button class= "submitbutton" type="submit">Add Plan</button>
			</form>
            </v-card>
		</div>
        <br><br><br>
	</div>
</template>

<script>
import db from "../firebase.js";
import firebase from "firebase";

export default {
    data() {
        return {
            show_form: false,
            plans: [],
			planSelect: '',
			planName: '',
			planInterest: '',
			planMinYrs: '',
			planAmount: '',
            planProvider:'',
            planID:'',
        };
    },
    methods: {
        camelize: function(str) {
  return str.replace(/(?:^\w|[A-Z]|\b\w|\s+)/g, function(match, index) {
    if (+match === 0) return ""; // or if (/\s+/.test(match)) for white spaces
    return index === 0 ? match.toLowerCase() : match.toUpperCase();
  });
},

        fetchItems: function() {
            db.collection('Listings').get().then((querySnapShot) => {
                let list = {}
                querySnapShot.forEach(doc => {
                    list = doc.data()
                    list.id = doc.id
                    this.plans.push(list)
                })
            })
        },
		// Event handler for form submission
		addPlan: function () {
			var user = firebase.auth().currentUser;
            

			if (this.planSelect == 'other') {
                this.planID = this.camelize(this.planName) + "_" + this.planProvider;
                // console.log(this.planID);
				// Create a new plan before adding the plan to the user
				db.collection('Listings').doc(this.planID).add({
					name: this.planName, // planID
                    provider: this.planProvider,
					interest_pa: this.planInterest,
					min_years: this.planMinYrs,

				});
                

				// Add the plan to the user, with the above created plan
				db.collection('TestUsers').doc(user.uid).get().then(doc => {
                    let newPlans = doc.data();
                    newPlans.push({ planID: this.planID, amount: this.planAmount });
                    doc(user.uid).update({
                                plans: newPlans,
                        });
                    });

			} else {
				// Add the plan to the user, with the existing selected plan
				db.collection('TestUsers').doc(user.uid).add({
					planID: this.planSelect,
					amount: this.planAmount,
				});
			}
		},
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
	background-image: url("../assets/addnew.png");
	background-size: 64px 64px;
	height: 64px;
	width: 64px;
    color:black;
    margin-left: auto;
	margin-right: auto;
    margin-bottom: 50px;
}

.addNew {
	text-align: center;
	margin-left: auto;
	margin-right: auto;
	width: 70%;
    font-size: 18px;
    justify-content:center;
    font-family: Optima;
}

.centerimg2 {
	display: block;
	margin-left: auto;
	margin-right: auto;
	width: 60%;
}

.card {
  margin: 0px 20px;
  padding: 5%;
  height: 300px;

}

.drawbox {
    border-bottom: 2px solid grey;
    width: 100px;

}

.submitbutton {
    border: 1px solid grey;
    background-color: white;
    color: #545454;
    align-items: center;
    display: inline-block;
}

</style>

<template>
    <div style="text-align:center; padding-top:100px">
        <h1 id="text"><b> Get your optimal savings plan in seconds </b></h1>
        <h2 id="text">I want to invest $
            <input id="cond" type="number" v-model="amount" size="10"> and hold it for
            <input id="cond" type="number" v-model="years" size="5"> years.
        </h2>
        <br><br>
        <div id="list1" class="dropdown-check-list" tabindex="100">
            <span class="anchor" @click="displayBox()">Select Preferred Financial Institution</span>
            <ul class="items" style="text-align:left">
                <li><input type="checkbox" id="allPlans" @click="selectAll()" /> Select All</li>
                <li v-for="plan in listOfPlans" v-bind:key="plan">
                    <input type="checkbox" name="provider" v-bind:value="plan" v-model="selectedPlans" /> {{plan.provider}}
                </li>
            </ul>
        </div>
        <br><br>
        <button id="btn" type="button" @click="show_form = true; findPlans()">Next</button>
        <br><br>
        <div v-if="show_form">
            <h2 id="text">Your Curated Savings Plan:</h2>
            <p id="text">Show plan which gives the highest return</p>
            <br>
            <div class="w3-row" style="padding:20px 50px 50px 50px">
                <div class="w3-col s6 w3-center" style="padding-left:100px">
                    <h5 id="text">New Design of Plan:<br>Plan Name<br>Provider Logo<br>Interest Rate<br>Find Out More</h5>
                </div>
                <div class="w3-col s6 w3-center" style="padding-right:100px">
                    <h3 id="text">Your Projected Returns:</h3>
                    <br><br>
                    <h5 id="text">Display Returns Here</h5>
                </div>
            </div>
            <br><br>
            <h2 id="text">You may also like...</h2>
            <p id="text">Show next 3 plans with the highest returns</p>
            <div class="w3-row" style="padding:20px 50px 50px 50px">
                <ul style="padding:0px">
                    <li v-for="plan in recommendedPlans" v-bind:key="plan">
                        <div class="w3-col s4 w3-center" style="padding:30px">
                            <img style="width:100%; height:180px" v-bind:src="plan.logo" alt="logo">
                            <br><br>
                            <p id="name"><b>{{plan.name}}</b></p>
                            <p id="name">Interest Rate: {{(plan.interest_pa*100).toFixed(2)}}%</p>
                            <p id="name">Projected Returns:</p>
                            <button class="learnMore" v-bind:id="plan.id" v-on:click="route($event)">Find Out More</button>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
import database from '../firebase.js'
export default {
    data() {
        return {
            selectedPlans: [],
            listOfPlans: [],
            recommendedPlans: [],
            topPlan: [],
            show_form: false,
            expanded: false,
            checkList: document.getElementById('list1'),
            amount: null,
            years: null,
        }
    },
    methods: {
        fetchItems: function() {
            database.collection('Listings').get().then((querySnapShot) => {
                let list = {}
                querySnapShot.forEach(doc => {
                    list = doc.data()
                    list.id = doc.id
                    this.listOfPlans.push(list)
                })
            })
        },
        displayBox: function() {
            var checkList = document.getElementById('list1');
            if (checkList.classList.contains('visible')) {
                checkList.classList.remove('visible');
            } else {
                checkList.classList.add('visible');
            }
        },
        findPlans: function() {
            this.recommendedPlans = []
            for (let i = 0; i < this.selectedPlans.length; i++) {
                if (this.selectedPlans[i].min_years <= this.years && (this.selectedPlans[i].min_amount <= this.amount)) {
                    this.recommendedPlans.push(this.selectedPlans[i]);
                }
            }
        },
        selectAll: function() {
            var selected = document.getElementById("allPlans")
            if (selected.checked) {
                this.selectedPlans = this.listOfPlans;
            } else {
                this.selectedPlans = [];
            }

        },
        route: function(event) {
            let doc_id = event.target.getAttribute("id");
            this.$router.push({
                name: 'IndivListing',
                params: { id: doc_id }
            })
        }
    },
    created() {
        this.fetchItems()
    }
}
</script>

<style scoped>
.dropdown-check-list {
    display: inline-block;
}

.dropdown-check-list .anchor {
    position: relative;
    cursor: pointer;
    display: inline-block;
    padding: 5px 50px 5px 10px;
    border: 1px solid #ccc;
}

.dropdown-check-list .anchor:after {
    position: absolute;
    content: "";
    border-left: 2px solid black;
    border-top: 2px solid black;
    padding: 5px;
    right: 10px;
    top: 20%;
    -moz-transform: rotate(-135deg);
    -ms-transform: rotate(-135deg);
    -o-transform: rotate(-135deg);
    -webkit-transform: rotate(-135deg);
    transform: rotate(-135deg);
}

.dropdown-check-list .anchor:active:after {
    right: 8px;
    top: 21%;
}

.dropdown-check-list ul.items {
    padding: 2px;
    display: none;
    margin: 0;
    border: 1px solid #ccc;
    border-top: none;
}

.dropdown-check-list ul.items li {
    list-style: none;
}

.dropdown-check-list.visible .anchor {
    color: black;
}

.dropdown-check-list.visible .items {
    display: block;
}

#listings {
    padding-top: 100px;
}

#text {
    font-family: Optima
}

#name {
    font-size: 18px;
}

#withBorders {
    display: flex;
    flex-wrap: wrap;
    list-style-type: none;
    padding: 0;
}

#withBorders2 {
    flex-grow: 1;
    flex-basis: 300px;
    text-align: center;
    padding: 10px;
    border: 1px solid white;
    margin: 10px;
    width: 100%;
}

#cond {
    font-size: 18px;
    border: 1px solid black;
    text-align: center
}

.column {
    column-width: 333px;
    column-gap: 20px;
}

.card {
    break-inside: avoid;
    page-break-inside: avoid;
    padding: 10px;
}

.learnMore {
    color: #545454
}

.photo {
    height: 220px;
    width: 100%;
}

button {
    background-color: white;
    color: #545454;
    border: 1px solid grey;
    align-items: center;
    display: inline-block;
}

#header {
    font-size: 50px;
    text-align: center;
    font-family: Optima;
}

#subheader {
    font-size: 30px;
    text-align: center;
    font-family: Optima;
}
</style>
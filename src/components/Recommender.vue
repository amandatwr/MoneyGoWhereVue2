<template>
    <div style="text-align:center; min-height: 92vh">
    <AccountBanner></AccountBanner>
        <h1 id="text" style="padding-top:100px;" ><b> Get your optimal savings plan in seconds </b></h1>
        <h2 id="text">I want to invest $
            <input id="cond" type="number" v-model="amount" size="10" min=1> and hold it for
            <input id="cond" type="number" v-model="years" size="5" min=1> years.
        </h2>
        <br><br>
        <div id="list1" class="dropdown-check-list" tabindex="100">
            <span class="anchor" @click="displayBox(); sameProvider()">Select Preferred Financial Institution</span>
            <ul class="items" style="text-align:left;">
                <li><input type="checkbox" id="allPlans" @click="selectAll()" /> Select All</li>
                <li v-for="provider in listOfProviders" v-bind:key="provider">
                    <input type="checkbox" name="provider" v-bind:value="provider" v-model="selectedProviders" /> {{provider}}
                </li>
            </ul>
        </div>
        <br><br>
        <button id="btn" type="button" @click="show_form = true; selectPlans(); findPlans(); calculateReturns()">Next</button>
        <br><br>
        <div v-if="show_form && recommendedPlans.length > 0">
            <h1 id="text">Your Curated Savings Plan:</h1>
            <div class="w3-row" style="padding:0px 50px 50px 50px;">
                <ul style="padding:0px">
                    <li v-for="plan in recommendedPlans.slice(0,1)" v-bind:key="plan">
                        <div class="w3-col s6 w3-center" style="padding:0px 0px 20px 180px">
                            <img id="curatedPlan" v-bind:src="plan.logo" alt="logo">
                            <p id="name"><b>{{plan.name}}</b></p>
                            <p id="name">Interest Rate: {{(plan.interest_pa*100).toFixed(2)}}%</p>
                            <button class="learnMore" v-bind:id="plan.id" v-on:click="route($event)">Find Out More</button>
                        </div>
                    </li>
                </ul>
                <div class="w3-col s6 w3-center" v-for="plan in recommendedPlans.slice(0,1)" v-bind:key="plan" id="projectedReturns">
                    <h3 id="text">Your Projected Returns:</h3>
                    <br><br>
                    <h1 id="returns">${{(plan.returns).toLocaleString()}}</h1>
                </div>
            </div>
            <div v-if="recommendedPlans.length > 1">
                <h1 id="text">You may also like...</h1>
                <div class="w3-row" style="padding:20px 70px 70px 70px; text-align:center">
                    <ul style="padding:0px">
                        <li v-for="plan in recommendedPlans.slice(1,4)" v-bind:key="plan">
                            <div class="tooltip">
                                <v-card class="w3-col w3-center" style="padding:30px; margin:11px; width: 31%; display:inline-block">
                                    <img id="otherPlans" v-bind:src="plan.logo" alt="logo">
                                    <p id="name"><b>{{plan.name}}</b></p>
                                    <p id="name">Interest Rate: {{(plan.interest_pa*100).toFixed(2)}}%</p>
                                    <p id="name">Projected Returns: ${{(plan.returns).toLocaleString()}}</p>
                                    <button class="learnMore" v-bind:id="plan.id" v-on:click="route($event)">Find Out More</button>
                                </v-card>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
        <div v-if="show_form && recommendedPlans.length === 0">
            <h1 id="text">Your Curated Savings Plan:</h1>
            <br>
            <h4 id="text" style="color:#545454">No suitable savings plan found. Please edit your input values.</h4>
        </div>
    </div>
</template>

<script>
import database from '../firebase.js'
import AccountBanner from './AccountBanner.vue'
export default {
    components: {
        AccountBanner: AccountBanner
    },
    data() {
        return {
            selectedPlans: [],
            listOfPlans: [],
            recommendedPlans: [],
            topPlan: [],
            listOfProviders: [],
            selectedProviders: [],
            show_form: false,
            exceeded: false,
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
        selectPlans: function() {
            this.selectedPlans = []
            for (let i = 0; i < this.selectedProviders.length; i++) {
                for (let j = 0; j < this.listOfPlans.length; j++) {
                    if (this.listOfPlans[j].provider == this.selectedProviders[i]) {
                        this.selectedPlans.push(this.listOfPlans[j])
                    }
                }
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
        calculateReturns: function() {
            for (let i = 0; i < this.recommendedPlans.length; i++) {
                var interest = this.recommendedPlans[i].interest_pa;
                var projectedReturns = Math.pow((1 + interest), this.years) * this.amount;
                this.recommendedPlans[i].returns = Math.round(projectedReturns);
            }
            this.recommendedPlans.sort(function(a, b) { return b.returns - a.returns });
        },
        selectAll: function() {
            var selected = document.getElementById("allPlans")
            if (selected.checked) {
                this.selectedProviders = this.listOfProviders;
            } else {
                this.selectedProviders = [];
            }
        },
        sameProvider: function() {
            for (let i = 0; i < this.listOfPlans.length; i++) {
                var provider = this.listOfPlans[i].provider;
                if (this.listOfProviders.indexOf(provider) == -1) {
                    this.listOfProviders.push(provider)
                }
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

html {
    height: 100vh;
}

.dropdown-check-list {
    display: inline-block;
    width: auto;
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
}

#name {
    font-size: 18px;
}

#cond {
    font-size: 18px;
    border: 1px solid black;
    text-align: center
}

#projectedReturns {
    display: inline;
    padding-right: 170px;
    padding-top: 150px;
    justify-content: center
}

#returns {
    font-family: Optima;
    color: #405D93;
}

.column {
    column-width: 333px;
    column-gap: 20px;
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

#curatedPlan {
    padding-top: 0px;
    padding-bottom: 0px;
    padding-left: 60px;
    padding-right: 60px;
    width: 100%; 
    height: 250px
}

#otherPlans {
    padding-top: 0px;
    padding-bottom: 0px;
    padding-left: 40px;
    padding-right: 40px;
    width: 100%; 
    height: 180px

}
</style>
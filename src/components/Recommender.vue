<template>
    <div style="text-align:center; min-height: 92vh">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <AccountBanner></AccountBanner>
        <h1 id="text" style="padding-top:100px;"><b> Get your optimal savings plan in seconds </b></h1>
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
        <br><br><br>
        <button id="btn" type="button" @click="show_form = true; selectPlans(); findPlans(); calculateReturns(); meetReq(); togglePopup()">Next</button>
        <br><br><br><br>
    
        <div class="popup" id="popup-1">
            <div class="overlay"></div>
            <div class="content">
                <div class="close-btn" @click="togglePopup">&times;</div>
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
                                        <v-card class="w3-col w3-center" style="padding:30px; margin:11px; width: 350px; display:inline-block">
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
                    <h4 id="text" style="color:#545454">No suitable savings plan found.</h4>
                    <h4 id="text" v-if="failMinYear && !failMinAmt" style="color:#545454">Minimum of {{this.minAmt[0].min_years}} years required.</h4>
                    <h4 id="text" v-if="failMinAmt && !failMinYear" style="color:#545454">Minimum of ${{this.minYears[0].min_amount}} required.</h4>
                    <h4 id="text" v-if="failMinAmt && failMinYear && minAmt[0] != minYears[0]" style="color:#545454">
                    Either a minimum of ${{this.minYears[0].min_amount}} and {{this.minYears[0].min_years}} years or <br>
                    a minimum of ${{this.minAmt[0].min_amount}} and {{this.minAmt[0].min_years}} years is required.
                    </h4>
                    <h4 id="text" v-if="failMinAmt && failMinYear && minAmt[0] == minYears[0]" style="color:#545454">
                    A minimum of ${{this.minYears[0].min_amount}} and {{this.minYears[0].min_years}} years is required.
                    </h4>
                </div>
    
            </div>
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
            failMinYear: true,
            failMinAmt: true,
            failProvider: false,
            minAmt: [],
            minYears: [],
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
        },
        togglePopup: function() {
            document.getElementById("popup-1").classList.toggle("active");
        },
        meetReq: function() {
            this.minYears = []
            this.minAmt = []
            this.selectedPlans.sort(function(a, b) {
                return a.min_years - b.min_years
            })
            var min_yr = this.selectedPlans[0].min_years
            var matchingPlans = this.selectedPlans.filter(function(obj) {
                return obj.min_years === min_yr
            })
            matchingPlans.sort(function(a, b) {
                return a.min_amount - b.min_amount
            })
            this.minYears.push(matchingPlans[0])

            this.selectedPlans.sort(function(a, b) {
                return a.min_amount - b.min_amount
            })
            var min_amt = this.selectedPlans[0].min_amount
            matchingPlans = this.selectedPlans.filter(function(obj) {
                return obj.min_amount === min_amt
            })
            matchingPlans.sort(function(a, b) {
                return a.min_years - b.min_years
            })
            this.minAmt.push(matchingPlans[0])

            if (this.amount < this.minAmt[0].min_amount) {
                this.failMinAmt = true;
            } else if (this.years < this.minAmt[0].min_years) {
                this.failMinAmt = true;
            } else {
                this.failMinAmt = false;
            }

            if (this.years < this.minYears[0].min_years) {
                this.failMinYear = true;
            } else if (this.amount < this.minYears[0].min_amount) {
                this.failMinYear = true;
            } else {
                this.failMinYear = false;
            }
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

#text {}

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
    padding-top: 10px;
    padding-bottom: 0px;
    padding-left: 40px;
    padding-right: 40px;
    width: 100%;
    height: 250px
}

#otherPlans {
    padding-top: 0px;
    padding-bottom: 0px;
    padding-left: 20px;
    padding-right: 20px;
    width: 100%;
    height: 180px
}

.popup .overlay {
    position: fixed;
    top: 0px;
    left: 0px;
    width: 100vw;
    height: 100vh;
    background: rgba(0, 0, 0, 0.7);
    z-index: 1;
    display: none;
    overflow: auto;
}

.popup .content {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%) scale(0);
    background: #fff;
    width: 1300px;
    max-height: 560px;
    z-index: 2;
    text-align: center;
    padding: 40px 10px 40px 10px;
    box-sizing: border-box;
    font-family: "Open Sans", sans-serif;
    overflow: auto;
}

.popup .close-btn {
    cursor: pointer;
    position: absolute;
    right: 20px;
    top: 20px;
    width: 30px;
    height: 30px;
    background: #222;
    color: #fff;
    font-size: 25px;
    font-weight: 600;
    line-height: 30px;
    text-align: center;
    border-radius: 50%;
}

.popup.active .overlay {
    display: block;
}

.popup.active .content {
    transition: all 300ms ease-in-out;
    transform: translate(-50%, -50%) scale(1);
}
</style>
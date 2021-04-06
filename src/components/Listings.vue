<template>
    <div id="listings">
        <div class="banner">
            <div class="banner-text">
                <h1 class="page-title">Savings Plans</h1>
            </div>
        </div>
    
        <br>
        <p id="subheader">Scroll through a curated list of savings plans to find one that you like</p>
        <div id="list1" class="dropdown-check-list" tabindex="100">
            <span class="anchor" @click="displayBox(); sameProvider()">Filter By Financial Institution</span>
            <ul class="items" style="text-align:left">
                <li><input type="checkbox" id="allPlans" @click="selectAll()" /> Select All</li>
                <li v-for="provider in listOfProviders" v-bind:key="provider">
                    <input type="checkbox" name="provider" v-bind:value="provider" v-model="selectedProviders" /> {{provider}}
                </li>
            </ul>
        </div>
        <br><br>
        <button id="btn" type="button" @click="show_form = true; selectPlans(); show_original = false">Filter</button>
    
        <div class="container" v-if="show_original">
            <div class="row" style="padding:30px 120px 30px 120px">
                <div v-for="plan in listOfPlans" v-bind:key="plan" class="col-sm-4" style="padding:30px">
                    <img style="width:100%; height:230px" v-bind:src="plan.image" alt="logo"><br><br>
                    <p id="name"><b>{{plan.name}}</b></p>
                    <p id="description">{{plan.description}}</p>
                    <button v-bind:id="plan.id" v-on:click="route($event)">Learn More</button>
                </div>
            </div>
        </div>
    
        <div class="container" v-if="show_form">
            <div class="row" style="padding:30px 120px 30px 120px">
                <div v-for="plan in selectedPlans" v-bind:key="plan" class="col-sm-4" style="padding:30px">
                    <img style="width:100%; height:230px" v-bind:src="plan.image" alt="logo"><br><br>
                    <p id="name"><b>{{plan.name}}</b></p>
                    <p id="description">{{plan.description}}</p>
                    <button v-bind:id="plan.id" v-on:click="route($event)">Learn More</button>
                </div>
            </div>
        </div>
        <br>
    
        <div class='note'><span>Can't decide which plan to choose? Let our</span>
            <router-link class='note' to=/recommender exact>
                recommender
            </router-link> <span>do it for you!</span>
        </div>
    
    </div>
</template>

<script>
import database from '../firebase.js'
export default {
    data() {
        return {
            listOfPlans: [],
            selectedPlans: [],
            recommendedPlans: [],
            listOfProviders: [],
            selectedProviders: [],
            show_form: false,
            show_original: true,
            checkList: document.getElementById('list1')
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
                this.recommendedPlans.push(this.selectedPlans[i]);
            }
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
.banner {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    background-image: url("./../assets/office.jpg");
    /* Need to change picture */
    background-size: cover;
    height: 400px;
}

.banner-text {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}

.page-title {
    font-family: "Open Sans", sans-serif;
    font-size: 75px;
    color: white;
    margin: 0;
    height: 90px;
}

#listings {
    text-align: center;
}

#name {
    font-size: 20px;
}

#description {
    font-size: 15px;
}

.note {
    font-size: 18px;
    font-family: Poppins-Regular;
    /* font-size: 14px; */
    line-height: 1.7;
    color: #666666;
    /* margin: 0px; */
    margin-bottom: 25px;
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

.photo {
    height: 220px;
    width: 370px;
}

button {
    background-color: #192841;
    color: white;
    border: 1px solid white;
    align-items: center;
    display: inline-block;
    padding: 13px 28px;
}

#header {
    font-size: 50px;
    text-align: center;
    font-family: Optima;
}

#subheader {
    font-size: 30px;
    text-align: center;
}

.plan {
    height: 500px;
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

.container {
    min-width: 992px
}

.row {
    display: -ms-flexbox;
    display: flex;
    -ms-flex-wrap: wrap;
    flex-wrap: wrap;
    margin-right: -15px;
    margin-left: -15px
}

.col-sm-4 {
    position: relative;
    width: 100%;
    min-height: 1px;
    padding-right: 15px;
    padding-left: 15px
}

.col-sm-4 {
    -ms-flex: 0 0 33.333333%;
    flex: 0 0 33.333333%;
    max-width: 33.333333%
}
</style>

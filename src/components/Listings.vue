<template>
    <div id="listings">
        <h2 id="header">Savings Plans</h2>
        <p id="subheader">Scroll through a curated list of savings plans to find one that you like</p>

        <div id="list1" class="dropdown-check-list" tabindex="100">
            <span class="anchor" @click="displayBox()">Select Preferred Financial Institution</span>
            <ul class="items" style="text-align:left">
                <li><input type="checkbox" id="allPlans" @click="selectAll()" /> Select All</li>
                <li v-for="plan in listOfPlans" v-bind:key="plan">
                    <input type="checkbox" name="provider" v-bind:value="plan" v-model="selectedPlans" />{{plan.provider}}
                </li>
            </ul>
        </div>
        <br><br>
        <button id="btn" type="button" @click="show_form = true; findPlans()">Next</button>

        <div class="w3-row" style="padding:20px 50px 50px 50px">
                <ul style="padding:0px">
                    <li v-for="plan in listOfPlans" v-bind:key="plan">
                        <div class="w3-col s4 w3-center" style="padding:30px">
                            <img style="width:100%; height:180px" v-bind:src="plan.image" alt="logo">
                            <br><br>
                            <p id="name"><b>{{plan.name}}</b></p>
                            <p id="name">{{plan.descriptionn}}</p>
                            <button class="learnMore" v-bind:id="plan.id" v-on:click="route($event)">Learn More</button>
                        </div>
                    </li>
                </ul>
            </div>
            
    </div>
</template>

<script>
import database from '../firebase.js'
export default {
    data() {
        return {
            listOfPlans: [],
            selectedPlans: []
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
#listings {
    padding-top: 100px;
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

.learnMore {
    color: #545454
}

button {
    background-color: white;
    color: #2F6EA2;
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


</style>

<template>
    <div style="text-align:center; padding-top:100px">
        <h1 id="text"><b> Get your optimal savings plan in seconds </b></h1>
        <h2 id="text">I want to invest $
            <input id="cond" type="number" v-model="amount" size="10"> and hold it for a maximum of
            <input id="cond" type="number" v-model="years" size="5"> years.
        </h2>
        <br><br>
        <div id="list1" class="dropdown-check-list" tabindex="100">
            <span class="anchor" @click="displayBox()">Select Preferred Financial Institution</span>
            <ul class="items" style="text-align:left">
                <li><input type="checkbox" />Select All</li>
                <li v-for="plan in listOfPlans" v-bind:key="plan">
                <input type="checkbox" name="provider" v-bind:value="plan" v-model="selectedPlans"/>{{plan.Provider}}
                </li>
            </ul>
        </div>
        <br><br>
        <button id="btn" type="button" @click="show_form = true">Next</button>
        <br><br>
        <div v-if="show_form">
            <ul id="withBorders">
                <li id="withBorders2" class="column" v-for="plan in selectedPlans" v-bind:key="plan">
                    <div class="card">
                        <img class="photo" v-bind:src="plan.Image" alt="logo">
                        <br><br>
                        <p id="name">{{plan.id}}</p>
                        <br>
                        <p>{{plan.Desc}}</p>
                        <br>
                        <button class="learnMore" v-bind:id="plan.id" v-on:click="route($event)">Learn More</button>
                    </div>
                </li>
            </ul>
        </div>
        <br><br>
    </div>
</template>

<script>
import database from '../firebase.js'
export default {
    data() {
        return {
            selectedPlans: [],
            listOfPlans: [],
            show_form: false,
            expanded: false,
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
            if (checkList.classList.contains('visible'))
                checkList.classList.remove('visible');
            else
                checkList.classList.add('visible');
        },
        checkedPlans: function() {
            document.getElementById('btn').onclick = function() {
                var markedCheckbox = document.getElementsByName('provider');
                for (var checkbox of markedCheckbox) {
                    if (checkbox.checked)
                        this.selectedPlans.push(checkbox.value);
                }
            }
        },
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
    color: #0094ff;
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
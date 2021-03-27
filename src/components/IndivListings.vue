<template>
    <div class="listings">
        <h6 v-for="description in savingPlan" v-bind:key="description">
            <p id="name">{{description.name}}</p>
            <p id="provider">by {{description.provider}}</p>
            <img v-bind:src="description.image" alt="logo">
            <br><br>
            <div class="row" style="width:70%; text-align:center; display: inline-block;">
                <div class="column">
                    <h2 id="text">{{(description.interest_pa*100).toFixed(2)}}%</h2>
                    <p id="points">Annual Interest Rate</p>
                </div>
                <div class="column" id="borderLine">
                    <h2 id="text">{{description.min_years}}</h2>
                    <p id="points">Minimum Years Required</p>
                </div>
                <div class="column" id="borderLine">
                    <h2 id="text">${{description.min_amount}}</h2>
                    <p id="points">Minimum Premium Amount</p>
                </div>
            </div>
            <div class="row" style="width:65%; text-align:center; display: inline-block;">
                <h2 id="feature">Features:</h2>
                <ul>
                    <li id="content" v-for="feature in description.features" v-bind:key="feature">{{feature}}</li>
                </ul>
                <br>
                <a id="site" v-bind:href="description.link">Visit Official Site</a>
                <br><br>
            </div>
        </h6>
    </div>
</template>

<script>
import database from '../firebase.js'
export default {
    components: {},
    data() {
        return {
            savingPlan: [],
            doc_id: this.$route.params.id
        }
    },
    methods: {
        fetchItems: function() {
            let doc_id = this.$route.params.id;
            database.collection('Listings').doc(doc_id).get().then((querySnapShot) => {
                this.savingPlan.push(querySnapShot.data())
            })
        }
    },
    created() {
        this.fetchItems()
    }
}
</script>

<style scoped>
.listings {
    text-align: center;
    padding-top: 100px;
}

h6 {
    font-weight: normal
}

ul {
    display: list-item;
    font-family: Optima;
}

ul li::before {
    content: '\261E';
    color: black;
    font-weight: bold;
    display: inline-block;
    width: 1.5em;
    margin-left: -1.5em;
}

#name {
    font-size: 45px;
    font-family: 'Optima';
    color: black;
}

#provider {
    font-size: 30px;
    font-family: Optima;
}

#text {
    font-family: 'Optima';
}

img {
    width: 70%;
}

#site {
    display: inline-block;
    border: 1px solid black;
    color: black;
    font-size: 18px;
    padding: 10px;
    box-sizing: border-box;
    text-decoration: none;
    font-family: 'Optima', monospace;
}

#borderLine {
    border-left: 1px solid black;
}

.column {
    float: left;
    width: 33.33%;
    padding: 10px;
}

.row:after {
    content: "";
    display: table;
    clear: both;
}

#feature {
    text-align: left;
    font-family: Optima;
}

#content {
    text-align: left;
    font-family: Optima;
    font-size: 20px;
}

#points {
    font-size: 15px;
}
</style>
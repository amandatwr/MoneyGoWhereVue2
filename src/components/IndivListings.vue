<template>
    <div style="text-align: center; padding-top:100px">
        <h6 v-for="description in savingPlan" v-bind:key="description">
            <p id="name">{{doc_id}}</p>
            <img v-bind:src="description.Image" alt="logo">
            <br><br>
            <table style="width:80%">
                <tr>
                    <th>Provider</th>
                    <td>{{description.Provider}}</td>
                </tr>
                <tr>
                    <th>Minimum Number of Years</th>
                    <td>{{description.MinNumOfYears}}</td>
                </tr>
                <tr>
                    <th>Returns</th>
                    <td>{{description.Returns}}</td>
                </tr>
            </table>
            <br><br>
            <a id="site" v-bind:href="description.Link">VISIT OFFICIAL SITE</a>
            <br><br>
        </h6>
        <h6 v-for="description in savingPlan" v-bind:key="description">
            <p id="name">{{doc_id}}</p>
            <img v-bind:src="description.Image" alt="logo">
            <br><br>
            <div class="row" style="width:80%; text-align:center; display: inline-block;">
                <div class="column">
                    <h2 id="text">{{description.InterestPA}}</h2>
                    <p>Annual Interest Rate</p>
                </div>
                <div class="column" id="borderLine">
                    <h2 id="text">{{description.MinNumOfYears}}</h2>
                    <p>Minimum Number of Years Required</p>
                </div>
                <div class="column" id="borderLine">
                    <h2 id="text">${{description.MinPremium}}</h2>
                    <p>Minimum Premium Amount</p>
                </div>
            </div>
            <h2 id="text">Features:</h2>
            <ul>
                <li>Testing1</li>
                <li>Testing2</li>
                <li>Testing3</li>
            </ul>
            <br><br>
            <a id="site" v-bind:href="description.Link">VISIT OFFICIAL SITE</a>
            <br><br>
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
#listing {
    padding-top: 200px;
}

h6 {
    font-weight: normal
}

ul {
    display: list-item;
    list-style-type: circle;
    font-family: Optima;
}

ul li::before {
    content: '\261E';
    color: black;
    font-weight: bold;
    display: inline-block;
    width: 2em;
    margin-left: -1em;
}

#name {
    font-size: 50px;
    font-family: 'Optima';
    color: black;
}

#text {
    font-family: 'Optima';
}

img {
    width: 80%;
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

table,
th,
td {
    border: none;
    border-collapse: collapse;
    font-size: 22px;
    margin-left: auto;
    margin-right: auto;
    font-family: 'Optima';
}

th,
td {
    padding: 15px;
    text-align: left;
}

th {
    width: 40%;
}

td {
    width: 60%
}

tr:nth-child(even) {
    background-color: #f2f2f2;
}
</style>
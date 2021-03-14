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
                    <th>Interest Per Annum</th>
                    <td>{{description.InterestPA}}</td>
                </tr>
                <tr>
                    <th>Capital Guaranteed</th>
                    <td>{{description.CapitalGuaranteed}}</td>
                </tr>
                <tr>
                    <th>Minimum Number of Years</th>
                    <td>{{description.MinNumOfYears}}</td>
                </tr>
                <tr>
                    <th>Returns</th>
                    <td>{{description.Returns}}</td>
                </tr>
                <tr>
                    <th>Returns Guaranteed</th>
                    <td>{{description.ReturnsGuaranteed}}</td>
                </tr>
            </table>
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

#name {
    font-size: 50px;
    font-family: 'Optima'
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
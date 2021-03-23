<template>
    <div style="text-align: center; padding-top:100px">
        TEST
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
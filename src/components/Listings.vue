<template>
    <div id="listings">
        <h2 id="header">Savings Plans</h2>
        <p id="subheader">Scroll through a curated list of savings plans to find one that you like</p>
        <ul id="withBorders">
            <li id="withBorders2" class="column" v-for="plan in listOfPlans" v-bind:key="plan">
                <div class="card">
                    <img class="photo" v-bind:src="plan.Image" alt="logo">
                    <br><br>
                    <p id="name">{{plan.id}}</p>
                    <br>
                    <p>{{plan.Desc}}</p>
                    <br>
                    <button v-bind:id="plan.id" v-on:click="route($event)">Learn More</button>
                </div>
            </li>
        </ul>
    </div>
</template>

<script>
import database from '../firebase.js'
export default {
    data() {
        return {
            listOfPlans: []
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
    height: 200px;
    width: 350px;
}

button {
    background-color: white;
    color: #2F6EA2;
    border: 1px solid grey;
    align-items: center;
    display: inline-block
}

#header {
    font-size: 50px;
    text-align: center;
}

#subheader {
    font-size: 30px;
    text-align: center;
}
</style>

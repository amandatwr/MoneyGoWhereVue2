<template>
  <div id="listings">
    <div class="w3-row" style="padding: 20px 50px 50px 50px">
      <ul style="padding: 0px">
        <!-- (value, key, index) -->
        <li v-for="(plan, index) in plans" v-bind:key="plan" v-bind:id="index">
          <MyPlansRect v-bind:plan="plan" v-bind:myIndex="index" />
        </li>
      </ul>
    </div>
    <!--<input v-model="textValue" placeholder="input amount">-->
  </div>
</template>


<script>
import database from "../firebase.js";
import firebase from "firebase";
import MyPlansRect from "./MyPlansRect.vue"

export default {
  name: "EditPlan",
  props: {
    item: Object,
    
  },
  data() {
    return {
      textValue: "",
      plans: [],
      show_form: false,
    };
  },
  components: {
    MyPlansRect: MyPlansRect,
  },
  methods: {
    showEditFn() {
      var x = document.getElementById("editFn");
      if (x.style.display === "none") {
        x.style.display = "block";
      } else {
        x.style.display = "none";
      }
    },
    fetchItems: function () {
      // Log user account creation date
      var user = firebase.auth().currentUser;
      var signupDate = new Date(user.metadata.creationTime);
      var currDate = new Date();
      this.days = this.getDateDiff(currDate, signupDate);

      database
        .collection("TestUsers")
        .doc(user.uid)
        .get()
        .then((querySnapShot) => {
          var plans = querySnapShot.data().plans;
          for (let i = 0; i < plans.length; i++) {
            var planID = plans[i].planID;
            database
              .collection("Listings")
              .doc(planID)
              .get()
              .then((listing) => {
                var listingDetails = listing.data();
                var planDetails = {};
                planDetails["name"] = listingDetails.name;
                planDetails["provider"] = listingDetails.provider;
                planDetails["interest"] = this.round(
                  100 * listingDetails.interest_pa,
                  2
                );
                planDetails["capital_guaranteed"] =
                  listingDetails.capital_guaranteed;
                planDetails["min_years"] = listingDetails.min_years;
                planDetails["amount"] = this.formatter().format(
                  plans[i].amount
                );
                planDetails["dateSaved"] = plans[i].dateSaved
                  .toDate()
                  .toLocaleDateString();
                planDetails["dateWithdraw"] = this.getReturnsDate(
                  plans[i].dateSaved.toDate(),
                  listingDetails.min_years
                ).toLocaleDateString();
                this.plans.push(planDetails);
              });
          }
        });
    },
    // setItems: function () {
    //   database
    //     .collection("TestUsers")
    //     .doc(user.uid)
    //     .get()
    //     .then((querySnapShot) => {
    //       var plans = querySnapShot.data().plans;
    //       for (let i = 0; i < plans.length; i++) {
    //         var planID = plans[i].planID;
    // },

    round: function (value, decimals) {
      return Number(
        Math.round(value + "e" + decimals) + "e-" + decimals
      ).toFixed(decimals);
    },
    getReturnsDate: function (dateSaved, numYears) {
      return new Date(
        dateSaved.setFullYear(new Date().getFullYear() + numYears)
      );
    },

    getDateDiff: function (from, to) {
      // console.log(from, to);
      return Math.floor((from - to) / 86400000);
    },

    formatter: function () {
      return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
        minimumFractionDigits: 2,
      });
    },
  },
  created() {
    this.fetchItems();
  },
};
</script>

<style scoped>
.editButton {
  background-image: url("../assets/editplan.png");
  background-size: 16px 16px;
  background-repeat: no-repeat;
  height: 16px;
  width: 16px;
  color: black;
  margin-left: 270px;
  /* margin-bottom: 270px; */
  margin-top: 10px;
  margin-right: 10px;
}

.tooltip {
  position: relative;
  display: inline-block;
  height: 200px;
  width: 20em;
  /* border: solid;
  border-color: #e1c9c5; */
}

.tooltip .tooltiptext {
  visibility: hidden;
  width: 200px;
  background-color: black;
  color: #fff;
  text-align: center;
  border-radius: 6px;
  padding: 5px 0;
  position: absolute;
  z-index: 1;
  top: 100%;
  left: 50%;
  margin-left: -100px;
}

.tooltip .tooltiptext::after {
  content: "";
  position: absolute;
  bottom: 100%;
  left: 50%;
  margin-left: -5px;
  border-width: 5px;
  border-style: solid;
  border-color: transparent transparent black transparent;
}

.tooltip:hover .tooltiptext {
  visibility: visible;
}

h6 {
  color: black;
  text-align: center;
  text-justify: auto;
}

#listings {
  /* padding-top: 10px; */
  text-align: center;
}

#name {
  font-size: 18px;
  white-space: nowrap;
  text-align: center;
}

#provider {
  font-size: 14px;
  white-space: nowrap;
  text-align: center;
}

ul {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
}

li {
  flex: 1 0 25%;
  margin: 15px;
}

p {
  margin-top: 0px;
  margin-bottom: 10px;
  margin-left: auto;
  margin-right: auto;
}

/* #flex-container {
  display:flex;
  flex-flow: row wrap;
  justify-content: space-around;
  padding: 0;
  margin: 0;
  list-style: none;

}

#flex-item{
  padding: 5px;
  margin-top: 10px;
  line-height: 150px;
  color: white;
} */

.myplan-card {
  /* margin: 0 25px; */
  height: 200px;
  width: 130% !important;
  /* padding-top: 35px; */
}
</style>

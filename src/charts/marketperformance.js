import { Line } from "vue-chartjs";
import firebase from "firebase";
import axios from "axios";

export default {
  extends: Line,
  data: function() {
    return {
      datacollection: {
        labels: [],
        datasets: [
          {
            data: [],
            label: "STI Index",
            borderColor: "#192841",
            fill: false,
          },
        ],
      },
      options: {
        title: {
          display: true,
          text: "Monthly STI Index",
          fontSize: 20,
        },
        legend: {
          display: false,
        },
        layout: {
          padding: {
            top: -10,
          },
        },
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          xAxes: [
            {
              gridLines: {
                display: false,
              },
            },
          ],
        },
      },
    };
  },

  methods: {
    fetchItems: function() {
      var months = [];
      var index = [];
      axios
        .get(
          `https://eservices.mas.gov.sg/api/action/datastore/search.json?resource_id=1c1713de-6b5e-475d-bc1e-b6a45b3e063e&limit=180&sort=end_of_month desc`
        )
        .then((response) => {
          response.data.result.records.forEach((doc) => {
            months.unshift(doc.end_of_month);
            index.unshift(doc.sti);
          });
        })
        .then(() => {
          this.datacollection.datasets[0].data = index;
          this.datacollection.labels = months;
          this.renderChart(this.datacollection, this.options);
        });
    },
  },
  created() {
    firebase.auth().onAuthStateChanged((userAuth) => {
      if (userAuth) {
        firebase
          .auth()
          .currentUser.getIdTokenResult()
          .then((token) => {
                             this.user = token.claims.sub;
                             // console.log(token);
                           })
          .then(() => {
            this.fetchItems();
          });
      }
    });
  },
};

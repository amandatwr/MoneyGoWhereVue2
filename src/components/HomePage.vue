<template>
    <div>
      <div class="banner">
        <div class="banner-text">
          <h1 class="company-name">MoneyGoWhere</h1>
           <transition name="fade" mode="out-in">
            <p key="1" class="tagline" v-if="generalText" style='font-family: inherit; font-weight:100;'>Your one stop platform for all things Savings.</p>
            <p key="2" class="tagline" v-else-if="isUser"  style='font-family: inherit; font-weight:100;'>Start your journey with us today!</p>
          </transition>
          <div class="banner-buttons">
          <router-link class="saver-button" to='/register' exact><button class="saver-button" @mouseover="toggleIsUser" @mouseout="toggleIsUser">Get Started</button></router-link>
          </div>
        </div>
      </div>
    
    <AboutPage></AboutPage>
    </div>
</template>


<script>
import AboutPage from "./AboutPage.vue";
import database from "../firebase.js"; 

export default {
  data() {
    return {
        generalText: true,
      isUser: false,
      isSeller: false,
    };
  },

  methods: {
      toggleIsUser: function() {
          this.isUser = !this.isUser
          this.generalText = !this.generalText
      },
      toggleIsSeller: function() {
          this.isSeller = true
          this.generalText = !this.generalText
      },
      fetchItems: function () {
          database.collection('Listings').doc('VJ6L3DTdt0pSKQu9BoYy').get().then(doc => {
            console.log(doc)
          })
      }
  },

  components: {
    AboutPage
  },

  created() {
    this.fetchItems()
  }
};
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Open+Sans:wght@700&display=swap");
@import url('https://fonts.googleapis.com/css2?family=Open+Sans+Condensed:wght@300&display=swap');

.banner {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  background-image: url("./../assets/office.jpg");
  background-size: cover;
  height: 700px;
}

.banner-text {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.tagline {
  text-align: center;
  margin: 0;
  font-family: 'Open Sans Condensed', sans-serif;
  font-size: 35px;
  margin-bottom: 15px;
  color: white;
}

.company-name {
  font-family: "Open Sans", sans-serif;
  font-size: 90px;
  color: white;
  margin: 0;
  height: 120px;
}

.fade-enter-active,
.fade-leave-active {
  transition-duration: 0.5s;
  transition-property: opacity;
  transition-timing-function: ease-in;
}
.fade-enter, 
.fade-leave-to {
  opacity: 0%;
} 

.banner-buttons {
    width: 100%;
    padding: 0px 180px;
    display: flex;
    flex-direction: row;
    justify-content: center;
    text-align: center;
}

button {
    color: white;
    background-color: transparent;
	border: 2px solid white;
	cursor: pointer;
	letter-spacing: 0.2125rem;
	line-height: 1;
	overflow: hidden;
	padding: 15px 30px;
	position: relative;
	text-align: center;
	text-transform: uppercase;
    outline: 0;
}



.advisor-button {
  margin-right: 50px;
}

.saver-button:hover {
    background-color: #192841;
}

</style>
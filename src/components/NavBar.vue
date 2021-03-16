<template>
    <div class="w3-top">
      <div class="w3-bar w3-black w3-card">
        <div class="w3-bar-item w3-bar-left">
        <div class="w3-bar-img-container">
            <img class="w3-bar-img" src="./../assets/block.png">
        </div>
            <div class="w3-bar-search-bar">
            <button class="w3-bar-search-button" v-on:click="search">
                <img src="./../assets/loupe.png">
            </button>
            <div class="w3-bar-item w3-search-term-container w3-padding-small">
            <input class="w3-search-term" type="text" placeholder="Search" @input="handleInput($event.target.value)" v-on:keyup.enter="search">
            </div>
            </div>


        </div>
        <div class="w3-bar-item w3-bar-right">
            <router-link class='w3-bar-item w3-button w3-padding-large w3-hide-small"' to='/' exact>HOME</router-link>
            <router-link class="w3-bar-item w3-button w3-padding-large w3-hide-small" to='/about' exact>ABOUT</router-link>
            <router-link class="w3-bar-item w3-button w3-padding-large w3-hide-small" to='/listings' exact>LISTINGS</router-link>
            <router-link class="w3-bar-item w3-button w3-padding-large w3-hide-small" to='/FAQ'>FAQs</router-link>
            <router-link v-if='!isLoggedIn' class="w3-bar-item w3-button w3-padding-large w3-hide-small" to='/login' exact>LOGIN</router-link>
            
            <a v-on:mouseleave='accountCircle=accountCircleWhite' v-on:mouseover='accountCircle = accountCircleBlack' 
            v-if='isLoggedIn' class="w3-bar-item w3-button w3-dropdown-hover w3-hide-small w3-padding-large dropdown-item">
                <span>
                    <img class='account-circle' :src="accountCircle">
                    <span>MY ACC</span>
                </span>
                    <div class="w3-dropdown-content w3-bar-block w3-card-4">
                        <router-link class="w3-bar-item w3-button" to='/dashboard'>
                            <div class='dropdown-item'>
                                <img src='./../assets/chart-line.png'>
                                <div>My Savings</div>
                            </div>
                        </router-link>
                        <router-link class="w3-bar-item w3-button" to='/dashboard'>
                            <div class='dropdown-item'>
                                <img src='./../assets/view-dashboard-outline.png'>
                                <div>Analytics</div>
                            </div>
                        </router-link>
                        <div class= 'bottom-border'>
                        <router-link class="w3-bar-item w3-button" to='/dashboard'>
                            <div class='dropdown-item'>
                                <img src='./../assets/math-integral.png'>
                                <div>Optimise My Savings</div>
                            </div>
                        </router-link>
                        </div>
                        <a class="w3-bar-item w3-button" v-on:click='logout'>
                            <div class='dropdown-item'>
                                <img src='./../assets/logout-variant.png'>
                                <div >Sign Out</div> 
                            </div>
                         </a>
                    </div>
                </a>
            <div class='space'></div>
        </div>
      </div>
    </div>
</template>


<script>
import firebase from 'firebase';
import white from './../assets/account-circle-white.png';
import black from './../assets/account-circle-black.png';

export default {
    data() {
        return {
            searchKeyword: "",
            isLoggedIn: false,
            currentUser: false,
            accountCircle: white,
            accountCircleWhite: white,
            accountCircleBlack: black
        }
    },

    created() {
        if (firebase.auth().currentUser) {
            this.isLoggedIn = true;
            this.currentUser = firebase.auth().currentUser.email;
        }
    },

    methods: {
        handleInput: function(value) {
            this.searchKeyword = value;
        },

        search: function() {
            alert("You are searching for " + this.searchKeyword);
        },

        logout: function() {
            firebase.auth().signOut().then(() => {
                this.$router.go({path: this.$router.path});
            })

        },

        toggleAccountCircle: function() {
            if (this.accountCircle == this.accountCircleWhite) {
                this.accountCircle = this.accountCircleBlack
            } else {
                this.accountCircle = this.accountCircleWhite
            }
        }
    }

};
</script>


<style>
@import "./../css/style.css";

.w3-bar{
    opacity: 85%;
    height: 65px;
}
.w3-bar-search-bar {
    padding-top: 2px;
    margin:0;
    display: flex;
    justify-content: center;
    align-content: center;
}


.w3-bar .w3-bar-left,
.w3-bar .w3-bar-right {
    margin: 0;
    padding: 0;
    height: 100%;
    display: flex;
    justify-content: center;
}

.w3-bar {
    display: flex;
    justify-content: space-between;
}

.w3-bar-img-container {
    display: flex;
    justify-content: center;
    height: 100%;
}

.w3-bar-img {
    padding: 10px 10px 10px 10px;
    margin: 2px 13px;
    height: 60px;
    width: 60px; 
    float: left;
  border: none;
  outline: 0;
  display: block;
}

.w3-search-term {
    color: grey;
    background-color: transparent;
    outline: 0;
    /* border-bottom: 1px solid grey; */
    height: 30px;
    margin-top: 12px;
}

.w3-search-term-container:focus  {
    border-bottom: tomato;
}

.w3-bar-search-button {
    background-color: transparent;
    border: none;
    outline: none;
    padding-right: 5px;
}

.w3-bar-search-button img {
    background-color: transparent;
    height: 20px;
    width: 20px;
    align-content: center;
    margin: 0px 0px 2px 15px;
    margin-bottom: 0;
}

input {
	outline: none;
	border: none;
}

.router-link {
    color: white;
    text-decoration: none;
    top: 50%;
}

.router-link :hover {
    color: black;
    text-decoration: none;
}

.space {
    width: 15px;
}

router-link {
   display: flex;
  text-align: center;
  justify-content: center;
}

.dropdown-item {
    display: flex;
}

.dropdown-item img {
    margin-right: 5px;
    height: 20px;
    width: 20px;
}

.bottom-border {
    border-bottom: 1px solid #cdcdcd;
}

.account-circle {
    margin-bottom: 0.5px;
}

</style>

<template>
    <div class="w3-top">
      <div class="w3-bar w3-black w3-card">
        <!-- <a
          class="w3-bar-item w3-button w3-padding-large w3-hide-medium w3-hide-large w3-right" href="javascript:void(0)"
          onclick="myFunction()"
          title="Toggle Navigation Menu"
          ><i class="fa fa-bars"></i
        ></a> -->
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
            <a href="#" class="w3-bar-item w3-button w3-padding-large">HOME</a>
            <a href="#band" class="w3-bar-item w3-button w3-padding-large w3-hide-small">ABOUT</a>
            <a href="#tour" class="w3-bar-item w3-button w3-padding-large w3-hide-small">FAQs</a>
            <a href="#contact" class="w3-bar-item w3-button w3-padding-large w3-hide-small">CONTACT</a>
        
            <div class="w3-dropdown-hover w3-hide-small">
                <button class="w3-padding-large w3-button" title="More">MORE <i class="fa fa-caret-down"></i></button>
            <div class="w3-dropdown-content w3-bar-block w3-card-4">
                <a href="#" class="w3-bar-item w3-button">Merchandise</a>
                <a href="#" class="w3-bar-item w3-button">Extras</a>
                <a href="#" class="w3-bar-item w3-button">Media</a>
            </div>
            </div>
        </div>
        <!-- <a
          href="javascript:void(0)"
          class="w3-padding-large w3-hover-red w3-hide-small w3-right"
          ><i class="fa fa-search"></i
        ></a> -->
      </div>
    </div>
</template>


<script>
export default {
    data() {
        return {
            searchKeyword: ""
        }
    },

    methods: {
        handleInput: function(value) {
            this.searchKeyword = value;
        },

        search: function() {
            alert("You are searching for " + this.searchKeyword);
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

</style>

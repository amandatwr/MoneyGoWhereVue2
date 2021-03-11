<template>
  <div>
      <br><br><br><br><br><br>
      <h1><b> Get your optimal savings plan in seconds </b> </h1>
      <br>
      <h2>I want to invest $ <input type = "number" v-model = "amount" size="10"> and hold it for <input type = "number" v-model = "years" size="5"> years.</h2>
      <h2> I <u class = "u-background-color">(need/</u><u class = "u-background-color"> do not need)</u> to be able to withdraw the money anytime</h2>
      <br>
      <div class="center">
          <!--onclick="smoothScroll(document.getElementById('second'))" <div class="first"></div><div class="second" id="second"></div> -->
          <button type="saverplan-button"  @click="image_show = true">Next</button>
      </div>
      <br>
      <video v-if="image_show" width="960" height= "600" class="centerimg" autoplay >
        <source src="./../assets/Options.mp4" type="video/mp4">
        </video>
      
      <br><br><br><br><br><br>
      <div class="center">
      <button class="financialadvisor-button">Chat with a Financial Advisor</button>
      </div>
      <br><br><br>
      
    
      
      
    </div>  
</template>


<script>
export default {
    data() {
        return{
            image_show : false,
            
        }
        
    },

    methods: {

        // window.smoothScroll = function(target) {
        //     var scrollContainer = target;
        //     do { //find scroll container
        //         scrollContainer = scrollContainer.parentNode;
        //         if (!scrollContainer) return;
        //         scrollContainer.scrollTop += 1;
        //     } while (scrollContainer.scrollTop == 0);

        //     var targetY = 0;
        //     do { //find the top of target relatively to the container
        //         if (target == scrollContainer) break;
        //         targetY += target.offsetTop;
        //     } while (target = target.offsetParent);

        //     scroll = function(c, a, b, i) {
        //         i++; if (i > 30) return;
        //         c.scrollTop = a + (b - a) / 30 * i;
        //         setTimeout(function(){ scroll(c, a, b, i); }, 20);
        //     }
        //     // start scrolling
        //     scroll(scrollContainer, scrollContainer.scrollTop, targetY, 0);
        // },

    }

}
</script>





<style scoped>
h1{
    text-align: center;
}

h2 {
    text-align: center;
}
/* Chrome, Safari, Edge, Opera */
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

/* Firefox */
input[type=number] {
  -moz-appearance: textfield;
}

button {
    color:#192841;
    background-color: transparent;
	border: 2px solid #192841;
	cursor: pointer;
	letter-spacing: 0.2125rem;
	line-height: 1;
	overflow: hidden;
	padding: 20px 30px;
	position: relative;
	text-align: center;
	text-transform: uppercase;
    outline: 0;
}

.saverplan-button:hover {
    background-color: lightgray;
}

.financialadvisor-button:hover{
    background-color: lightgray;
}

.center {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 200px;
  
}

.centerimg {
  display: block;
  margin-left: auto;
  margin-right: auto;
  width: 70%;
}

.first {
    width: 100%;
    height: 1000px;
    background: #ccc;
}

.second {
    width: 100%;
    height: 1000px;
    background: #999;
}

u {
    cursor: pointer;
}


.u-background-color::selection {
  background-color: #f1c40f;
}

</style>
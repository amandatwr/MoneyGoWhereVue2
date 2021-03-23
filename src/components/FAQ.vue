<template>
    <div>
        <div class="banner">
            <div class="banner-text">
                <h1 class="page-title">Frequently Asked Questions</h1>
            </div>
        </div>

        <div class="body">
            <!-- <div id="bootstrap-toggle" class="toggle-panel accordionStyles tab-content">
                        <div class="card">
                            <div class="card-header" role="tab" id="headingOne">
                                <a role="button" class="panel-title text-black collapsed" data-toggle="collapse" data-parent="#accordion" data-core="" href="#collapse1_473" aria-expanded="false" aria-controls="collapse1">
                                    <h4>
                                        <span class="down-arrow"></span> What is MoneyGoWhere?
                                    </h4>
                                </a>
                            </div>
                            <div id="collapse" class="panel-collapse noScroll collapse" role="tabpanel" aria-labelledby="headingOne" style="">
                                <div class="panel-body">
                                    <p class="panel-text">
                                       MoneyGoWhere is a blahblah.</p>
                                </div>
                            </div>
                        </div>
            </div> -->
            <p class="accordion">Q1. What currency is the course charged in?</p>
            <div class="panel">A. The course is charged in Australian dollars.</div>
        </div>
    </div>
</template>

<script>
// import database from '../firebase.js'
export default {
    components: {},
    // data() {
    //     return {
    //         savingPlan: [],
    //         doc_id: this.$route.params.id
    //     }
    // },
    // methods: {
    //     fetchItems: function() {

    //     }
    // },
    // created() {
    //     this.fetchItems()
    // }
}

/* Toggle between adding and removing the "active" and "show" classes when the user clicks on one of the "Section" buttons. The "active" class is used to add a background color to the current button when its belonging panel is open. The "show" class is used to open the specific accordion panel */
var acc = document.getElementsByClassName("accordion");
var i;

for (i = 0; i < acc.length; i++) {
    acc[i].onclick = function(){
        this.classList.toggle("active");
        this.nextElementSibling.classList.toggle("show");
};
}
</script>

<style scoped>
.banner {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  background-image: url("./../assets/office.jpg"); /* Need to change picture */
  background-size: cover;
  height: 400px;
}

.banner-text {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.page-title {
  font-family: "Open Sans", sans-serif;
  font-size: 90px;
  color: white;
  margin: 0;
  height: 120px;
}

.body {
    padding: 100px;
    justify-content: center;
    align-items: center;
}

/* Style the element that is used to open and close the accordion class */
p.accordion {
    background-color: #eee;
    color: #444;
    cursor: pointer;
    padding: 18px;
    width: 100%;
    text-align: left;
    border: none;
    outline: none;
    transition: 0.4s;
    margin-bottom:10px;
}

/* Add a background color to the accordion if it is clicked on (add the .active class with JS), and when you move the mouse over it (hover) */
p.accordion.active, p.accordion:hover {
    background-color: #ddd;
}

/* Unicode character for "plus" sign (+) */
p.accordion:after {
    content: '\2795'; 
    font-size: 13px;
    color: #777;
    float: right;
    margin-left: 5px;
}

/* Unicode character for "minus" sign (-) */
p.accordion.active:after {
    content: "\2796"; 
}

/* Style the element that is used for the panel class */

div.panel {
    padding: 0 18px;
    background-color: white;
    max-height: 0;
    overflow: hidden;
    transition: 0.4s ease-in-out;
    opacity: 0;
    margin-bottom:10px;
}

div.panel.show {
    opacity: 1;
    max-height: 500px; /* Whatever you like, as long as its more than the height of the content (on all screen sizes) */
}

/* Body */ 
/* .bootstrap-toggle {
    -webkit-tap-highlight-color: transparent;
    font-size: 1rem;
    font-weight: 400;
    color: #232323;
    font-style: normal;
    line-height: 1.5;
    word-wrap: break-word;
    box-sizing: inherit;
}
.card {
    -webkit-text-size-adjust: 100%;
    -webkit-tap-highlight-color: transparent;
    font-size: 1rem;
    font-weight: 400;
    color: #232323;
    font-style: normal;
    line-height: 1.5;
    box-sizing: inherit;
    position: relative;
    display: flex;
    flex-direction: column;
    min-width: 0;
    word-wrap: break-word;
    background-clip: border-box;
    background-color: transparent;
    border: none;
    border-radius: 0px;
    margin-bottom: -1px;
}
.card-header{
    -webkit-text-size-adjust: 100%;
    -webkit-tap-highlight-color: transparent;
    font-size: 1rem;
    font-weight: 400;
    color: #232323;
    font-style: normal;
    line-height: 1.5;
    word-wrap: break-word;
    box-sizing: inherit;
    margin-bottom: 0;
    background-color: rgba(0,0,0,.03);
    border-radius: 0px;
    border: 0px;
    padding: 0;
}

.button {
    -webkit-text-size-adjust: 100%;
    -webkit-tap-highlight-color: transparent;
    font-size: 1rem;
    word-wrap: break-word;
    box-sizing: inherit;
    background-color: transparent;
    cursor: pointer;
    touch-action: manipulation;
    color: #000000 !important;
    margin-bottom: 0;
    margin-top: -1px;
    font-weight: 500;
    font-style: normal;
    display: block;
    text-decoration: none !important;
    line-height: normal;
}
h4 {
    -webkit-text-size-adjust: 100%;
    -webkit-tap-highlight-color: transparent;
    cursor: pointer;
    font-style: normal;
    box-sizing: inherit;
    font-weight: 500;
    color: inherit;
    margin-top: 0;
    line-height: 1;
    word-break: break-word;
    word-wrap: break-word;
    font-family: 'Rubik', sans-serif;
    font-size: 1.5rem;
    border: 1px solid #dfdfdf;
    padding: 1.3rem 2rem;
    margin-bottom: 0;
}

.down-arrow {
    content: ; /* To add image into assets*/
/* }

.collapse {
    -webkit-text-size-adjust: 100%;
    -webkit-tap-highlight-color: transparent;
    font-family: -apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif;
    font-size: 1rem;
    font-weight: 400;
    color: #232323;
    font-style: normal;
    line-height: 1.5;
    word-wrap: break-word;
    box-sizing: inherit;
    display: none;
}
.panel-body {
    -webkit-text-size-adjust: 100%;
    -webkit-tap-highlight-color: transparent;
    font-size: 1rem;
    font-weight: 400;
    color: #232323;
    font-style: normal;
    line-height: 1.5;
    word-wrap: break-word;
    box-sizing: inherit;
    padding: 1.5rem!important;
}
.panel-text{
    -webkit-text-size-adjust: 100%;
    -webkit-tap-highlight-color: transparent;
    font-weight: 400;
    font-style: normal;
    line-height: 1.5;
    word-wrap: break-word;
    box-sizing: inherit;
    margin-top: 0;
    margin-bottom: 1rem;
    font-family: 'Rubik', sans-serif;
    font-size: 1rem;
    color: #767676;
} */

</style>


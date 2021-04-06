<template>
    <div>
        <div class="banners">
            <div class="banner-text">
                <h1 class="page-title">Frequently Asked Questions</h1>
            </div>
        </div>

        <div class="body">
            <input type="checkbox" id="title1" />
            <label for="title1">What is MoneyGoWhere?</label>

            <div class="content">
            MoneyGoWhere is a one-stop platform for all things savings. <br>
            We started out with the aim to streamline a user's search process for savings plans. <br> 
            <br>
            MoneyGoWhere offers 3 unique features:<br> 
                <div class ="bodyText">
                1) A consolidated database with listings of all savings plans.<br>
                2) A snapshot of all your savings plans, for you to have a consolidated view of your performance.<br>
                3) A novel recommender, recommending you plans that suit your needs.<br>
                </div>
            </div>

            <input type="checkbox" id="title2" />
            <label for="title2">Is MoneyGoWhere free?</label>

            <div class="content">
            MoneyGoWhere is free for all users.<br>
            Savers are at the heart of our work; we want to create value for our users at no additional cost to them.<br>
            </div>

            <input type="checkbox" id="title3" />
            <label for="title3">Is MoneyGoWhere associated with any of the financial institutions listed?</label>

            <div class="content">
            No, MoneyGoWhere is an independent platform. <br>
            We consolidate listings from the financial institutions, so that users can view all savings plans on a single platform. <br>
            </div>

            <input type="checkbox" id="title4" />
            <label for="title4">Will MoneyGoWhere sell my data?</label>

            <div class="content">
            MoneyGoWhere will never sell your data.<br>
            We are committed to driving value for our users, with customer-centric & trust being our core values. <br>
            Your data is encrypted and protected on our servers.<br>
            </div>

            <input type="checkbox" id="title5" />
            <label for="title5">How do I register for an account with MoneyGoWhere?</label>

            <div class="content">
            Simply click on the "Login" button in the navigation bar, and you can click "Register" to create an account online instantaneously. <br>
            <br>
            Creating an account will allow you to access our novel features: your very own savings dashboard & our novel plan recommender.<br>
            </div>

        </div>
    </div>
</template>

<script>
export default {

}
</script>

<style scoped>
.banners {
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
  font-size: 75px;
  color: white;
  margin: 0;
  height: 90px;
}
.body {
    padding: 100px;
    padding-left: 200px;
    padding-right: 200px;
    justify-content: center;
    align-items: center;
}

/* Styling the accordion */

label {
    display: block;    
    padding: 8px 22px;
    margin: 0 0 1px 0;
    cursor: pointer;
    background: #eee;
    border-radius: 3px;
    color: #444;
    transition: ease .5s;
    font-size: 20px;
    position: relative;
}

label:hover {
    background: #ccc;
}

label::after {
    content: '+';
    position: absolute;
    right: 14px;
    top: 7px;
    font-size: 25px;
}

input:checked + label::after {
    content: '-';
    right: 14px;
    top: 7px;
}


input {
    display: none;
}

input + label + .content {
    display: none;
}

input:checked + label + .content {
    display: block;
}

.content {
    background: #fff;
    padding: 30px 30px;
    margin: 0 0 1px 0;
    border-radius: 3px;
    text-align: left;
    font-size: 18px;
}

.bodyText {
    font-size: 14px;
    color: grey;
}

</style>

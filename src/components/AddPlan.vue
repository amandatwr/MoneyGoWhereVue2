<template>
   <div class = "addNew">
      <button id = "addButton"
        @click="show_form = true"
      >
      </button>

    <div v-if="show_form" class="centerimg2">
      <form>
      </form>
    </div>
    </div>

       

</template>

<script>
export default {
    data() {
        return{
            show_form: false,
            
        };
    },

    components: {

    },

    
};

</script>


<style scoped>

#addButton {
    background-image: "../assets/add_new(1).png";
    height: 100px;
    width: 100px;
}

#addNew {
    text-align: center;
    margin-top: 500px;
    padding-top: 100px;
    height: 5000px;
    width: 100%;
}

</style>
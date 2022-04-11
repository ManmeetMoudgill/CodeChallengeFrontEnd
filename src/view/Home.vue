<template>
  <div class="container">
    <div class="flex justify-between items-center">
      <h2 class="text-5xl">News</h2>

      <form action="" class="flex items-center ">
      

        
        <div class="">
          <select v-model="selectedSource" @change="sourceChanged($event)"
            class="  border border-gray-300 px-4 py-1  text-sm font-medium text-gray-700 hover:bg-gray-50  focus:ring-2 focus:ring-offset-2   z-50  mt-2 w-56 rounded-md shadow-md bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
            
          >
              <!-- Active: "bg-gray-100 text-gray-900", Not Active: "text-gray-700" -->
              <option disabled value="">Filter by source</option>
              <option
                
                v-for="source in this.$store.state.newsSources" :key="source"
                class="text-gray-700 hover:bg-gray-200 block px-4 py-2 text-sm"
                role="menuitem"
                selected
                tabindex="-1"
                id="menu-item-0"
                >{{source}}</option
              >
           
          </select>
        </div>

        <div class="flex items-center ml-2 ">
          
          <input
            type="checkbox"
            v-on:change="OrderByTitleChanged"
            v-model="OrderByTitle"
            name="orderByTitle"
            class="ml-2 w-4 h-4 rounded-md shadow-md"
            id="orderByTitle"
          />
          <label class="form-check-label   ml-2 inline-block text-gray-800" for="orderByTitle">Ordina per titolo</label>
        </div>
      </form>
    </div>
    <News :news="this.$store.state.news" />

    <div
      class="flex justify-center"
      v-if="
        this.$store.state.news.length === 0 &&
        this.$store.state.isActive === false
      "
    >
      <h2 class="text-2xl font-bold">Sorry there,no news found</h2>
    </div>

    <div
      v-if="this.$store.state.news.length !== 0"
      class="flex justify-between items-center mb-3"
    >
      <button
        :disabled="this.$store.state.pageNumber == 1"
        v-on:click="previousPage"
        class="mt-4 py-2 px-4 text-white text-center rounded-md shadow-md bg-blue-600 hover:bg-blue-500 transition-all delay-150"
      >
        Previous
      </button>
      <button
        :disabled="
          this.$store.state.pageNumber + 1 >
          Math.ceil(this.$store.state.totalNews / 20)
        "
        v-on:click="nextPage"
        class="mt-4 py-2 px-4 text-white text-center rounded-md shadow-md bg-blue-600 hover:bg-blue-500 transition-all delay-150"
      >
        Next
      </button>
    </div>
  </div>
</template>

<script>
const baseUrl = "http://127.0.0.1:80";
import News from "../components/News.vue";
export default {
  name: "Home",
  components: {
    News,
  },
  data() {
    return {
      OrderByTitle: "",
      pageNumber: 1,
      totalNews: null,
      selectedSource:""
    };
  },
  methods: {
    OrderByTitleChanged() {
      this.$store.dispatch("ordinePerTitolo", {
        orderByTitle: this.OrderByTitle,
      });
    },
    nextPage() {
      this.$store.dispatch("next");
    },
    previousPage() {
      this.$store.dispatch("previous");
    },
    sourceChanged(event){
     this.$store.dispatch("getNewBasedOnSource",{
       source:event.target.value
     })
    }
  },
  mounted() {
    this.$store.dispatch("getNews");
    
   
  },
  created(){
    this.totalNews=this.$store.state.totalNews;
  }
};
</script>

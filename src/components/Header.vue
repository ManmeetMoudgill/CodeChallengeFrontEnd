<template>
    <nav class="navbar navbar-expand-lg navbar-light bg-light">

  <div class="container-fluid">
    <a class="navbar-brand" href="#">Code Challenge</a>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav me-auto mb-2 mb-lg-0">
        <li class="nav-item">
          
          <router-link class="nav-link active" aria-current="page" to="/home">Home</router-link>
        </li>
      </ul>
      <form class="d-flex">
        <input v-on:keyup="changeSearch" v-model="search" class="form-control me-2" type="search" placeholder="Search" aria-label="Search">
        
      </form>
    </div>
  </div>
</nav>
</template>

<script>

export default {
    name:'Header',
    data() {
        return {
            search:""
        }
    },
    methods: {
      changeSearch(){
        this.$store.dispatch("search", {search:this.search});
      }
    },
}
</script>

<template>
    <div class="container">
        <div class="flex justify-between items-center">
            <h2 class="text-5xl">News</h2>
            <form action="" class="flex items-center">
                <label class="text-base" for="orderByTitle">Ordina per titolo</label>
                <input type="checkbox" v-on:change="OrderByTitleChanged" v-model="OrderByTitle" name="orderByTitle" class="ml-2 w-4 h-4" id="orderByTitle">
            </form>
        </div>
        <News/>
    </div>
</template>

<script>
const baseUrl="http://127.0.0.1:80";
import News from '../components/News.vue'
import axios   from 'axios'
export default {
    name:'Home',
    components:{
        News,
    },
    data() {
        return {
            OrderByTitle:'',
        }
    },
    methods: {
        OrderByTitleChanged(){
            axios.get(`${baseUrl}/news?orderByTitle=${this.OrderByTitle}`).then((res)=>{
                console.log(res.data)
            }).catch((err)=>{
                console.log(err);
            })
        }
    },
}
</script>
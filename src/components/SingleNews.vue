<template>
    <div class="flex flex-col">
        <div class="mb-3">
            <a v-on:click="this.$router.go(-1)"   class="">
                <img class="cursor-pointer" src="../assets/back.png" alt="">
            </a>
        </div>
        <div v-if="news!==null" class="grid md:grid-cols-2 grid-cols-1 shadow-lg rounded-xl">
            <div class="">
                <img class="object-contain h-auto rounded-l-md " :src="news.urlToImage" alt="">
            </div>
            <div class="p-4">
                <h2 class="font-bold">{{news.title}}</h2>
                <p class="w-4/5 mt-2">{{news.description}}</p>
                <p class="mt-1">{{formatDate(news.publishedAt)}}</p>
                <p class="mt-1 mb-3">{{news.author}}</p>
                <a :href="news.url" target="_blank" class="relative cursor-pointer">
                    <img v-on:mouseleave="hoverImg=false"  v-on:mouseenter="hoverImg=true" src="../assets/giornale.png" alt="">
                    <div class="absolute top-6 text-black  w-24  py-1 px-2 rounded-md bg-gray-200 text-sm font-medium" v-if="hoverImg">Read more</div>
                </a>
            </div>
            
        </div>
    </div>
</template>


<script>
import axios from 'axios';
export default {
    name:"SingleNews",
    data(){
        return {
            news:null,
            hoverImg:false
        }
    },
    methods: {
        formatDate(dateInUtcFormat){
            return new Date(dateInUtcFormat).getDate()+"/"+new Date(dateInUtcFormat).getMonth()+"/"+new Date(dateInUtcFormat).getFullYear();
        },
        
    },
    mounted(){
        this.$store.commit("showProgressBar");
        axios.get(`${this.$store.state.baseUrl}/singleNews/${this.$route.params.name}?author=${this.$route.params.author}`).then((res)=>{
            this.news=res.data.news;
           
            this.$store.commit("hideProgressBar");
        }).catch((err)=>{
            console.log(err);
        })
    
    },created(){
        this.$watch(()=>this.$route.params.name,()=>{
            this.$store.commit("showProgressBar");
            axios.get(`${this.$store.state.baseUrl}/singleNews/${this.$route.params.name}?author=${this.$route.params.author}`).then((res)=>{
                this.news=res.data.news;
                this.$store.commit("hideProgressBar");
            }).catch((err)=>{
                console.log(err);
            })
        })
    }
}
</script>
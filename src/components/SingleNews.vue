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
        <div v-if="news===null" class="flex justify-center">
            <h3 class="font-bold text-3xl">Opps! something went wrong</h3>
            
        </div>
    </div>
</template>


<script>
export default {
    name:"SingleNews",
    data(){
        return {
            news:{
                title:"",
                description:"",
                urlToImage:"",
                author:"",
                publishedAt:"",
                url:"",
                content:"",
                source:{
                    name:""
                }
            },
            hoverImg:false
        }
    },
    methods: {
        formatDate(dateInUtcFormat){
            return new Date(dateInUtcFormat).getDate()+"/"+new Date(dateInUtcFormat).getMonth()+"/"+new Date(dateInUtcFormat).getFullYear();
        },
        
    },
    mounted(){
        const {author,urlToImage,content,description,title,source}=this.$route.params;
        this.news.title=title;
        this.news.description=description;
        this.news.author=author;
        this.news.urlToImage=urlToImage;
        this.news.content=content;
        this.news.source=source;
    },created(){
        this.$watch(()=>this.$route.params,()=>{
             const {author,urlToImage,content,description,title,source}=this.$route.params;
             this.news.title=title;
             this.news.description=description;
             this.news.author=author;
             this.news.urlToImage=urlToImage;
             this.news.content=content;
             this.news.source=source;
        })
    }
}
</script>
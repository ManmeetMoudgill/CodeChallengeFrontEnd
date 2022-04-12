<template>
    <div class="group  relative my-4 rounded-xl shadow-md  overflow-hidden transition-all delay-150 transform ">
        <div class="absolute bottom-2 left-4 flex flex-col">
            <span class="text-black font-medium">{{formatDate(data.publishedAt)}}</span>
            <span class="text-base font-medium  z-50 text-black">{{data.author}}</span>
        </div>

            

      <img v-on:click="imgClicked" :src="data.urlToImage?data.urlToImage:'https://image.shutterstock.com/image-vector/breaking-news-background-planet-260nw-667420906.jpgD'" class=" group-hover:scale-105  transform transition-all delay-250 card-img-top h-56 object-cover" alt="Immagine non disponibile" />
      <div class="card-body">
        <h5 class="card-title font-bold  h-14  mb-3">{{data.title && data.title.substring(0,100)}}...</h5>

       
        <p class="card-text mb-3 h-20 overflow-hidden">
            {{data.description && data.description.substring(0,80)}}...
        </p>
           
           
           <div class="flex items-center justify-end">
                    <router-link :to="{name:'SingleNews',params:{author:data?.author,publishedAt:data?.publishedAt,urlToImage:data?.urlToImage,content:data?.content,description:data?.description,title:data?.title,source:data?.source.name,url:data?.url}}"  class="">
                        <img class="w-6 hover:rotate-180 transform transition-all delay-100  object-contain" src="../assets/more.png" alt="">
                    </router-link>
           </div>
      </div>
    </div>
</template>


<script>


export default {
    name:'NewsItem',
    props:{
        data:{
            type:Object,
            required:false
        }
    },
    methods: {
        formatDate(dateInUtcFormat){
            return new Date(dateInUtcFormat).getDate()+"/"+new Date(dateInUtcFormat).getMonth()+"/"+new Date(dateInUtcFormat).getFullYear();
        },
        imgClicked(){
            this.$router.push({name:'SingleNews',params:{author:this.data?.author,publishedAt:this.data?.publishedAt,urlToImage:this.data?.urlToImage,content:this.data?.content,description:this.data?.description,title:this.data?.title,source:this.data?.source.name,url:this.data?.url}});
        }
        
    },
    
  
    
}

</script>

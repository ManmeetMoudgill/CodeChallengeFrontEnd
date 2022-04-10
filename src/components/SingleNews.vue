<template>
    <div>
        <div class="grid md:grid-cols-2 grid-cols-1 shadow-lg rounded-xl">
            <div class="">
                <img class="object-contain h-auto rounded-l-md " :src="news.urlToImage" alt="">
            </div>
            <div class="p-4">
                <h2 class="font-bold">{{news.title}}</h2>
                <p class="w-4/5 mt-2">{{news.description}}</p>
                <p class="mt-1">{{formatDate(news.publishedAt)}}</p>
                <p class="mt-1 mb-3">{{news.author}}</p>
                <a :href="news.url"  class=" mt-2 py-2 px-3  text-center  rounded-md shadow-md bg-blue-600 hover:bg-white hover:text-blue-600  transition-all delay-150 ">Read more</a>
            </div>
            
        </div>
    </div>
</template>


<script>
export default {
    name:"SingleNews",
    data(){
        return {
            news:{
                source: {
                id: null,
                name: "TMZ"
                },
                author: "TMZ Staff",
                title: "Jeff Bezos Gives Elon Musk Advice on Would-Be Twitter Homeless Shelter",
                description: "Elon Musk is considering turning one of Twitter's offices into a hub of humanitarianism -- and Jeff Bezos, of all people, has a suggestion ... get on my level, 'cause I already did it. The Tesla chief -- and now, the Twitter board member -- floated…",
                url: "https://www.tmz.com/2022/04/10/jeff-bezos-gives-elon-musk-advice-twitter-hq-homeless-shelter-amazon/",
                urlToImage: "https://imagez.tmz.com/image/36/16by9/2022/04/10/36b224a231fb43a8ad04507550892f19_xl.jpg",
                publishedAt: "2022-04-10T21:15:04Z",
                content: "Elon Musk is considering turning one of Twitter's offices into a hub of humanitarianism -- and Jeff Bezos, of all people, has a suggestion ... get on my level, 'cause I already did it.\r\nThe Tesla chi… [+1927 chars]"
                },
        }
    },
    methods: {
        formatDate(dateInUtcFormat){
            return new Date(dateInUtcFormat).getDate()+"/"+new Date(dateInUtcFormat).getMonth()+"/"+new Date(dateInUtcFormat).getFullYear();
        },
        
    },
}
</script>
import axios from 'axios'

import { createStore } from 'vuex'

// Create a new store instance.
const store = createStore({
    state() {
      return {
        width: 0,
        isActive: false,
        pageNumber: 1,
        baseUrl: "https://manmeet-news.herokuapp.com",
        news: [],
        totalNews: null,
        newsSources:[],
        searchKey: null,
        filterSource: null,
      }
    },
    mutations: {
      showProgressBar(state) {
        state.isActive = true;
        this.commit('IncrementWidth');
  
  
      },
      hideProgressBar(state) {
  
        state.isActive = false
  
      },
      IncrementWidth(state) {
  
        while (state.width < 100) {
          state.width = state.width + 25;
        }
  
  
      },
      setSearchKey(state, searchKey) {
        state.searchKey = searchKey;
      },
      getNews(state, payload) {
        state.news = payload.news;
        state.totalNews = payload.totalArticles;
      },
      next(state) {
        state.pageNumber++;
  
      },
      previous(state) {
        state.pageNumber--;
      },
      getSources(state,payload){
        state.newsSources=payload.sources;
      },
      getNewBasedOnSource(state,payload){
          state.news=payload.news;
          state.totalNews=payload.totalArticles;
      }
    },
    actions: {
      async getNews() {
        this.commit("showProgressBar");
        try {
          const news = await fetch(`${this.state.baseUrl}/news?page=${this.state.pageNumber}`);
          const newsdData = await news.json();
          this.commit('getNews', newsdData);
          this.dispatch("getSources");
          this.commit("hideProgressBar");
  
        } catch (err) {
          console.log(err);
          this.commit("hideProgressBar");
        }
      },
      next() {
        
        this.commit('next');
        if(this.state.searchKey!=undefined || this.state.searchKey!=null){
            this.dispatch("search");
        }else if(this.state.filterSource!=undefined || this.state.filterSource!=null){
            this.dispatch("filterBySource");
        }
        else{
          this.dispatch('getNews');

        }
      },
      previous() {
  
        
        this.commit('previous');
        if(this.state.searchKey!=null && this.state.searchKey!=undefined){
            this.dispatch("search");
        }else if(this.state.filterSource!=undefined || this.state.filterSource!=null){
          this.dispatch("filterBySource");
        }else{
          this.dispatch('getNews');

        }
        
      },
      async ordinePerTitolo(state,payload) {
        if(payload.orderByTitle===true){
          let filteredData=this.state.news;
          filteredData.sort((a, b) => a.title.split(/\s+/)[0].replace(/[^a-zA-Z ]/g, "").localeCompare(b.title.split(/\s+/)[0].replace(/[^a-zA-Z ]/g, "")));

        }else {
          this.dispatch("getNews");
        }
        
        
  
      
      },async search(state,payload){
       
        
        
        
        if(payload){
          if(payload.search){
            this.commit("setSearchKey",payload.search);
            if(payload.search.length>=4){
              try{
                const dataGotFromBackend=await axios.get(`${this.state.baseUrl}/news?&page=${this.state.pageNumber}&q=${payload.search?payload.search:this.state.searchKey}`);
               
                this.commit('getNews', dataGotFromBackend.data);
      
              }catch(err){
                  console.log(err)
              }
          }
          
        }
      }else{
          if(this.state.searchKey.length>=4 && this.state.searchKey!=null){
            try{
              const dataGotFromBackend=await axios.get(`${this.state.baseUrl}/news?&page=${this.state.pageNumber}&q=${this.state.searchKey}`);
             
              this.commit('getNews', dataGotFromBackend.data);
    
            }catch(err){
                console.log(err)
            }
        }
      }
      },
      getSources(){
        try{
            let sourcesArray=[];
            this.state.news.forEach((el)=>{
            
              if(el.source.name!=""){
                sourcesArray.push(el.source.name);
              }
            })

            this.commit('getSources',{sources:new Set(sourcesArray)});
          }catch(err){
              console.log(err);
          }

      },
      async getNewBasedOnSource(state,payload){
            const sourceName=payload.source;
            if(sourceName=="all"){
              this.dispatch("getNews");
            }else{
              this.state.filterSource=sourceName;
              try{
                let newsFilteredBySource=await axios.get(`${this.state.baseUrl}/news/filteredBySource/${sourceName}?page=${this.state.pageNumber}&pageSize=20`);
                this.commit('getNewBasedOnSource',newsFilteredBySource.data);
              
              }catch(err){
                console.log(err)
              }

            }
      }
  
  
    }
  })
  
    export default store  
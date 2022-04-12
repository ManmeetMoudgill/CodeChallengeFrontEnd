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
      orderChecked: false,
      totalNews: null,
      newsSources: [],
      searchKey: null,
      filterSource: null,
      messageAlert: null,
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
    setOrderChecked(state, value) {
      state.orderChecked = value;
    }, IncrementWidth(state) {

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
    getSources(state, payload) {
      state.newsSources = payload.sources;
    },
    getNewBasedOnSource(state, payload) {
      state.news = payload.news;
      state.totalNews = payload.totalArticles;
    },
    getMessageAlert(state, payload) {
      state.messageAlert = payload;
      setTimeout(() => {
        state.messageAlert.isActive = false;
      }, 3000)
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

        this.commit('getMessageAlert', {
          message: `Somethig went wrong`,
          isActive: true

        })
        this.commit("hideProgressBar");
      }
    },
    next() {

      this.commit('next');
      if (this.state.searchKey != undefined || this.state.searchKey != null) {
        this.dispatch("search");
      } else if (this.state.filterSource != undefined || this.state.filterSource != null) {
        this.dispatch("getNewBasedOnSource", { source: this.state.filterSource });
      } else if (this.state.orderChecked === true) {
        this.dispatch('getNews');
        setTimeout(() => {
          this.dispatch("ordinePerTitolo");

        }, 1500)
      }
      else {
        this.dispatch('getNews');

      }
    },
    previous() {


      this.commit('previous');
      if (this.state.searchKey != null && this.state.searchKey != undefined) {
        this.dispatch("search");
      } else if (this.state.filterSource != undefined || this.state.filterSource != null) {
        this.dispatch("getNewBasedOnSource", { source: this.state.filterSource });
      } else if (this.state.orderChecked === true) {
        this.dispatch('getNews');
        setTimeout(() => {
          this.dispatch("ordinePerTitolo");
        }, 1500)
      } else {
        this.dispatch('getNews');

      }

    },
    async ordinePerTitolo(state, payload) {

      if (payload?.orderByTitle === true || this.state.orderChecked === true) {

        const regex = /^[0-9]/;
        const result = this.state.news.sort((a, b) => a.title.split(/\s+/)[0].replace(/[^a-zA-Z ]/g, "").localeCompare(b.title.split(/\s+/)[0].replace(/[^a-zA-Z ]/g, ""))).filter((el) => {
          return regex.test(el.title) === false;
        })
        this.state.news = result;

      } else {

        if (this.state.searchKey != null && this.state.searchKey != undefined) {
          this.dispatch("search");
        } else if ((this.state.filterSource != undefined || this.state.filterSource != null) && this.state.filterSource !== "all") {
          this.dispatch("getNewBasedOnSource", { source: this.state.filterSource });
        } else {
          this.dispatch("getNews");

        }
      }
    }, async search(state, payload) {

      
      //created an function which will be called whenenver the search key is changed
      const searchData = async (baseUrl, pageNumber, q) => {
        const dataGotFromBackend = await axios.get(`${baseUrl}/news?&page=${pageNumber}&q=${q}`);
        this.commit('getNews', dataGotFromBackend.data);
      }

      if (payload) {
        if (payload.search) {
          this.commit("setSearchKey", payload.search);
          if (payload.search.length >= 4) {
            try {
              //calling the searchData function which will get the data from the external api
              searchData(this.state.baseUrl, this.state.pageNumber, payload.search);
            } catch (err) {
              this.commit('getMessageAlert', {
                message: `Somethig went wrong`,
                isActive: true

              })
            }
          }
        }
      } else {
        if (this.state.searchKey.length >= 4 && this.state.searchKey != null) {
          try {
            //calling the searchData function which will get the data from the external api
            searchData(this.state.baseUrl, this.state.pageNumber, this.state.searchKey);
          } catch (err) {

            this.commit('getMessageAlert', {
              message: `Somethig went wrong`,
              isActive: true

            })
          }
        }
      }

    },
    getSources() {
      try {
        let sourcesArray = [];
        this.state.news.forEach((el) => {

          if (el.source.name != "") {
            sourcesArray.push(el.source.name);
          }
        })

        this.commit('getSources', { sources: new Set(sourcesArray) });
      } catch (err) {

        this.commit('getMessageAlert', {
          message: `Somethig went wrong`,
          isActive: true

        })
      }

    },
    async getNewBasedOnSource(state, payload) {
      const sourceName = payload.source;
      if (sourceName == "all") {
        this.state.filterSource = sourceName;
        this.dispatch("getNews");
      } else {
        this.state.filterSource = sourceName;
        try {
          let newsFilteredBySource = await axios.get(`${this.state.baseUrl}/news/filteredBySource/${sourceName}?page=${this.state.pageNumber}&pageSize=20`);
          this.commit('getNewBasedOnSource', newsFilteredBySource.data);

        } catch (err) {

          this.commit('getMessageAlert', {
            message: `Somethig went wrong`,
            isActive: true

          })
        }

      }
    }


  }
})

export default store  

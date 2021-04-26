import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    error: false,
    parks: [],
    url: [],
  },
  mutations: {
    clearError(state) {
      state.error = false;
    },
    setError(state, payload) {
      state.error = payload;
    },
    updateParks(state, payload) {
      state.parks = payload;
    },
    SET_URL(state, url){
      state.url = url;
      //const url1 = state.parks.find(url);
      //url1.url = '123';

    }
  },
  actions: {
    fetchParks({ commit }) {
      return new Promise((resolve, reject) => {
        axios.get(`api/v1/parks`)
          .then((response) => {
            commit('updateParks', response.data);
            commit('clearError');
            resolve();
          })
          .catch((error) => {
            commit('updateParks', []);
            commit('setError', error.toString());
            reject();
          });
      });
    },
 
    uploadPhotos({ commit },e){
      return new Promise((resolve, reject) => {
        axios.post(`api/v1/parks/` + e.target.id,null,{
          params:{
            urlPhoto : e.target.files[0].name
          }
        })
        .then((response) => {
          console.log(e)
          commit('SET_URL',  response.data);
        });
      });
    }
  },
});

import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    error: false,
    parks: [],
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
  },
});

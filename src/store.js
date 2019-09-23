import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    idActual: localStorage.id
  },
  getters: {
    score (state){
      return state.idActual
    }
  },
  mutations: {
    updating (state, newValor) {
      state.idActual= newValor;
      console.log("entro store ", state.idActual);
    }
  },
  /*actions: {
    cambioIdNEW: ({commit}, payload) => {
      setTimeout(() => {
        commit('cambio', "new item")
      }, payload)
    }
  }*/
})

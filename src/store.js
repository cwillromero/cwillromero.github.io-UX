import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    idActual: localStorage.id,
    nameActual: localStorage.name
  },
  getters: {
    score (state){
      return state.idActual
    },
    getName(state){
      return state.nameActual
    }
  },
  mutations: {
    updating (state, newValor) {
      state.idActual= newValor;
      console.log("entro store ", state.idActual);
    },
    updatingName (state, newValor) {
      state.nameActual= newValor;
      console.log("entro storeName ", state.nameActual);
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

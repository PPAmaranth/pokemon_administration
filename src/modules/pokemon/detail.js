import request from '@/util/request.js';

export const pokemon_detail = {
    namespaced: true,
    state: {
        activeNames:['1','2'],
        currentState:{}
    },
    getters: {
        getPokemonDetailState: (state, getters) => {
            return state
        },
    },
    mutations: {
        updateCurrentState(state, result){
            state.currentState = result
        }
    },
    actions: {
        async getPokemonDetail(_,payload) {
            const endPointURI = 'http://localhost:8010/pokemon/detail';
            const method = 'POST';
            const data = {id:payload.id}
            const _newdetailRequest = await request(endPointURI, method, data)
            _.commit('updateCurrentState',_newdetailRequest.result)
        },
    },
  }
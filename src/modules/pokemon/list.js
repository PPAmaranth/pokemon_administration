import request from '@/util/request.js';

export const pokemon_list = {
    namespaced: true,
    state: {
        pageNum:0,
        pageSize:20,
        total:null,
        pages:null,
        tableData:[]
    },
    getters: {
        getPokemonListState: (state, getters) => {
            return state
        },
    },
    mutations: {
        updateList(state, result){
            state.tableData = result.list
            state.pages = result.pages
            state.total = result.total
            state.pageNum = result.pageNum
        }
    },
    actions: {
        async getPokemonList(_,payload) {
            const endPointURI = 'http://localhost:8010/pokemon/pokemonList';
            const method = 'POST';
            const data = {pageNum:payload.pageNum,pageSize:_.state.pageSize}
            const _newlistRequest = await request(endPointURI, method, data)
            _.commit('updateList',_newlistRequest.result)
        },
    },
  }
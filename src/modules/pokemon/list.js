import request from '@/util/request.js';

export const pokemon_list = {
    namespaced: true,
    state: {
        pageNum:0,
        pageSize:20,
        pages:null,
        tableData:[]
    },
    getters: {
        getTableData: (state, getters) => {
            return state.tableData
        },
        getPageNum: (state, getters) => {
            return state.pageNum
        },
        getPages: (state, getters) => {
            return state.pages
        },
    },
    mutations: {
        updateList(state, result){
            state.tableData = result.list
            state.pages = result.pages
        }
    },
    actions: {
        async getPokemonList(_) {
            const endPointURI = 'http://localhost:8010/pokemon/pokemonList';
            const method = 'POST';
            const data = {pageNum:_.state.pageNum,pageSize:_.state.pageSize}
            const _newlistRequest = await request(endPointURI, method, data)
            _.commit('updateList',_newlistRequest.result)
        },
    },
  }
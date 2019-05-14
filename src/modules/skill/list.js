import request from '@/util/request.js';

export const skill_list = {
    namespaced: true,
    state: {
        pageNum:0,
        pageSize:20,
        total:null,
        pages:null,
        tableData:[]
    },
    getters: {
        getSkillListState: (state, getters) => {
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
        async getSkillList(_,payload) {
            const endPointURI = 'http://localhost:8010/skill/list';
            const method = 'POST';
            const data = {pageNum:payload.pageNum,pageSize:_.state.pageSize}
            const _newlistRequest = await request(endPointURI, method, data)
            _.commit('updateList',_newlistRequest.result)
        },
    },
  }
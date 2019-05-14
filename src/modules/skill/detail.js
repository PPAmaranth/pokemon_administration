import request from '@/util/request.js';

export const skill_detail = {
    namespaced: true,
    state: {
        currentState:{}
    },
    getters: {
        getSkillDetailState: (state, getters) => {
            return state
        },
    },
    mutations: {
        updateCurrentState(state, result){
            state.currentState = result
        }
    },
    actions: {
        async getSkillDetail(_,payload) {
            const endPointURI = 'http://localhost:8010/skill/detail';
            const method = 'POST';
            const data = {id:payload.id}
            const _newdetailRequest = await request(endPointURI, method, data)
            _.commit('updateCurrentState',_newdetailRequest.result)
        },
    },
  }
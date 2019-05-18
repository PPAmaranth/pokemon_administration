import request from '@/util/request.js';

export const pokemon_detail = {
    namespaced: true,
    state: {
        activeNames:['1','2'],
        currentState:{},
        propertiesOptions:[],
        classificationOptions:[
            {
               id:1,
               name:"物理" 
            },
            {
                id:2,
                name:"特殊"
            },
            {
                id:3,
                name:"变化"
            }
        ],
        //属性下拉改变
        handlePropertyNameChange(state, val){
            if(val == null){
                state['currentState']['propertyName'] = val
                state['currentState']['property'] = null
                return
            }
            for(let i in state['propertiesOptions']){
                if(state['propertiesOptions'][i]['name'] == val){
                    state['currentState']['property'] = state['propertiesOptions'][i]['id']
                    state['currentState']['propertyName'] = val
                }
            }
        },
        //类型下拉改变
        handleClassificationNameChange(state, val){
            if(val == null){
                state['currentState']['classificationName'] = val
                state['currentState']['classification'] = null
                return
            }
            for(let i in state['classificationOptions']){
                if(state['classificationOptions'][i]['name'] == val){
                    state['currentState']['classification'] = state['classificationOptions'][i]['id']
                    state['currentState']['classificationName'] = val
                }
            }
        }
    },
    getters: {
        getPokemonDetailState: (state, getters) => {
            return state
        },
    },
    mutations: {
        updateCurrentState(state, result){
            state.currentState = result
        },
    },
    actions: {
        async getPokemonDetail(_,payload) {
            const endPointURI = 'http://localhost:8010/pokemon/detail';
            const method = 'POST';
            const data = {id:payload.id}
            const _newdetailRequest = await request(endPointURI, method, data)
            _.commit('updateCurrentState',_newdetailRequest.result)
        },
        //获取属性列表
        async getProperties(_,payload) {
            const endPointURI = 'http://localhost:8010/property/list';
            const method = 'POST';
            const data = {}
            const _Request = await request(endPointURI, method, data)
            _.commit('setProperties',_Request.result)
        },
    },
  }
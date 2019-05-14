import request from '@/util/request.js';

export const skill_detail = {
    namespaced: true,
    state: {
        currentState:{},
        properties:[],
        classification:[
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
        ]
    },
    getters: {
        getSkillDetailState: (state, getters) => {
            return state
        },
    },
    mutations: {
        updateCurrentState(state, result){
            let _obj = {
                ...result
            }
            if(_obj.isMachineSkill){
                _obj.isMachineSkill = true
            }else{
                _obj.isMachineSkill = false
            }
            state.currentState = _obj
        },
        setProperties(state, result){
            let _arr = []
            for(let i in result){
                if(result[i]['id']>0){
                    _arr.push(result[i])
                }
            }
            state.properties = _arr
        },
        //属性下拉改变
        handlePropertyNameChange(state, val){
            for(let i in state['properties']){
                if(state['properties'][i]['name'] == val){
                    state['currentState']['property'] = state['properties'][i]['id']
                    state['currentState']['propertyName'] = val
                }
            }
        },
        //类型下拉改变
        handleClassificationNameChange(state, val){
            for(let i in state['classification']){
                if(state['classification'][i]['name'] == val){
                    state['currentState']['classification'] = state['classification'][i]['id']
                    state['currentState']['classificationName'] = val
                }
            }
        },
    },
    actions: {
        async getSkillDetail(_,payload) {
            const endPointURI = 'http://localhost:8010/skill/detail';
            const method = 'POST';
            const data = {id:payload.id}
            const _Request = await request(endPointURI, method, data)
            _.commit('updateCurrentState',_Request.result)
        },
        async getProperties(_,payload) {
            const endPointURI = 'http://localhost:8010/property/list';
            const method = 'POST';
            const data = {}
            const _Request = await request(endPointURI, method, data)
            _.commit('setProperties',_Request.result)
        },
        async save(_,payload) {
            const endPointURI = 'http://localhost:8010/skill/edit';
            const method = 'POST';
            let data = {
                ..._.state.currentState
            }
            if(data.isMachineSkill){
                data.isMachineSkill = 1
            }else{
                data.isMachineSkill = 0
                data.machineSkillCode = null
            }
            const _Request = await request(endPointURI, method, data)
            console.log(_Request)
        },
    },
  }
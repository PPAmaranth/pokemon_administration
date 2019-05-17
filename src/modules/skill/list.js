import request from '@/util/request.js';

export const skill_list = {
    namespaced: true,
    state: {
        pageNum:0,
        pageSize:20,
        total:null,
        pages:null,
        word:null,
        tableData:[],
        classification:null,
        classificationName:null,
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
        property:null,
        propertyName:null,
        propertiesOptions:[],
        
    },
    getters: {
        getSkillListState: (state, getters) => {
            return state
        },
    },
    mutations: {
        //更新列表
        updateList(state, result){
            state.tableData = result.list
            state.pages = result.pages
            state.total = result.total
            state.pageNum = result.pageNum
        },
        //设置属性下拉
        setProperties(state, result){
            let _arr = []
            for(let i in result){
                _arr.push(result[i])
            }
            state.propertiesOptions = _arr
        },
        //属性下拉改变
        handlePropertyNameChange(state, val){
            if(val == '全部'){
                state['propertyName'] = val
                state['property'] = null
                return
            }
            for(let i in state['propertiesOptions']){
                if(state['propertiesOptions'][i]['name'] == val){
                    state['property'] = state['propertiesOptions'][i]['id']
                    state['propertyName'] = val
                }
            }
        },
        //类型下拉改变
        handleClassificationNameChange(state, val){
            if(val == null){
                state['classificationName'] = val
                state['classification'] = null
                return
            }
            for(let i in state['classificationOptions']){
                if(state['classificationOptions'][i]['name'] == val){
                    state['classification'] = state['classificationOptions'][i]['id']
                    state['classificationName'] = val
                }
            }

        },
    },
    actions: {
        async getSkillList(_,payload) {
            const endPointURI = 'http://localhost:8010/skill/list';
            const method = 'POST';
            const data = {
                pageNum:payload.pageNum,
                pageSize:_.state.pageSize,
                word:_.state.word,
                property:_.state.property,
                classification:_.state.classification,
            }
            const _newlistRequest = await request(endPointURI, method, data)
            _.commit('updateList',_newlistRequest.result)
        },
        async getProperties(_,payload) {
            const endPointURI = 'http://localhost:8010/property/list';
            const method = 'POST';
            const data = {}
            const _Request = await request(endPointURI, method, data)
            _.commit('setProperties',_Request.result)
        },
    },
  }
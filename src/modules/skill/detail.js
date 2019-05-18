import request from '@/util/request.js';

export const skill_detail = {
    namespaced: true,
    state: {
        mode:null,//add edit 新增或编辑
        id:null,
        currentState:{},
        initState:null,
        rules:{
            cnName:[
                { required: true, message: '请输入中文名cnName', trigger: 'change' },
            ],
            propertyName:[
                { required: true, message: '请选择属性propertyName', trigger: 'change' },
            ],
            classificationName:[
                { required: true, message: '请选择类型classificationName', trigger: 'change' },
            ],
            power:[
                { required: true, message: '请输入威力power', trigger: 'change' },
            ],
            hitProbability:[
                { required: true, message: '请输入命中hitProbability', trigger: 'change' },
            ],
            pp:[
                { required: true, message: '请输入使用数值pp', trigger: 'change' },
            ],
            description:[
                { required: true, message: '请输入技能描述', trigger: 'change' },
            ],
        },
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
        ]
    },
    getters: {
        getSkillDetailState: (state, getters) => {
            return state
        },
    },
    mutations: {
        //写入状态和id
        setInitMsg(state, props){
            state.id = props.id
            state.mode = props.mode
        },
        //更新当前详情状态
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
        //保存初始currentState的字符串
        setInitState(state, string){
            state.initState = string
        },
        //设置属性下拉
        setProperties(state, result){
            let _arr = []
            for(let i in result){
                if(result[i]['id']>0){
                    _arr.push(result[i])
                }
            }
            state.propertiesOptions = _arr
        },
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
        },
    },
    actions: {
        //打开页面
        async openPage(_,payload) {
            //被打开时写入id与模式
            await _.commit('setInitMsg',payload.props)
            await _.dispatch({
                type: 'getSkillDetail'
            })
        },
        //关闭页面
        async closePage(_,payload) {
            const currentStateStr = JSON.stringify(_.state.currentState)
            //页面内容改变时关闭前提示是否关闭
            if(currentStateStr !== _.state.initState){
                await payload.payload.vueComponent.$confirm('页面已被操作，是否确定关闭？', '系统信息', {
                    confirmButtonText: '关闭',
                    cancelButtonText: '取消',
                    closeOnClickModal:false,
                    closeOnPressEscape:false
                }).then(()=>{
                    const props = {
                        id:null,
                        mode:null
                    }
                    _.commit('setInitMsg',props)
                }).catch(()=>{
                    
                })
            }else{
                const props = {
                    id:null,
                    mode:null
                }
                _.commit('setInitMsg',props)
            }
            //最后mode还存在就不关闭 否则就关闭
            if(_.state.mode){
                return false
            }else{
                return true
            }
        },
        //获取详情信息
        async getSkillDetail(_,payload) {
            const endPointURI = 'http://localhost:8010/skill/detail';
            const method = 'POST';
            const data = {id:_.state.id}
            const _Request = await request(endPointURI, method, data)
            _.commit('updateCurrentState',_Request.result)
        },
        //获取属性列表
        async getProperties(_,payload) {
            const endPointURI = 'http://localhost:8010/property/list';
            const method = 'POST';
            const data = {}
            const _Request = await request(endPointURI, method, data)
            _.commit('setProperties',_Request.result)
        },
        //保存
        async save(_,payload) {
            let endPointURI;
            if(_.state.mode == 'edit'){
                endPointURI  = 'http://localhost:8010/skill/edit';
            }
            if(_.state.mode == 'add'){
                endPointURI = 'http://localhost:8010/skill/add';
            }
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
            return _Request
        },
        //删除
        async delete(_,payload) {
            const endPointURI = 'http://localhost:8010/skill/delete';
            const method = 'POST';
            const data = {
                id:_.state.currentState.id
            }
            const _Request = await request(endPointURI, method, data)
            return _Request
        },
    },
  }
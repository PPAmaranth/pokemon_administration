import { pokemon } from '@/modules/pokemon/pokemon.js'
import { skill } from '@/modules/skill/skill.js'

export const main_module = {
    namespaced: true,
    state: {
        activePage:'1-1-1',
        contentTabs:[
            {
                index:"1-1-1",
                title:'查看精灵列表',
                page:'pokemon_list'
            }
        ],
        navList:[
            {
                title:'精灵模块',
                index:"1",
                children:[
                    {
                        title:'查询',
                        index:"1-1",
                        children:[
                            {
                                index:"1-1-1",
                                title:'查看精灵列表',
                                page:'pokemon_list'
                            }
                        ]
                    },
                    {
                        title:'编辑',
                        index:"1-2",
                        children:[
                            {
                                index:"1-2-1",
                                title:'精灵编辑',
                                page:'pokemon_detail'
                            }
                        ]
                    }
                ]
            },{
                title:'技能模块',
                index:"2",
                children:[
                    {
                        title:'查询',
                        index:"2-1",
                        children:[
                            {
                                index:"2-1-1",
                                title:'查看技能列表',
                                page:'skill_list'
                            }
                        ]
                    },
                    {
                        title:'编辑',
                        index:"2-2",
                        children:[
                            {
                                index:"2-2-1",
                                title:'技能编辑',
                                page:'skill_detail'
                            }
                        ]
                    }
                ]
            }
      ]
    },
    modules: {
        pokemon:pokemon,
        skill:skill
      },
    getters: {
      getMainState: (state, getters) => {
        return state
      },
    },
    mutations: {
        //导航点击打开页面
        navOpen (state, item) {
            let exist = false;
            for(let i in state["contentTabs"]){
                if(state["contentTabs"][i]["index"] == item["index"]){
                    exist = true
                }
            }
            if(exist){
                state["activePage"] = item["index"]
            }else{
                state["contentTabs"].push(item)
                state["activePage"] = item["index"]
            }
        },
        //改变当前激活页
        activePageChange(state, component){
            state["activePage"] = component.name
        },
        //移除页
        removeTab(state, targetName){
            if (state["activePage"] === targetName) {
                state["contentTabs"].forEach((tab, index) => {
                    if (tab.index === targetName) {
                        let nextTab = state["contentTabs"][index + 1] || state["contentTabs"][index - 1];
                        if (nextTab) {
                            state["activePage"] = nextTab.index;
                        }else{
                            state["activePage"] = null;
                        }
                    }
                });
            }
            state["activePage"] = state["activePage"];
            state["contentTabs"] = state["contentTabs"].filter(tab => tab.index !== targetName);
        }
    },
    actions: {
        //移除页面前执行
        async removePage(_,payload){
            let isClose = true
            const closeFunction = {
                '2-2-1':'skill/skill_detail/closePage'
            }
            if(closeFunction[payload.targetName]){
                await _.dispatch({
                    type:closeFunction[payload.targetName],
                    payload:payload
                }).then((bol)=>{
                    if(bol){
                        //从closePage里获取bol true关闭，false不关闭
                        _.commit('removeTab',payload.targetName)
                    }else{
                        isClose = false
                    }
                })
            }else{
                _.commit('removeTab',payload.targetName)
            }
            return isClose
        }
    },
  }
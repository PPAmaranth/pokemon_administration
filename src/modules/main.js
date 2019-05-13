import { pokemon } from '@/modules/pokemon/pokemon.js'

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
                        title:'新增',
                        index:"1-2",
                        children:[
                            {
                            index:"1-2-1",
                            title:'新增精灵',
                            page:'pokemon_detail'
                            }
                        ]
                    }
                ]
            }
      ]
    },
    modules: {
        pokemon:pokemon,
      },
    getters: {
      getNavList: (state, getters) => {
        return state.navList
      },
      getActivePage: (state, getters) => {
        return state.activePage
      },
      getContentTabs: (state, getters) => {
        return state.contentTabs
      },
    },
    mutations: {
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
        activePageChange(state, component){
            state["activePage"] = component.name
        },
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

    },
  }
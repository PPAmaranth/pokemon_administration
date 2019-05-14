import { skill_list } from '@/modules/skill/list.js'
import { skill_detail } from '@/modules/skill/detail.js'

export const skill = {
    namespaced: true,
    state: {
      
    },
    modules: {
        skill_list:skill_list,
        skill_detail:skill_detail
      },
    getters: {
      
    },
    mutations: {},
    actions: {},
  }
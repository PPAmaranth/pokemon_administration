import { pokemon_list } from '@/modules/pokemon/list.js'
import { pokemon_detail } from '@/modules/pokemon/detail.js'
export const pokemon = {
    namespaced: true,
    state: {
      
    },
    modules: {
        pokemon_list:pokemon_list,
        pokemon_detail:pokemon_detail,
      },
    getters: {
      
    },
    mutations: {},
    actions: {},
  }
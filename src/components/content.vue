<template>
  <div>
    <el-tabs v-model="activePage" type="border-card" closable @tab-remove="removeTab" @tab-click="tabclick">
        <el-tab-pane
            v-for="(item, index) in contentTabs"
            :key="item.index"
            :label="item.title"
            :name="item.index"
        >
            <component :is="item.page"></component>
        </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import pokemon_list from '@/page/pokemon/list'
import pokemon_detail from '@/page/pokemon/detail'
import skill_list from '@/page/skill/list'
import skill_detail from '@/page/skill/detail'
export default {
  name: 'maincontent',
  data () {
    return {
        
    }
  },
  computed:{
    activePage:{
        get:function(){
            return this.$store.getters["main/getMainState"]['activePage']
        },
        set:function(val){
            return val
        }
    },
    contentTabs:function(){
        return this.$store.getters["main/getMainState"]['contentTabs']
    }
  },
  components:{
      pokemon_list,pokemon_detail,skill_list,skill_detail
  },
  methods:{
      removeTab(targetName) {
        // this.$store.commit('main/removeTab', targetName)
        this.$store.dispatch({
            type: 'main/removePage',
            targetName:targetName,
            vueComponent:this
        })
      },
      tabclick(component){
          this.$store.commit('main/activePageChange', component)
      }
  }
}
</script>

<style scoped>
  .el-tabs{
    min-height:650px;
  }
</style>
<template>
  <div>
      <el-menu
      :default-active="mainState.activePage"
      class="el-menu-vertical-demo">
      <el-submenu 
        v-for="parent in mainState.navList" 
        :index="parent.index"
        :key="parent.index">
            <template slot="title">
                <span>{{parent.title}}</span>
            </template>
            <el-menu-item-group
                v-for="child in parent.children"
                :index="child.index"
                :key="child.index">
            <template slot="title">{{child.title}}</template>
                <el-menu-item
                    v-for="tchild in child.children"
                    :index="tchild.index"
                    :key="tchild.index"
                    @click="handleOpen(tchild)"
                    >
                    {{tchild.title}}
                </el-menu-item>
            </el-menu-item-group>
      </el-submenu>
    </el-menu>
  </div>
</template>

<script>
export default {
  name: 'navpage',
  data () {
    return {
      
    }
  },
  computed:{
    mainState:function () {
      return this.$store.getters["main/getMainState"]
    },
  },
  mounted(){
    
  },
  methods:{
      handleOpen(item){
        this.$store.commit('main/navOpen', item)
      }
  }
}
</script>

<style scoped>

</style>
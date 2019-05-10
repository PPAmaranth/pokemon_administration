<template>
  <div>
      <el-menu
      default-active="2"
      class="el-menu-vertical-demo"
      @open="handleOpen"
      @close="handleClose">
      <el-submenu 
        v-for="parent in navList" 
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
                    :key="tchild.index">
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
                          }
                      ]
                  }
              ]
          }
      ]
    }
  },
  methods:{
      handleOpen(key, keyPath) {
        // console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        // console.log(key, keyPath);
      }
  }
}
</script>

<style scoped>

</style>
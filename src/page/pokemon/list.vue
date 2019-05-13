<template>
  <div>
    <el-table
      :data="tableData"
      height="500"
      border
      size="mini"
      style="width: 100%">
      <el-table-column
        prop="id"
        label="id">
      </el-table-column>
      <el-table-column
        prop="name"
        label="名称">
      </el-table-column>
    </el-table>
    <el-pagination
      background
      layout="prev, pager, next"
      :total="pages">
    </el-pagination>
  </div>
</template>

<script>
  export default {
    name: 'pokemon_list',
    data() {
      return {
        
      }
    },
    computed:{
      tableData:{
          get:function(){
              return this.$store.getters["main/pokemon/pokemon_list/getTableData"]
          },
          set:function(val){
              return val
          }
      },
      pages:{
        get:function(){
              return this.$store.getters["main/pokemon/pokemon_list/getPages"]
          },
          set:function(val){
              return val
          }
      }
    },
    mounted(){
      this.$store.dispatch({
        type: 'main/pokemon/pokemon_list/getPokemonList',
      })
    }
  }
</script>
<style scoped>

</style>

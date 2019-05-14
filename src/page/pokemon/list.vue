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
    <el-row style="padding-top:15px;">
      <el-col :span="10">
        <el-pagination
          size="mini"
          background
          layout="prev, pager, next"
          :total="total"
          :page-size="pageSize"
          :current-page="currentPage"
          @current-change="currentChange">
        </el-pagination>
      </el-col>
      <el-col :span="12">
        跳转到第
        <el-input-number size="mini"
         v-model="currentPage"
         :min="0"
         :max="pages"
         :controls="false"
         @change="inputPageChange">
        </el-input-number>
        页
        <el-button icon="el-icon-s-promotion" size="mini" circle @click="jumpPage"></el-button>
      </el-col>
    </el-row>  
  </div>
</template>

<script>
  export default {
    name: 'pokemon_list',
    data() {
      return {
        inputPage:null
      }
    },
    computed:{
      tableData:{
          get:function(){
              return this.$store.getters["main/pokemon/pokemon_list/getPokemonListState"]['tableData']
          },
          set:function(val){
              return val
          }
      },
      pageSize:{
        get:function(){
              return this.$store.getters["main/pokemon/pokemon_list/getPokemonListState"]['pageSize']
          },
          set:function(val){
              return val
          }
      },
      total:{
        get:function(){
              return this.$store.getters["main/pokemon/pokemon_list/getPokemonListState"]['total']
          },
          set:function(val){
              return val
          }
      },
      currentPage:{
        get:function(){
              return this.$store.getters["main/pokemon/pokemon_list/getPokemonListState"]['pageNum']
          },
          set:function(val){
              return val
          }
      },
      pages:{
        get:function(){
              return this.$store.getters["main/pokemon/pokemon_list/getPokemonListState"]['pages']
          },
          set:function(val){
              return val
          }
      },
    },
    methods:{
      //当前页改变
      currentChange(newPage){
        this.$store.dispatch({
          type: 'main/pokemon/pokemon_list/getPokemonList',
          pageNum:newPage
        }).then(()=>{
          this.inputPage = newPage
        })
      },
      //跳转页
      jumpPage(){
        if(this.inputPage && this.inputPage != this.currentPage){
            this.$store.dispatch({
            type: 'main/pokemon/pokemon_list/getPokemonList',
            pageNum:this.inputPage
          })
        }
      },
      inputPageChange(val){
        this.inputPage = val
      },
    },
    mounted(){
      this.$store.dispatch({
        type: 'main/pokemon/pokemon_list/getPokemonList',
        pageNum:1
      })
    }
  }
</script>
<style scoped>

</style>

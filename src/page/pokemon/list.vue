<template>
  <div>
    <el-table
      :data="pokemonListState.tableData"
      height="500"
      border
      size="mini"
      style="width: 100%">
      <el-table-column
        prop="id"
        label="id">
      </el-table-column>
      <el-table-column
        prop="cnName"
        label="名称">
      </el-table-column>
      <el-table-column
        fixed="right"
        label="操作"
        width="100">
        <template slot-scope="scope">
          <el-button @click="handleClick(scope.row)" type="text" size="mini">编辑</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-row style="padding-top:15px;">
      <el-col :span="10">
        <el-pagination
          size="mini"
          background
          layout="prev, pager, next"
          :total="pokemonListState.total"
          :page-size="pokemonListState.pageSize"
          :current-page="pokemonListState.currentPage"
          @current-change="currentChange">
        </el-pagination>
      </el-col>
      <el-col :span="12">
        跳转到第
        <el-input-number size="mini"
         v-model="pokemonListState.currentPage"
         :min="0"
         :max="pokemonListState.pages"
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
      pokemonListState:{
          get:function(){
              return this.$store.getters["main/pokemon/pokemon_list/getPokemonListState"]
          },
          set:function(val){
              return val
          }
      }
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
      handleClick(row){
        this.$store.dispatch({
          type: 'main/pokemon/pokemon_detail/getPokemonDetail',
          id:row.id
        }).then(()=>{
          const detailItem = {
              index:"1-2-1",
              title:'精灵编辑',
              page:'pokemon_detail'
          }
          this.$store.commit('main/navOpen',detailItem)
        })
      }
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

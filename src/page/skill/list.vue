<template>
  <div>
    <el-table
      :data="skillListState.tableData"
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
        prop="power"
        label="属性">
      </el-table-column>
      <el-table-column
        prop="classificationName"
        label="类型">
      </el-table-column>
      <el-table-column
        prop="propertyName"
        label="威力">
      </el-table-column>
      <el-table-column
        prop="hitProbability"
        label="命中">
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
          :total="skillListState.total"
          :page-size="skillListState.pageSize"
          :current-page="skillListState.currentPage"
          @current-change="currentChange">
        </el-pagination>
      </el-col>
      <el-col :span="12">
        跳转到第
        <el-input-number size="mini"
         v-model="skillListState.currentPage"
         :min="0"
         :max="skillListState.pages"
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
    name: 'skill_list',
    data() {
      return {
        inputPage:null
      }
    },
    computed:{
      skillListState:{
          get:function(){
              return this.$store.getters["main/skill/skill_list/getSkillListState"]
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
          type: 'main/skill/skill_list/getSkillList',
          pageNum:newPage
        }).then(()=>{
          this.inputPage = newPage
        })
      },
      //跳转页
      jumpPage(){
        if(this.inputPage && this.inputPage != this.currentPage){
            this.$store.dispatch({
            type: 'main/skill/skill_list/getSkillList',
            pageNum:this.inputPage
          })
        }
      },
      inputPageChange(val){
        this.inputPage = val
      },
      handleClick(row){
        this.$store.dispatch({
          type: 'main/skill/skill_detail/getSkillDetail',
          id:row.id
        }).then(()=>{
          const detailItem = {
              index:"2-2-1",
              title:'技能编辑',
              page:'skill_detail'
          }
          this.$store.commit('main/navOpen',detailItem)
        })
      }
    },
    mounted(){
      this.$store.dispatch({
        type: 'main/skill/skill_list/getSkillList',
        pageNum:1
      })
    }
  }
</script>
<style scoped>

</style>

<template>
  <div>
    <el-row :gutter="24" justify="space-between" style="margin:0;">
        <el-col :span="6">
            <div class="el-input-group">
                <div class="el-input-group__prepend" style="font-size:14px;">类型</div>
                <el-select v-model="skillListState.classificationName" @change="classificationNameChange" size="mini" clearable>
                    <el-option
                    v-for="item in skillListState.classificationOptions"
                    :key="item.id"
                    :label="item.name"
                    :value="item.name">
                    </el-option>
                </el-select>
            </div>
        </el-col>
        <el-col :span="6">
            <div class="el-input-group">
                <div class="el-input-group__prepend" style="font-size:14px;">属性</div>
                <el-select v-model="skillListState.propertyName" @change="propertyNameChange" size="mini" clearable>
                    <el-option
                    v-for="item in skillListState.propertiesOptions"
                    :key="item.id"
                    :label="item.name"
                    :value="item.name">
                    </el-option>
                </el-select>
            </div>
        </el-col>
        <el-col :span="2">
            &nbsp;
        </el-col>
        <el-col :span="8">
            <el-input v-model="skillListState.word" size="mini">
                <template slot="prepend">名称关键字</template>
            </el-input>
        </el-col>
        <el-col :span="2">
            <el-button size="mini" type="primary" plain><i class="el-icon-refresh el-icon--left" @click="reflash">刷新</i></el-button>
        </el-col>
    </el-row>
    <el-divider><i class="el-icon-s-operation"></i></el-divider>
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
        prop="propertyName"
        label="属性">
      </el-table-column>
      <el-table-column
        prop="classificationName"
        label="类型">
      </el-table-column>
      <el-table-column
        prop="power"
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
      <el-col :span="14">
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
      <el-col :span="10">
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
      //刷新
      reflash(){
        this.$store.dispatch({
            type: 'main/skill/skill_list/getSkillList',
            pageNum:this.skillListState.pageNum
          }).then(()=>{
            this.$message({
              message: '刷新完毕',
              type: 'success'
            });
          })
      },
      //跳转页
      jumpPage(){
        if(this.inputPage && this.inputPage != this.skillListState.pageNum){
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
        //先判断技能编辑页面是否存在
        let pageExist = false
        const detailItem = {
            index:"2-2-1",
            title:'技能编辑',
            page:'skill_detail'
        }
        //在页签栏里判断
        const _contentTabs = this.$store.getters["main/getMainState"]['contentTabs']
        for(let i in _contentTabs){
          if(_contentTabs[i]['index'] == detailItem['index']){
            pageExist = true
          }
        }
        if(pageExist){
          //存在时 判断是否被编辑过
          this.$store.commit('main/navOpen',detailItem)
          this.$store.dispatch({
              type: 'main/removePage',
              targetName:detailItem.index,
              vueComponent:this
          }).then((result)=>{
            //返回的result为true时即页面关闭 此时从新打开获取编辑的信息 false时无事发生停留
            if(result){
              this.$store.commit('main/navOpen',detailItem)
              const props = {
                id:row.id,
                mode:'edit'
              }
              this.$store.dispatch({
                type: 'main/skill/skill_detail/openPage',
                props:props
              })
            }
          })
        }else{
          this.$store.commit('main/navOpen',detailItem)
          const props = {
            id:row.id,
            mode:'edit'
          }
          this.$store.dispatch({
            type: 'main/skill/skill_detail/openPage',
            props:props
          })
        }
      },
      propertyNameChange(val){
        this.$store.commit('main/skill/skill_list/handlePropertyNameChange', val)
      },
      classificationNameChange(val){
          this.$store.commit('main/skill/skill_list/handleClassificationNameChange', val)
      },
    },
    mounted(){
      this.$store.dispatch({
        type: 'main/skill/skill_list/getSkillList',
        pageNum:1
      }).then(()=>{
          this.$store.dispatch({
            type: 'main/skill/skill_list/getProperties',
        })
      })
    }
  }
</script>
<style scoped>

</style>

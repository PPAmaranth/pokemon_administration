<template>
  <div>
    <el-row :gutter="24" justify="space-between">
        <el-col :span="6">
        <el-input v-model="skillDetailState.currentState.id" disabled>
            <template slot="prepend">id</template>
        </el-input>
        </el-col>
        <el-col :span="6">
        <el-input v-model="skillDetailState.currentState.cnName">
            <template slot="prepend">中文</template>
        </el-input>
        </el-col>
        <el-col :span="6">
        <el-input v-model="skillDetailState.currentState.enName">
            <template slot="prepend">英文</template>
        </el-input>
        </el-col>
        <el-col :span="6">
        <el-input v-model="skillDetailState.currentState.jpName">
            <template slot="prepend">日文</template>
        </el-input>
        </el-col>
    </el-row>
    <el-row :gutter="24" justify="space-between">
        <el-col :span="6">
        <el-input v-model="skillDetailState.currentState.propertyName">
            <template slot="prepend">属性</template>
        </el-input>
        </el-col>
        <el-col :span="6">
        <el-input v-model="skillDetailState.currentState.classificationName">
            <template slot="prepend">类型</template>
        </el-input>
        </el-col>
        <el-col :span="6">
        <el-input v-model="skillDetailState.currentState.power" @change="inputChange">
            <template slot="prepend">威力</template>
        </el-input>
        </el-col>
        <el-col :span="6">
        <el-input v-model="skillDetailState.currentState.hitProbability">
            <template slot="prepend">命中</template>
        </el-input>
        </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: 'skill_detail',
  data () {
    return {

    }
  },
  computed:{
      skillDetailState:{
          get:function(){
              return this.$store.getters["main/skill/skill_detail/getSkillDetailState"]
          },
          set:function(val){
              return val
          }
      }
    },
  methods:{
      inputChange(val){
          console.log(val)
          console.log(this.$store.getters["main/skill/skill_detail/getSkillDetailState"])
      }
  }
}
</script>

<style scoped>
  .el-row{
    margin-top:20px;
  }
</style>
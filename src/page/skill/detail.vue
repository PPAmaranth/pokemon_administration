<template>
  <div>
      <el-form :model="skillDetailState.currentState" :rules="skillDetailState.rules">
        <el-row :gutter="24" justify="space-between" style="margin:0;">
            <el-col :span="10">
                &nbsp;
            </el-col>
            <el-col :span="4">
                <div v-if="skillDetailState.mode == 'add'" style="text-align:center;">新增</div>
                <div v-if="skillDetailState.mode == 'edit'" style="text-align:center;">编辑</div>
            </el-col>
            <el-col :span="6">
                &nbsp;
            </el-col>
            <el-col :span="2">
                <el-button size="mini" type="primary"><i class="el-icon-edit el-icon--left" @click="save">保存</i></el-button>
            </el-col>
            <el-col :span="2">
                &nbsp;
            </el-col>
        </el-row>
        <el-divider><i class="el-icon-s-operation"></i></el-divider>
        <el-row :gutter="24" justify="space-between">
            <el-col :span="6">
                <el-input v-model="skillDetailState.currentState.id" disabled>
                    <template slot="prepend">id</template>
                </el-input>
            </el-col>
            <el-col :span="6">
                <el-form-item prop="cnName">
                    <el-input v-model="skillDetailState.currentState.cnName">
                        <template slot="prepend">中文</template>
                    </el-input>
                </el-form-item>
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
                <el-form-item prop="propertyName">
                    <div class="el-input-group">
                        <div class="el-input-group__prepend" style="font-size:14px;">属性</div>
                        <el-select v-model="skillDetailState.currentState.propertyName" @change="propertyNameChange">
                            <el-option
                            v-for="item in skillDetailState.properties"
                            :key="item.id"
                            :label="item.name"
                            :value="item.name">
                            </el-option>
                        </el-select>
                    </div>
                </el-form-item>
            </el-col>
            <el-col :span="6">
                <el-form-item prop="classificationName">
                <div class="el-input-group">
                    <div class="el-input-group__prepend" style="font-size:14px;">类型</div>
                    <el-select v-model="skillDetailState.currentState.classificationName" @change="classificationNameChange">
                        <el-option
                        v-for="item in skillDetailState.classification"
                        :key="item.id"
                        :label="item.name"
                        :value="item.name">
                        </el-option>
                    </el-select>
                </div>
                </el-form-item>
            </el-col>
            <el-col :span="6">
                <el-form-item prop="power">
                    <el-input v-model="skillDetailState.currentState.power">
                        <template slot="prepend">威力</template>
                    </el-input>
                </el-form-item>
                </el-col>
            <el-col :span="6">
                <el-form-item prop="hitProbability">
                    <el-input v-model="skillDetailState.currentState.hitProbability">
                        <template slot="prepend">命中</template>
                    </el-input>
                </el-form-item>
            </el-col>
        </el-row>
        <el-row :gutter="24" justify="space-between">
            <el-col :span="6">
                <el-form-item prop="pp">
                    <el-input v-model="skillDetailState.currentState.pp">
                        <template slot="prepend">pp</template>
                    </el-input>
                </el-form-item>
            </el-col>
            <el-col :span="6">
                <el-checkbox v-model="skillDetailState.currentState.isMachineSkill">是否技能机</el-checkbox>
            </el-col>
            <el-col :span="6">
                <el-input v-model="skillDetailState.currentState.machineSkillCode" :disabled="!skillDetailState.currentState.isMachineSkill">
                    <template slot="prepend">技能机编号</template>
                </el-input>
            </el-col>
        </el-row>
        <el-row :gutter="24" justify="space-between">
            <el-col :span="24">
                <el-input v-model="skillDetailState.currentState.description">
                    <template slot="prepend">技能描述</template>
                </el-input>
            </el-col>
        </el-row>
    </el-form>
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
      propertyNameChange(val){
          this.$store.commit('main/skill/skill_detail/handlePropertyNameChange', val)
      },
      classificationNameChange(val){
          this.$store.commit('main/skill/skill_detail/handleClassificationNameChange', val)
      },
      save(){
          this.$store.dispatch({
            type: 'main/skill/skill_detail/save',
        }).then((result)=>{
            this.$alert(result.msg, '请求信息', {
                confirmButtonText: '确定',
                callback: action => {
                    this.$store.commit('main/removeTab', '2-2-1')
                }
            });
        })
      }
  },
    mounted(){
        if(!this.skillDetailState.id){
            const props = {
                id:null,
                mode:'add'
            }
            this.$store.commit('main/skill/skill_detail/setInitMsg',props)
        }
        this.$store.dispatch({
            type: 'main/skill/skill_detail/getSkillDetail',
        }).then(()=>{
          this.$store.dispatch({
            type: 'main/skill/skill_detail/getProperties',
        })
      })
    }
}
</script>

<style scoped>
  .el-row{
    margin-top:20px;
  }
  /deep/ .el-input__inner{
      border-radius: 0px;
  }
</style>
<template>
  <div>
      <el-form 
        :model="skillDetailState.currentState" 
        :rules="skillDetailState.rules"
        ref="ruleForm">
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
                <el-button size="mini" type="primary" plain><i class="el-icon-edit el-icon--left" @click="submit">保存</i></el-button>
            </el-col>
            <el-col :span="2">
                <el-button size="mini" :disabled="skillDetailState.mode !='edit'" type="info" plain><i class="el-icon-delete el-icon--left" @click="doDelete">删除</i></el-button>
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
                            v-for="item in skillDetailState.propertiesOptions"
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
                        v-for="item in skillDetailState.classificationOptions"
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
                    <div class="el-input-group">
                        <div class="el-input-group__prepend" style="font-size:14px;">威力</div>
                        <el-input-number :controls="false" style="width:100%;" v-model="skillDetailState.currentState.power">
                        </el-input-number>
                    </div>
                </el-form-item>
                </el-col>
            <el-col :span="6">
                <el-form-item prop="hitProbability">
                    <div class="el-input-group">
                        <div class="el-input-group__prepend" style="font-size:14px;">命中</div>
                        <el-input-number :controls="false" style="width:100%;" v-model="skillDetailState.currentState.hitProbability">
                        </el-input-number>
                    </div>
                </el-form-item>
            </el-col>
        </el-row>
        <el-row :gutter="24" justify="space-between">
            <el-col :span="6">
                <el-form-item prop="pp">
                    <div class="el-input-group">
                        <div class="el-input-group__prepend" style="font-size:14px;">pp</div>
                        <el-input-number :controls="false" style="width:100%;" v-model="skillDetailState.currentState.pp">
                        </el-input-number>
                    </div>
                </el-form-item>
            </el-col>
            <el-col :span="6">
                <el-checkbox v-model="skillDetailState.currentState.isMachineSkill">是否技能机</el-checkbox>
            </el-col>
            <el-col :span="6">
                <div class="el-input-group">
                    <div class="el-input-group__prepend" style="font-size:14px;">技能机编号</div>
                    <el-input-number :controls="false" style="width:100%;" v-model="skillDetailState.currentState.machineSkillCode" :disabled="!skillDetailState.currentState.isMachineSkill">
                    </el-input-number>
                </div>
            </el-col>
        </el-row>
        <el-row :gutter="24" justify="space-between">
            <el-col :span="24">
                <el-form-item prop="description">
                    <el-input v-model="skillDetailState.currentState.description">
                        <template slot="prepend">技能描述</template>
                    </el-input>
                </el-form-item>
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
    //删除
    doDelete(){
        if(this.skillDetailState.mode != 'edit'){
            return
        }
        this.$confirm(`确认删除（${this.skillDetailState.currentState.cnName}）？`, '系统信息', {
            confirmButtonText: '删除',
            cancelButtonText: '取消',
            showClose:false,
            closeOnClickModal:false,
            closeOnPressEscape:false
        }).then(()=>{
            this.$store.dispatch({
                type: 'main/skill/skill_detail/delete',
            }).then((result)=>{
                this.$alert(result.msg, '请求信息', {
                    confirmButtonText: '确定'
                });
                this.$store.dispatch({
                    type: 'main/removePage',
                    targetName:'2-2-1'
                })
            })
        }).catch(()=>{

        })
    },
    //提交保存
    submit(){
        //验证
        this.$refs.ruleForm.validate().then(()=>{
            this.save()
        }).catch(()=>{
            this.$alert('校验失败，请填写必填信息', '系统信息', {
                confirmButtonText: '确定'
            });
        })
    },
    save(){
        this.$store.dispatch({
            type: 'main/skill/skill_detail/save',
        }).then((result)=>{
            this.$confirm(result.msg, '请求信息', {
                confirmButtonText: '确认并关闭',
                cancelButtonText: '确认并查看',
                showClose:false,
                closeOnClickModal:false,
                closeOnPressEscape:false
            }).then(()=>{
                this.$store.dispatch({
                    type: 'main/removePage',
                    targetName:'2-2-1'
                })
            }).catch(()=>{
                const props = {
                    id:result.result.id,
                    mode:'edit'
                }
                this.$store.commit('main/skill/skill_detail/setInitMsg',props)
                this.$store.dispatch({
                    type: 'main/skill/skill_detail/getSkillDetail',
                })
            })
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
        }).then(()=>{
            //最后保存初始currentState的json字符串
            const _initState = JSON.stringify(this.skillDetailState.currentState)
            this.$store.commit('main/skill/skill_detail/setInitState',_initState)
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
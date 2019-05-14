<template>
  <div>
    <el-collapse v-model="pokemonDetailState.activeNames">
      <el-collapse-item title="基本信息" name="1">
        <el-row :gutter="24" justify="space-between">
          <el-col :span="6">
            <el-input v-model="pokemonDetailState.currentState.id" disabled>
              <template slot="prepend">id</template>
            </el-input>
          </el-col>
          <el-col :span="6">
            <el-input v-model="pokemonDetailState.currentState.name">
              <template slot="prepend">中文</template>
            </el-input>
          </el-col>
          <el-col :span="6">
            <el-input v-model="pokemonDetailState.currentState.enname">
              <template slot="prepend">英文</template>
            </el-input>
          </el-col>
          <el-col :span="6">
            <el-input v-model="pokemonDetailState.currentState.jpname">
              <template slot="prepend">日文</template>
            </el-input>
          </el-col>
        </el-row>
        <el-row :gutter="24" justify="space-between">
          <el-col :span="8">
            <el-input v-model="pokemonDetailState.currentState.illustrationBookId">
              <template slot="prepend">图鉴编号</template>
            </el-input>
          </el-col>
          <el-col :span="8">
            <el-input v-model="pokemonDetailState.currentState.propertyOneName">
              <template slot="prepend">属性一</template>
            </el-input>
          </el-col>
          <el-col :span="8">
            <el-input v-model="pokemonDetailState.currentState.propertyTwoName">
              <template slot="prepend">属性二</template>
            </el-input>
          </el-col>
        </el-row>
      </el-collapse-item>
      <el-collapse-item title="能力值" name="2">
        <el-row :gutter="24" justify="space-between">
          <el-col :span="8">
            <el-input v-model="pokemonDetailState.currentState.hp">
              <template slot="prepend">生命</template>
            </el-input>
          </el-col>
          <el-col :span="8">
            <el-input v-model="pokemonDetailState.currentState.attack">
              <template slot="prepend">攻击</template>
            </el-input>
          </el-col>
          <el-col :span="8">
            <el-input v-model="pokemonDetailState.currentState.defense">
              <template slot="prepend">防御</template>
            </el-input>
          </el-col>
        </el-row>
        <el-row :gutter="24" justify="space-between">
          <el-col :span="8">
            <el-input v-model="pokemonDetailState.currentState.sattack">
              <template slot="prepend">特攻</template>
            </el-input>
          </el-col>
          <el-col :span="8">
            <el-input v-model="pokemonDetailState.currentState.sdefense">
              <template slot="prepend">特防</template>
            </el-input>
          </el-col>
          <el-col :span="8">
            <el-input v-model="pokemonDetailState.currentState.speed">
              <template slot="prepend">速度</template>
            </el-input>
          </el-col>
        </el-row>
      </el-collapse-item>
      <el-collapse-item title="进化关系" name="3">
        <el-row :gutter="24" justify="space-between">
          <el-col :span="12">
            <el-input v-model="pokemonDetailState.currentState.beforeId">
              <template slot="prepend">进化前</template>
            </el-input>
          </el-col>
          <el-col :span="12">
            <el-input v-model="pokemonDetailState.currentState.condition">
              <template slot="prepend">条件</template>
            </el-input>
          </el-col>
        </el-row>
      </el-collapse-item>
    </el-collapse>
  </div>
</template>

<script>
export default {
  name: 'pokemon_detail',
  data () {
    return {

    }
  },
  computed:{
      pokemonDetailState:{
          get:function(){
              return this.$store.getters["main/pokemon/pokemon_detail/getPokemonDetailState"]
          },
          set:function(val){
              return val
          }
      }
    },
  methods:{

  }
}
</script>

<style scoped>
  .el-row{
    margin-top:20px;
  }
</style>
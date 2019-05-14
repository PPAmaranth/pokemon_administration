<template>
  <div>
    <el-collapse v-model="pokemonDetailState.activeNames">
      <el-collapse-item title="基本信息" name="1">
        <el-row :gutter="24" justify="space-between">
          <el-col :span="6">
            <el-input v-model="pokemonDetailState.currentState.id">
              <template slot="prepend">id</template>
            </el-input>
          </el-col>
          <el-col :span="6">
            <el-input v-model="pokemonDetailState.currentState.name">
              <template slot="prepend">name</template>
            </el-input>
          </el-col>
          <el-col :span="6">
            <el-input v-model="pokemonDetailState.currentState.enname">
              <template slot="prepend">enname</template>
            </el-input>
          </el-col>
          <el-col :span="6">
            <el-input v-model="pokemonDetailState.currentState.jpname">
              <template slot="prepend">jpname</template>
            </el-input>
          </el-col>
        </el-row>
        <el-row :gutter="24" justify="space-between">
          <el-col :span="8">
            <el-input v-model="pokemonDetailState.currentState.illustrationBookId">
              <template slot="prepend">illustrationBookId</template>
            </el-input>
          </el-col>
          <el-col :span="8">
            <el-input v-model="pokemonDetailState.currentState.propertyOneName">
              <template slot="prepend">propertyOneName</template>
            </el-input>
          </el-col>
          <el-col :span="8">
            <el-input v-model="pokemonDetailState.currentState.propertyTwoName">
              <template slot="prepend">propertyTwoName</template>
            </el-input>
          </el-col>
        </el-row>
      </el-collapse-item>
      <el-collapse-item title="能力值" name="2">
        <el-row :gutter="24" justify="space-between">
          <el-col :span="8">
            <el-input v-model="pokemonDetailState.currentState.hp">
              <template slot="prepend">hp</template>
            </el-input>
          </el-col>
          <el-col :span="8">
            <el-input v-model="pokemonDetailState.currentState.attack">
              <template slot="prepend">attack</template>
            </el-input>
          </el-col>
          <el-col :span="8">
            <el-input v-model="pokemonDetailState.currentState.defense">
              <template slot="prepend">defense</template>
            </el-input>
          </el-col>
        </el-row>
        <el-row :gutter="24" justify="space-between">
          <el-col :span="8">
            <el-input v-model="pokemonDetailState.currentState.sattack">
              <template slot="prepend">sattack</template>
            </el-input>
          </el-col>
          <el-col :span="8">
            <el-input v-model="pokemonDetailState.currentState.sdefense">
              <template slot="prepend">sdefense</template>
            </el-input>
          </el-col>
          <el-col :span="8">
            <el-input v-model="pokemonDetailState.currentState.speed">
              <template slot="prepend">speed</template>
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
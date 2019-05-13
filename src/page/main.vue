<template>
  <div>
      <el-container>
    <el-header>Header</el-header>
    <el-container>
        <el-aside width="200px">
            <navpage></navpage>
        </el-aside>
        <el-main>
          <maincontent></maincontent>
        </el-main>
    </el-container>
    </el-container>
  </div>
</template>

<script>
import navpage from '@/components/nav'
import maincontent from '@/components/content'

export default {
  name: 'mainpage',
  data () {
    return {
      
    }
  },
  components:{
      navpage,maincontent
  }
}
</script>

<style scoped>
.el-container{
    height:100vh;
}
.el-header, .el-footer {
    background-color: #B3C0D1;
    color: #333;
    text-align: center;
    line-height: 60px;
  }
  
  .el-aside {
    background-color: #D3DCE6;
    color: #333;
  }
  
  body > .el-container {
    margin-bottom: 40px;
  }
</style>
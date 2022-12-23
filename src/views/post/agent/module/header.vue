<template>
  <div class="head-container">
    <!-- 搜索 -->
       <!-- 搜索 -->
    <el-input v-model="query.uid" clearable placeholder="玩家ID" style="width: 200px;" class="filter-item" @keyup.enter.native="toQuery"/>
    <el-input v-model="query.agentId" clearable placeholder="代理ID" style="width: 200px;" class="filter-item" @keyup.enter.native="toQuery"/>
   <el-input v-model="query.parentId" clearable placeholder="上级代理" style="width: 200px;" class="filter-item" @keyup.enter.native="toQuery"/>
    
    <el-button class="filter-item" size="mini" type="warning" icon="el-icon-search" @click="doReset">重置</el-button>
    <el-button class="filter-item" size="mini" type="success" icon="el-icon-search" @click="toQuery">搜索</el-button>
  <!--  <el-button class="filter-item" size="mini" type="danger"  @click="toCheck">一键分红</el-button>-->
     <!-- 新增 -->
    <div style="display: inline-block;margin: 0px 2px;">
      <el-button
        v-permission="['ADMIN','AGENT_ALL','AGENT_CREATE']"
        class="filter-item"
        size="mini"
        type="danger"
        icon="el-icon-plus"
        @click="$refs.cForm.dialog = true">清理数据</el-button>
      <cForm ref="cForm" :is-add="true"/>
    </div>
    <!-- 新增 -->
    <div style="display: inline-block;margin: 0px 2px;">
      <el-button
        v-permission="['ADMIN','AGENT_ALL','AGENT_CREATE']"
        class="filter-item"
        size="mini"
        type="primary"
        icon="el-icon-plus"
        @click="$refs.form.dialog = true">新增</el-button>
      <eForm ref="form" :is-add="true"/>
    </div>
  </div>
</template>

<script>
import { checkMoney } from '@/api/game/agent'
import eForm from './form'
import cForm from './clearDataForm'
export default {
  components: { eForm ,cForm},
  props: {
    query: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      queryTypeOptions: [
        { key: 'agentId', display_name: '代理ID' },
        { key: 'uid', display_name: '关联用户编号' }
      ]
    }
  },
  methods: {
    toQuery() {
      this.$parent.page = 0
      this.$parent.init()
    },
    doReset(){ 
      this.$parent.query.parentId=''; 
      this.toQuery();
    },
    toCheck() { 
      const _this = this
       this.$confirm('确认分红？', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
          }).then(() => {
              _this.checkMoney();
          })
    },
    checkMoney(){
      checkMoney({}).then(res => { 
        this.init()
        this.$notify({
          title: '分红成功',
          type: 'success',
          duration: 2500
        })
      }).catch(err => { 
        console.log(err.response.data.message)
      })
    }   
  }
}
</script>

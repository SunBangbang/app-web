<template>
  <div class="head-container">
    <!-- 搜索 -->
    <el-input v-model="query.uid" clearable placeholder="玩家ID" style="width: 200px;" class="filter-item" @keyup.enter.native="toQuery"/>
    <el-input v-model="query.agentId" clearable placeholder="代理ID" style="width: 200px;" class="filter-item" @keyup.enter.native="toQuery"/>
    <el-input v-model="query.gameToken" clearable placeholder="游戏期数" style="width: 200px;" class="filter-item" @keyup.enter.native="toQuery"/>
 
    <el-date-picker
      v-model="query.startDate" 
      type="datetime"  
      format="yyyy-MM-dd HH:mm:ss"
      value-format="yyyy-MM-dd HH:mm:ss"
      placeholder="开始日期"
    />  
        <el-date-picker
      v-model="query.endDate" 
      type="datetime" 
      format="yyyy-MM-dd HH:mm:ss"
      value-format="yyyy-MM-dd HH:mm:ss"
      placeholder="结束日期"
    />  
    <el-button class="filter-item" size="mini" type="success" icon="el-icon-search" @click="toQuery">搜索</el-button>
    <!-- 新增 
    <div style="display: inline-block;margin: 0px 2px;">
      <el-button
        v-permission="['ADMIN','FLOWGAME_ALL','FLOWGAME_CREATE']"
        class="filter-item"
        size="mini"
        type="primary"
        icon="el-icon-plus"
        @click="$refs.form.dialog = true">新增</el-button>
      <eForm ref="form" :is-add="true"/>
    </div>-->
  </div>
</template>

<script>
import eForm from './form'
export default {
  components: { eForm },
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
        { key: 'uid', display_name: '关联用户编号' },
        { key: 'monsterName', display_name: '怪物名称' }
      ]
    }
  },
  methods: {
    toQuery() {
      this.$parent.page = 0
      this.$parent.init()
    }
  }
}
</script>

<template>
  <div class="head-container">
    <!-- 搜索 -->
    <el-input v-model="query.uid" clearable placeholder="玩家ID" style="width: 200px;" class="filter-item" @keyup.enter.native="toQuery"/>
   <el-input v-model="query.loginId" clearable placeholder="玩家登录ID" style="width: 200px;" class="filter-item" @keyup.enter.native="toQuery"/>
   
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
 
  </div>
</template>

<script> 
export default { 
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
      this.$parent.reportFlow()
    }
  }
}
</script>

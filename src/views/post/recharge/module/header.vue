<template>
  <div class="head-container">
    <!-- 搜索 -->
     <el-input v-model="query.uid" clearable placeholder="玩家ID" style="width: 200px;" class="filter-item" @keyup.enter.native="toQuery"/>
    
    <el-input v-model="query.orderNo" clearable placeholder="订单号" style="width: 200px;" class="filter-item" @keyup.enter.native="toQuery"/>
 
    <el-button class="filter-item" size="mini" type="success" icon="el-icon-search" @click="toQuery">搜索</el-button>
    <!-- 新增 
    <div style="display: inline-block;margin: 0px 2px;">
      <el-button
        v-permission="['ADMIN','FLOWRECHARGE_ALL','FLOWRECHARGE_CREATE']"
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
        { key: 'orderNo', display_name: '支付系统流水号' },
        { key: 'agentId', display_name: '代理ID' },
        { key: 'uid', display_name: '关联用户编号' }
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

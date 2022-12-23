<template>
  <div class="head-container">
    <el-input v-model="query.uid" clearable placeholder="玩家ID" style="width: 200px;" class="filter-item" @keyup.enter.native="toQuery"/>
    <el-input v-model="query.agentId" clearable placeholder="代理ID" style="width: 200px;" class="filter-item" @keyup.enter.native="toQuery"/>
    <el-input v-model="query.orderNo" clearable placeholder="订单号" style="width: 200px;" class="filter-item" @keyup.enter.native="toQuery"/>
  <el-button class="filter-item" size="mini" type="success" icon="el-icon-search" @click="toQuery">搜索</el-button>
    
    <!-- 新增 
    <div style="display: inline-block;margin: 0px 2px;">
      <el-button
        v-permission="['ADMIN','FLOWPAY_ALL','FLOWPAY_CREATE']"
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

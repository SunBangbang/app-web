<template>
  <div class="head-container">
    <!-- 搜索 -->
      <!-- 搜索 -->
    <el-input v-model="query.uid" clearable placeholder="付款人" style="width: 200px;" class="filter-item" @keyup.enter.native="toQuery"/>
    <el-input v-model="query.ruid" clearable placeholder="收款人" style="width: 200px;" class="filter-item" @keyup.enter.native="toQuery"/>
    <el-select v-model="query.type" multiple clearable placeholder="资金类型" class="filter-item" style="width: 330px">
      <el-option v-for="item in queryTypeOptions" :key="item.key" :label="item.display_name" :value="item.key"/>
    </el-select>

    <el-button class="filter-item" size="mini" type="success" icon="el-icon-search" @click="toQuery">搜索</el-button>
    <!-- 新增
    <div style="display: inline-block;margin: 0px 2px;">
      <el-button
        v-permission="['ADMIN','FLOWTRANSFER_ALL','FLOWTRANSFER_CREATE']"
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
        {key:'VIP充值',display_name:'VIP充值'},
        {key:'充值返点',display_name:'充值返点'},
        //{key:'代上分',display_name:'代上分'},
        //{key:'充值送分',display_name:'充值送分'},
       // {key:'后台赠送',display_name:'后台赠送'},
        {key:'投注返点',display_name:'投注返点'},
        {key:'提现撤销',display_name:'提现撤销'},
        {key:'游戏充值',display_name:'游戏充值'},
        {key:'游戏返还',display_name:'游戏返还'},
        {key:'玩家转入',display_name:'玩家转入'},
        {key:'佣金提现',display_name:'佣金提现'},
        {key:'减分',display_name:'减分'},
        {key:'微信提现',display_name:'微信提现'},
        {key:'支付宝提现',display_name:'支付宝提现'},
        {key:'游戏下注',display_name:'游戏下注'},
        {key:'玩家转出',display_name:'玩家转出'},
        {key:'银行卡提现',display_name:'银行卡提现'}
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

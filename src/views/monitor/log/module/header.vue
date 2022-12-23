<template>
  <div class="head-container">

    <el-date-picker
      v-model="query.startDate"
      type="datetime"
      format="yyyy-MM-dd HH:mm:ss"
       style="width: 200px;"
      value-format="yyyy-MM-dd HH:mm:ss"
      placeholder="开始日期"
    />
        <el-date-picker
      v-model="query.endDate"
      type="datetime"
       style="width: 200px;"
      format="yyyy-MM-dd HH:mm:ss"
      value-format="yyyy-MM-dd HH:mm:ss"
      placeholder="结束日期"
    />
       <el-input v-model="query.username" clearable placeholder="用户名" style="width: 100px;" class="filter-item" @keyup.enter.native="toQuery"/>

     <el-select  v-model="query.type" clearable placeholder="类型"  style="width: 300px;" class="filter-item">
      <el-option v-for="item in queryTypeOptions" :key="item.key" :label="item.key" :value="item.key"/>
    </el-select>

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
      downloadLoading: false,
      queryTypeOptions:[
          { "key" : "玩家下注" },
          { "key" : "登录" },
          { "key" : "后台充值" },
          { "key" : "提现确认" },
          { "key" : "微信兑换" },
          { "key" : "银行卡兑换" },
          { "key" : "调整返点数" },
          { "key" : "提现取消" },
          { "key" : "提取佣金" },
          { "key" : "修改返点" },
          { "key" : "转账" },
          { "key" : "减分" },
          { "key" : "注册" },
          { "key" : "开放" },
          { "key" : "用户登录" },
          { "key" : "关闭" },
          { "key" : "充值记录" },
          { "key" : "代理账变" },
          { "key" : "重置资金密码" },
          { "key" : "重置密码" },
          { "key" : "资金密码修改" },
          { "key" : "发送短信验证码" },
          { "key" : "修改Params" },
          { "key" : "删除Params" },
          { "key" : "添加代理" },
          { "key" : "登录密码修改" },
          { "key" : "添加会员" },
          { "key" : "修改SyncData" },
          { "key" : "绑定支付宝" },
          { "key" : "支付宝兑换" },
          { "key" : "修改菜单" },
          { "key" : "新增菜单" },
          { "key" : "生成推广码" },
          { "key" : "修改角色菜单" },
          { "key" : "新增Notice" },
          { "key" : "删除Notice" },
          { "key" : "提现记录" },
          { "key" : "新增ErrorCode" },
          { "key" : "修改SyncWeapon" }
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

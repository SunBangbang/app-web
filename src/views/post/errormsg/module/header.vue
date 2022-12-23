<template>
  <div class="head-container">
    <!-- 搜索 -->
    <el-input v-model="query.errorMsg" clearable placeholder="错误内容" style="width: 200px;" class="filter-item" @keyup.enter.native="toQuery"/>
    <el-input v-model="query.errorId" clearable placeholder="错误ID" style="width: 200px;" class="filter-item" @keyup.enter.native="toQuery"/>
 
    <el-button class="filter-item" size="mini" type="success" icon="el-icon-search" @click="toQuery">搜索</el-button>
    <!-- 新增 -->
    <div style="display: inline-block;margin: 0px 2px;">
      <el-button
        v-permission="['ADMIN','ERRORCODE_ALL','ERRORCODE_CREATE']"
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
        { key: 'errorMsg', display_name: '提示信息' }
      ]
    }
  },
  methods: {
    toQuery() {
      this.$parent.page = 0
      this.query.type="errorMsg";
      this.$parent.init()
    }
  }
}
</script>

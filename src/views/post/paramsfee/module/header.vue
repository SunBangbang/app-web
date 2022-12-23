<template>
  <div class="head-container">
    <!-- 搜索 -->
    <el-input v-model="query.paramKey" clearable placeholder="参数KEY" style="width: 200px;" class="filter-item" @keyup.enter.native="toQuery"/>
     <el-input v-model="query.paramName" clearable placeholder="参数名称" style="width: 200px;" class="filter-item" @keyup.enter.native="toQuery"/>
     <el-input v-model="query.paramValue" clearable placeholder="参数值" style="width: 200px;" class="filter-item" @keyup.enter.native="toQuery"/>
     
    <el-button class="filter-item" size="mini" type="success" icon="el-icon-search" @click="toQuery">搜索</el-button>
    <!-- 新增 -->
    <div style="display: inline-block;margin: 0px 2px;">
      <el-button
        v-permission="['ADMIN','PARAMS_ALL','PARAMS_CREATE']"
        class="filter-item"
        size="mini"
        type="primary"
        icon="el-icon-plus"
        @click="$refs.form.dialog = true">新增</el-button>
      <eForm ref="form" :is-add="true"/>
    </div>
    <!-- <el-button class="filter-item" size="mini" type="warning" icon="el-icon-search" @click="deleteStop">重新开放下注</el-button>
   -->
  </div>
</template>

<script>
import eForm from './form'
import { deleteStop } from '@/api/game/params'
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
        { key: 'paramKey', display_name: '参数KEY' },
        { key: 'paramName', display_name: '参数名称' }
      ]
    }
  },
  methods: {
    toQuery() {
      this.$parent.page = 0
      this.$parent.init()
    },
    deleteStop() {
       deleteStop({}).then(res => {
        this.resetForm()
        this.$notify({
          title: '重新开放成功',
          type: 'success',
          duration: 2500
        })
        this.loading = false 
      }).catch(err => {
        this.loading = false
        console.log(err.response.data.message)
      })
    },
    
  }
}
</script>

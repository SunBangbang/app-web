<template>
  <div class="app-container">
    <eHeader :query="query"/>
    <!--表格渲染-->
    <el-table v-loading="loading" :data="data" size="small" style="width: 100%;">
       
      <el-table-column prop="uid" label="代理编号"/>
      <el-table-column prop="flowDate" label="日期"/>
      <el-table-column prop="flowType" label="类型"/>
      <el-table-column prop="rate" label="返点率"/>
      <el-table-column prop="amt" label="金额"/>
      <el-table-column prop="amtFlow" label="流水"/>
      <el-table-column prop="amtProfit" label="盈亏">
       <template slot-scope="scope"> 
          <el-input v-model="scope.row.amtProfit" size="mini" @change="onChange(scope.row)" placeholder="请输入内容" />
        </template>
      </el-table-column> 
      <el-table-column prop="amtCommission" label="佣金"/>
      <el-table-column prop="amtPoint" label="返点收入"/>
      <el-table-column v-if="checkPermission(['ADMIN','FLOWAGENT_ALL','FLOWAGENT_EDIT','FLOWAGENT_DELETE'])" label="操作" width="150px" align="center">
        <template slot-scope="scope">
           <el-popover
            v-permission="['ADMIN','FLOWAGENT_ALL','FLOWAGENT_DELETE']"
            :ref="scope.row.bizId"
            placement="top"
            width="180">
            <p>确定删除本条数据吗？</p>
            <div style="text-align: right; margin: 0">
              <el-button size="mini" type="text" @click="$refs[scope.row.bizId].doClose()">取消</el-button>
              <el-button :loading="delLoading" type="primary" size="mini" @click="subDelete(scope.row.bizId)">确定</el-button>
            </div>
            <el-button slot="reference" type="danger" icon="el-icon-delete" size="mini"/>
          </el-popover>
        </template>
      </el-table-column>
    </el-table>
    <!--分页组件-->
    <el-pagination
      :total="total"
      style="margin-top: 8px;"
      layout="total, prev, pager, next, sizes"
      @size-change="sizeChange"
      @current-change="pageChange"/>
  </div>
</template>

<script>
import checkPermission from '@/utils/permission'
import initData from '@/mixins/initData'
import { del,updateProfit } from '@/api/game/flowAgent'
import { parseTime } from '@/utils/index'
import eHeader from './module/header'
import edit from './module/edit'
export default {
  components: { eHeader, edit },
  mixins: [initData],
  data() {
    return {
      delLoading: false, sup_this: this
    }
  },
  created() {
    this.$nextTick(() => {
      this.init()
    })
  },
  methods: {
    parseTime,
    checkPermission,
   
     beforeInit() {
      this.url = 'admin/flowAgent'
      const sort = 'flowDate,desc'
      this.params = { page: this.page, size: this.size}
      const query = this.query
      const uid = query.uid
      const startDate = query.startDate
      const endDate = query.endDate
      this.params["uid"] = uid
      this.params["startDate"] = startDate
      this.params["endDate"] = endDate
      return true
    },
    subDelete(bizId) {
      this.delLoading = true
      del(bizId).then(res => {
        this.delLoading = false
        this.$refs[bizId].doClose()
        this.init()
        this.$notify({
          title: '删除成功',
          type: 'success',
          duration: 2500
        })
      }).catch(err => {
        this.delLoading = false
        this.$refs[bizId].doClose()
        console.log(err.response.data.message)
      })
    },
     onChange(row){
      updateProfit(row).then(res => {
        this.delLoading = false  
        this.$notify({
          title: '更新成功',
          type: 'success',
          duration: 2500
        })
      }).catch(err => {
        this.delLoading = false 
        console.log(err.response.data.message)
      })
    }
  }
}
</script>

<style scoped>

</style>

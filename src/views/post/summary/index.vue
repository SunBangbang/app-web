<template>
  <div class="app-container">
    <eHeader :query="query"/>
    <!--表格渲染-->
    <el-table v-loading="loading" :data="data" size="small" style="width: 100%;">
      <el-table-column prop="uid" label="玩家ID"/>  
      <el-table-column prop="amt" label="投注金额"/> 
      <el-table-column prop="amtWin" label="赢金额">
        <template slot-scope="scope">
          <el-tag :type="scope.row.amtWin> scope.row.amtLose ? '' : 'danger'">{{ scope.row.amtWin }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="amtLose" label="输金额"/>
      <el-table-column prop="commission" label="佣金"/>
      <el-table-column prop="balance" label="余额"/> 
      <el-table-column prop="recharge" label="充值金额"/>   
      <el-table-column prop="withdraw" label="提现金额"/>    
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
import { del } from '@/api/game/flowGame'
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
      this.url = 'admin/flowGame/summary'
      const sort = ''
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
    }
  }
}
</script>

<style scoped>

</style>

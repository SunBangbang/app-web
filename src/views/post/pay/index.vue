<template>
  <div class="app-container">
    <eHeader :query="query"/>
    <!--表格渲染-->
    <el-table v-loading="loading" :data="data" size="small" style="width: 100%;">
      <el-table-column prop="bizId" label="bizId"/>
      <el-table-column prop="orderNo" label="支付系统流水号"/>
      <el-table-column prop="agentId" label="代理ID"/>
      <el-table-column prop="uid" label="关联用户编号"/>
      <el-table-column prop="alipayId" label="支付宝ID"/>
      <el-table-column prop="alipayName" label="支付宝姓名"/>
      <el-table-column prop="accountNo" label="银行卡号"/>
      <el-table-column prop="accountName" label="银行卡姓名"/>
      <el-table-column prop="accountBankName" label="银行开户行"/>
      <el-table-column prop="amt" label="充值金额"/>
      <el-table-column prop="stt" label="状态"/>
      <el-table-column prop="remark" label="说明"/>
      <el-table-column prop="url" label="url"/>
      <el-table-column prop="gmtCreate" label="创建时间">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.gmtCreate) }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="gmtModified" label="修改时间">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.gmtModified) }}</span>
        </template>
      </el-table-column>
      <el-table-column v-if="checkPermission(['ADMIN','FLOWPAY_ALL','FLOWPAY_EDIT','FLOWPAY_DELETE'])" label="操作" width="150px" align="center">
        <template slot-scope="scope">
          <edit v-permission="['ADMIN','FLOWPAY_ALL','FLOWPAY_EDIT']" :data="scope.row" :sup_this="sup_this"/>
          <el-popover
            v-permission="['ADMIN','FLOWPAY_ALL','FLOWPAY_DELETE']"
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
import { del } from '@/api/game/flowPay'
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
      this.url = 'admin/flowPay'
      const sort = 'bizId,desc'
       this.params = { page: this.page, size: this.size, sort: sort }
      const query = this.query
      const agentId = query.agentId
      const orderNo = query.orderNo
      this.params["uid"] = uid 
      this.params["agentId"] = agentId 
      this.params["orderNo"] = pareorderNontId
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

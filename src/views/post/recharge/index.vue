<template>
  <div class="app-container">
    <eHeader :query="query"/>
    <!--表格渲染-->
    <el-table v-loading="loading" :data="data" size="small" style="width: 100%;">
      <!--<el-table-column prop="bizId" label="bizId"/>-->
      <el-table-column prop="orderNo" label="支付系统流水号" width="200px"/> 
      <el-table-column prop="uid" label="玩家编号"/>   
      <el-table-column prop="accountName" label="姓名"/> 
      <el-table-column prop="amt" label="充值金额"  width="150px">
       <template slot-scope="scope"> 
              <el-tag v-if="scope.row.fee === 0.00" >{{ scope.row.amt}}</el-tag>
              <el-tag v-else >{{ scope.row.amt}}【U币：{{scope.row.fee}}】</el-tag>
          </template>
      </el-table-column>
      <el-table-column prop="stt" label="状态">
          <template slot-scope="scope">
            <div v-for="item in sttList" :key="item.key">
              <el-tag v-if="scope.row.stt.toString() === item.key" :type="scope.row.stt ? '' : 'info'">{{ item.label }}</el-tag>
            </div>
          </template>
      </el-table-column>
      <el-table-column prop="remark" label="说明"/>
      <el-table-column prop="gmtCreate" label="创建时间">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.gmtCreate) }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="gmtModified" label="完成时间">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.gmtModified) }}</span>
        </template>
      </el-table-column>
      <el-table-column fixed="right" v-if="checkPermission(['ADMIN','FLOWWITHDRAW_ALL','FLOWWITHDRAW_EDIT','FLOWWITHDRAW_DELETE'])" label="操作" width="250px" align="center">
            <template slot-scope="scope">
            <el-button v-if="scope.row.stt =='0'" slot="reference" type="danger" icon="el-icon-delete" @click="rechargeConfirm(scope.row)" size="mini" >充值确认</el-button>
            <el-button v-if="scope.row.stt =='0'" slot="reference" type="danger" icon="el-icon-delete"  @click="rechargeCancel(scope.row)" size="mini" >充值撤销</el-button>
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
import { rechargeConfirm,rechargeCancel,del } from '@/api/game/flowRecharge'
import { parseTime } from '@/utils/index'
import eHeader from './module/header' 
import edit from './module/edit'
export default {
  components: { eHeader, edit },
  mixins: [initData],
  data() {
    return {      
      sttList: [
        { key: '0', label: '提交成功' },
        { key: '3', label: '失败' },
        { key: '9', label: '异常' },
        { key: '2', label: '支付失败' },
        { key: '1', label: '支付成功' }
      ],
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
      this.url = 'admin/flowRecharge'
      const sort = 'bizId,desc'
      this.params = { page: this.page, size: this.size, sort: sort }
      const query = this.query
      const uid = query.uid 
      const orderNo = query.orderNo
      this.params["uid"] = uid  
      this.params["orderNo"] = orderNo
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
    rechargeCancel(row) {
      this.delLoading = true 
      rechargeCancel(row.orderNo).then(res => {
        this.delLoading = false 
        this.init() 
       if(res.status == 0){
          this.$notify({
            title: '成功',
            type: 'success',
            duration: 2500
          })
        }else{
             this.$notify({
            title: res.message,
            type: 'warning',
            duration: 2500
          })
        }
      }).catch(err => {
        this.delLoading = false 
        console.log(err.response.data.message)
      })
    },
    rechargeConfirm(row) {
      this.delLoading = true 
      rechargeConfirm(row.orderNo).then(res => {
        this.delLoading = false 
        this.init()
        if(res.status == 0){
          this.$notify({
            title: '成功',
            type: 'success',
            duration: 2500
          })
        }else{
             this.$notify({
            title: res.message,
            type: 'warning',
            duration: 2500
          })
        }
        
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

<template>
  <div class="app-container">
    <eHeader :query="query"/>
    <!--表格渲染-->
    <el-table v-loading="loading" :height="tableHeight" :data="data" size="small" style="width: 100%;">
      <!--<el-table-column prop="bizId" label="bizId"/>
      <el-table-column prop="agentId" label="代理ID"/>-->
      <el-table-column prop="uid" label="玩家编号" width="100px"/>
      <el-table-column prop="balance" label="余额"/>
      <el-table-column prop="alipayId" label="支付宝ID"/>
      <el-table-column prop="alipayName" label="支付宝姓名"/>
      <el-table-column prop="accountNo" label="银行卡号"/>
      <el-table-column prop="accountName" label="银行卡姓名"/>
      <el-table-column prop="accountBankName" label="银行开户行" width="100px"/>
      <el-table-column prop="ucoinUrl" label="U币地址" width="100px"> 

       <template slot-scope="scope">
        【{{scope.row.ucoinType}}】：{{scope.row.ucoinUrl}}
       </template slot-scope="scope">
      </el-table-column> 
     <!-- <el-table-column prop="cashOut" label="提现金额"/> 
        <template slot-scope="scope">
          <el-popover placement="top-start" title="" trigger="hover">
            <img :src="scope.row.weixinPic" alt="" style="width: 200px;height: 200px">
            <img slot="reference" :src="scope.row.weixinPic" style="width: 30px;height: 30px">
          </el-popover>
        </template> 
      </el-table-column>-->
      <el-table-column prop="stt" label="状态"/> 
      <el-table-column fixed="right"   v-if="checkPermission(['ADMIN','ACCOUNT_ALL','ACCOUNT_EDIT','ACCOUNT_DELETE'])" label="操作" width="450px" align="center">
        <template slot-scope="scope">
          <!--<edit v-permission="['ADMIN','ACCOUNT_ALL','ACCOUNT_EDIT']" :data="scope.row" :sup_this="sup_this"/>
          -->
           <!-- <edit v-permission="['ADMIN','PLAYER_ALL','PLAYER_EDIT']" :data="scope.row" :sup_this="sup_this"/>-->
          <alipayBind  v-permission="['ADMIN','PLAYER_ALL','PLAYER_EDIT']" :data="scope.row" :sup_this="sup_this"></alipayBind>
          <ucoinBind  v-permission="['ADMIN','PLAYER_ALL','PLAYER_EDIT']" :data="scope.row" :sup_this="sup_this"></ucoinBind>
           
      
          <accountPassword  v-permission="['ADMIN','PLAYER_ALL','PLAYER_EDIT']" :data="scope.row" :sup_this="sup_this"></accountPassword>
  
         <accountBind  v-permission="['ADMIN','PLAYER_ALL','PLAYER_EDIT']" :data="scope.row" :sup_this="sup_this"></accountBind>
    
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
import { del } from '@/api/game/account'
import { parseTime } from '@/utils/index'
import eHeader from './module/header'
import edit from './module/edit'
import alipayBind from './module/alipay'
import accountBind from './module/account'
import ucoinBind from './module/ucoin'
import accountPassword from './module/password'

export default {
  components: { eHeader,accountBind, alipayBind,accountPassword,ucoinBind },
  mixins: [initData],
  data() {
    return {
      tableHeight: window.innerHeight - 200,
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
      this.url = 'admin/account'
      const sort = 'bizId,desc'
      this.params = { page: this.page, size: this.size, sort: sort }
      const query = this.query
      const uid = query.uid 
      this.params["uid"] = uid 
      return true
    }
     
  }
}
</script>

<style scoped>

</style>

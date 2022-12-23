<template>
  <div class="app-container">
    <eHeader :query="query"/>
    <!--表格渲染-->
    <el-table v-loading="loading" :data="data" size="small" style="width: 100%;">
      <!--<el-table-column prop="bizId" label="bizId"/>-->
      <el-table-column prop="uid" label="用户编号"/>
      <el-table-column prop="uname" label="名称"/>
      <el-table-column prop="balance" label="余额"/>
     <!-- <el-table-column prop="photo" label="头像"/>-->
      <el-table-column prop="loginId" label="登录账号"/> 
      <el-table-column prop="agentId" label="代理ID"/>
      <el-table-column prop="gmtCreate" label="创建时间" width="150px;">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.gmtCreate) }}</span>
        </template>
      </el-table-column> 
      <el-table-column v-if="checkPermission(['ADMIN','PLAYER_ALL','PLAYER_EDIT','PLAYER_DELETE'])" label="操作" width="400px" align="center">
        <template slot-scope="scope">
         <!-- <edit v-permission="['ADMIN','PLAYER_ALL','PLAYER_EDIT']" :data="scope.row" :sup_this="sup_this"/>-->
          <recharge  v-permission="['ADMIN','PLAYER_ALL','PLAYER_EDIT']" :data="scope.row" :sup_this="sup_this">充值</recharge>
          <recharge-sub  v-permission="['ADMIN','PLAYER_ALL','PLAYER_EDIT']" :data="scope.row" :sup_this="sup_this">减分</recharge-sub>
          <transfer  v-permission="['ADMIN','PLAYER_ALL','PLAYER_EDIT']" :data="scope.row" :sup_this="sup_this">转账</transfer>
          <password  v-permission="['ADMIN','PLAYER_ALL','PLAYER_EDIT']" :data="scope.row" :sup_this="sup_this">修改密码</password>
          
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
import { del } from '@/api/game/player'
import { parseTime } from '@/utils/index'
import eHeader from './module/header'
import edit from './module/edit'
import recharge from './module/recharge'
import rechargeSub from './module/rechargeSub'
import transfer from './module/transfer'
import password from './module/password'

export default {
  components: { eHeader, edit,recharge,password,rechargeSub,transfer },
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
      this.url = 'admin/player/online'
      const sort = 'bizId,desc'
      this.params = { page: this.page, size: this.size, sort: sort }
      const query = this.query
      const uid = query.uid
      const loginId = query.loginId
      const agentId = query.agentId
      this.params["uid"] = uid
      this.params["loginId"] = loginId
      this.params["agentId"] = agentId
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

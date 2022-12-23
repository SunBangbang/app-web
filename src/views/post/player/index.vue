<template>
  <div class="app-container">
    <eHeader :query="query"/>
    <!--表格渲染-->
    <el-table v-loading="loading" :data="data" size="small" style="width: 100%;">
      <!--<el-table-column prop="bizId" label="bizId"/>-->
      <el-table-column prop="uid" label="用户编号"/>
      <!--<el-table-column prop="uname" label="名称"/>-->
      <el-table-column prop="balance" label="余额"/>
     <!-- <el-table-column prop="photo" label="头像"/>-->
      <el-table-column prop="loginId" label="登录账号"/> 
      <el-table-column prop="clientIp" label="IP"/> 
      <el-table-column prop="remark" label="备注">
       <template slot-scope="scope"> 
          <el-input v-model="scope.row.remark" size="mini" @change="onChangeRemark(scope.row)" placeholder="请输入内容" />
        </template>
      </el-table-column> 
      <el-table-column label="状态" align="center" width="150px">
  
       <template slot-scope="scope">
           <el-switch
              v-model="scope.row.stt"
              active-color="#13ce66"
              inactive-color="#ff4949"
              active-value="0"
               active-text="开放"
              inactive-text="拉黑"
              @change="onChange(scope.row)"
              inactive-value="1">
            </el-switch>
         </template> 
      </el-table-column>
    <el-table-column prop="agentId" label="代理ID" width="150px;">
        <template slot-scope="scope">
          <span>【{{ scope.row.agentId }}】-{{ scope.row.agentLoginId }}</span>
        </template>
      </el-table-column>
      
      <el-table-column prop="location" label="地址信息"/> 
      <el-table-column prop="gmtCreate" label="创建时间" width="150px;">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.gmtCreate) }}</span>
        </template>
      </el-table-column> 
      <el-table-column fixed="right" v-if="checkPermission(['PLAYER_EDIT'])" label="操作" width="500px" align="center">
        <template slot-scope="scope">
         <!-- <edit v-permission="['ADMIN','PLAYER_ALL','PLAYER_EDIT']" :data="scope.row" :sup_this="sup_this"/>-->
          <recharge  v-permission="['PLAYER_EDIT']" :data="scope.row" :sup_this="sup_this">充值</recharge>
          <recharge-sub  v-permission="['PLAYER_EDIT']" :data="scope.row" :sup_this="sup_this">减分</recharge-sub>
          <!--<transfer  v-permission="['ADMIN','PLAYER_ALL','PLAYER_EDIT']" :data="scope.row" :sup_this="sup_this">转账</transfer>-->
          <password  v-permission="['PLAYER_EDIT']" :data="scope.row" :sup_this="sup_this">修改密码</password>
        
           <el-button class="filter-item" type="primary" icon="el-icon-edit" @click="resetDevice(scope.row)" size="small">重置设备</el-button>
 
          <el-popover
            :ref="scope.row.bizId"
            placement="top"
            width="180">
            <p>确定删除本条数据吗？</p>
            <div style="text-align: right; margin: 0">
              <el-button size="mini" type="text" @click="$refs[scope.row.uid].doClose()">取消</el-button>
              <el-button :loading="delLoading" type="primary" size="mini" @click="subDelete(scope.row.uid)">确定</el-button>
            </div>
            <el-button slot="reference" type="danger" icon="el-icon-delete" size="mini">删除</el-button>
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
import { playerDelete,updateStt,resetDevice,updateRemark } from '@/api/game/player'
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
      this.url = 'admin/player'
      const sort = 'bizId,desc'
      this.params = { page: this.page, size: this.size, sort: sort }
      const query = this.query
      const uid = query.uid
      const loginId = query.loginId
      const agentId = query.agentId
      const clientIp = query.clientIp
      this.params["uid"] = uid
      this.params["clientIp"] = clientIp
      this.params["loginId"] = loginId
      this.params["agentId"] = agentId
      return true
    }
    
    ,
     onChangeRemark(row){
      updateRemark(row).then(res => {
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
    },
    
    onChange(row){ 
      updateStt({"uid":row.uid,"stt":row.stt}).then(res => {
        this.delLoading = false
        this.init()
        this.$notify({
          title: '更新成功',
          type: 'success',
          duration: 2500
        })
      }).catch(err => {
        this.delLoading = false
        console.log(err.response.data.message)
      })
    }, 
    resetDevice(row){
      resetDevice({   uid:row.uid  }).then((res) => {
          this.$notify({
           title: '重置成功',
          type: 'success',
          duration: 2500
        })  
      }); 
    },
    subDelete(uid) {
      this.delLoading = true
      playerDelete({"uid":uid}).then(res => {
        this.delLoading = false
        this.init()
        this.$notify({
          title: '删除成功',
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

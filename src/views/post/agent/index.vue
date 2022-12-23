<template>
  <div class="app-container">
    <eHeader :query="query"/>
    <!--表格渲染-->
    <el-table v-loading="loading" :data="data" size="small" style="width: 100%;">
      <!--<el-table-column prop="bizId" label="bizId"/>-->
      <el-table-column prop="agentId" label="代理ID" width="170px">  
         <template slot-scope="scope">
         <div style="display:inline-block;float: right;cursor: pointer" @click="doQuery(scope.row.agentId)"><i :class="ico"/> <el-tag v-if="scope.row.member > 0" >{{scope.row.agentId}}
            团队【{{ scope.row.member }}】</el-tag>
            <el-tag v-else  >{{scope.row.agentId}} </el-tag>
            </div>
        </template>
      </el-table-column>
      <el-table-column prop="amtProfit" label="盈亏" width="100px"/> 
     <!-- <el-table-column prop="amtAward" label="分红" width="100px"/> -->
      <el-table-column prop="rechargeAmt" label="团队充值" width="100px"/> 
      <el-table-column prop="withdrawAmt" label="团队提现" width="100px"/>  
      <el-table-column prop="commission" label="佣金" width="70px"/>  
      <el-table-column prop="rate" label="返点" width="70px">  
          <template slot-scope="scope">
          <el-tag :type="scope.row.rate>0 ? 'warning' : ''">{{ scope.row.rate }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="agentRate" label="分红率" width="70px">  
          <template slot-scope="scope">
          <el-tag :type="scope.row.agentRate>0 ? 'warning' : ''">{{ scope.row.agentRate }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="直接提现" align="center" width="150px">
  
       <template slot-scope="scope">
           <el-switch
              v-model="scope.row.withdraw"
              active-color="#13ce66"
              inactive-color="#ff4949"
              active-value="1"
               active-text="开通"
              inactive-text="关闭"
              @change="onChange(scope.row)"
              inactive-value="0">
            </el-switch>
         </template> 
      </el-table-column>
      <el-table-column prop="code" label="邀请码" width="70px"/>   
      
      <el-table-column prop="parentId" label="上级代理"  width="370px"/> 
      <el-table-column v-if="checkPermission(['ADMIN','AGENT_ALL','AGENT_EDIT','AGENT_DELETE'])" label="操作" width="350px" align="center">
        <template slot-scope="scope">
          <!--<edit v-permission="['ADMIN','AGENT_ALL','AGENT_EDIT']" :data="scope.row" :sup_this="sup_this"/>
           <el-button :loading="delLoading" type="success" size="mini" @click="deployMoney(scope.row.uid)">分红</el-button>
           -->
           <change-rate v-permission="['ADMIN','AGENT_ALL','AGENT_EDIT']" :data="scope.row" :sup_this="sup_this"/>
          
           
            <change-agent-rate v-permission="['ADMIN','AGENT_ALL','AGENT_EDIT']" :data="scope.row" :sup_this="sup_this"/>
            <el-button :loading="delLoading" type="danger" size="mini" @click="doGenerate(scope.row.uid)">推广码</el-button>
          
        </template>
 
             
      </el-table-column>
    </el-table>
    <!--分页组件-->
    <el-pagination
      :total="totalElements"
      style="margin-top: 8px;"
      layout="total, prev, pager, next, sizes"
      @size-change="sizeChange"
      @current-change="pageChange"/>
  </div>
</template>

<script>
import checkPermission from '@/utils/permission'
import initData from '@/mixins/initData'
import { del,generateCode,deployMoney,updateWithdrawStt } from '@/api/game/agent'
import { parseTime } from '@/utils/index'
import eHeader from './module/header'
import edit from './module/edit'
import changeAgentRate from './module/changeAgentRate'
import changeRate from './module/changeRate'
export default {
  components: { eHeader, edit,changeRate,changeAgentRate },
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
      this.url = 'admin/agent'
      const sort = 'bizId,asc'
      this.params = { page: this.page, size: this.size, sort: sort }
      const query = this.query
      const uid = query.uid 
      const agentId = query.agentId
      const parentId = query.parentId
      this.params["uid"] = uid 
      this.params["agentId"] = agentId 
      this.params["parentId"] = parentId
      return true
    }, 
    doQuery(uid){
      this.query.parentId = uid
      this.page = 0
      this.init()
    },
    
    onChange(row){ 
      updateWithdrawStt({"uid":row.uid,"withdraw":row.withdraw}).then(res => {
        this.delLoading = false
        this.init()
        this.$notify({
          title: '提现开关修改成功',
          type: 'success',
          duration: 2500
        })
      }).catch(err => {
        this.delLoading = false
        console.log(err.response.data.message)
      })
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

    deployMoney(uid) { 
      const _this = this
       this.$confirm('确认分红？', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
          }).then(() => {
              _this.doDeployMoney(uid);
          })
    },
    doDeployMoney(uid){
      deployMoney({"uid":uid}).then(res => { 
        this.init()
        this.$notify({
          title: '分红成功',
          type: 'success',
          duration: 2500
        })
      }).catch(err => { 
        console.log(err.response.data.message)
      })
    },
    doGenerate(uid) { 
      generateCode({"uid":uid}).then(res => { 
        this.init()
        this.$notify({
          title: '生成成功',
          type: 'success',
          duration: 2500
        })
      }).catch(err => { 
        console.log(err.response.data.message)
      })
    }
    
  }
}
</script>

<style scoped>

</style>

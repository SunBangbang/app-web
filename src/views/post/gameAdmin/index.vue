<template>
  <div class="app-container">
    <eHeader :query="query"/>
    <!--表格渲染-->
    <el-table v-loading="loading" :data="data" size="small" style="width: 100%;">
   
      <el-table-column prop="uid" label="玩家ID"/>  
      <el-table-column prop="amt" label="投注金额"/> 
       <el-table-column prop="amtWin" label="赢金额">
        <template slot-scope="scope">
          <el-tag :type="scope.row.amtWin>0 ? 'warning' : ''">{{ scope.row.amtWin }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="amtLose" label="输"/> 
       <el-table-column prop="amtWin" label="改不中">
        <template slot-scope="scope">
             <el-tag v-if="scope.row.rid === 'N'" type="danger" >是</el-tag>
              <el-tag v-else >否</el-tag>
        </template>
      </el-table-column>
      
      <el-table-column prop="agentId" label="上级代理" width="200px;"/>
      <el-table-column prop="gameToken" label="游戏局编号"  width="120px;"/> 
      <!--<el-table-column prop="commission" label="佣金"/> 
      <el-table-column prop="stt" label="状态"/>-->
      <el-table-column prop="gmtCreate" label="创建时间" width="150px;">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.gmtCreate) }}</span>
        </template>
      </el-table-column>
        <el-table-column fixed="right" v-if="checkPermission(['ADMIN','PLAYER_ALL','PLAYER_EDIT','PLAYER_DELETE'])" label="操作" width="200px" align="center">
        <template slot-scope="scope">
           <el-popover
            :ref="scope.row.bizId"
            placement="top"
            width="180">
            <p>确定修改成不中？</p>
            <div style="text-align: right; margin: 0">
              <el-button size="mini" type="text" @click="$refs[scope.row.uid].doClose()">取消</el-button>
              <el-button :loading="delLoading" type="primary" size="mini" @click="setFlag(scope.row.bizId)">确定</el-button>
            </div>
            <el-button slot="reference" type="danger" icon="el-icon-delete" size="mini">不中</el-button>
          </el-popover>
           <el-popover
            :ref="scope.row.bizId"
            placement="top"
            width="180">
            <p>确定修改成中？</p>
            <div style="text-align: right; margin: 0">
              <el-button size="mini" type="text" @click="$refs[scope.row.uid].doClose()">取消</el-button>
              <el-button :loading="delLoading" type="primary" size="mini" @click="setFlagWin(scope.row.bizId)">确定</el-button>
            </div>
            <el-button slot="reference" type="warning" icon="el-icon-delete" size="mini">中奖</el-button>
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
import { setFlag,setFlagWin } from '@/api/game/flowGame'
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
      this.url = 'admin/flowGame'
      const sort = 'bizId,desc'
      this.params = { page: this.page, size: this.size, sort: sort }
      const query = this.query
      const uid = query.uid
      const gameToken = query.gameToken
      const agentId = query.agentId
      this.params["uid"] = uid
      this.params["gameToken"] = gameToken
      this.params["agentId"] = agentId
      return true
    },

    setFlag(bizId){
      this.delLoading = true
      setFlag(bizId).then(res => {
        this.delLoading = false
        this.$refs[bizId].doClose()
        this.init()
        this.$notify({
          title: '操作成功',
          type: 'success',
          duration: 2500
        })
      }).catch(err => {
        this.delLoading = false
        this.$refs[bizId].doClose()
        console.log(err.response.data.message)
      })
    },
    
    setFlagWin(bizId){
      this.delLoading = true
      setFlagWin(bizId).then(res => {
        this.delLoading = false
        this.$refs[bizId].doClose()
        this.init()
        this.$notify({
          title: '操作成功',
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

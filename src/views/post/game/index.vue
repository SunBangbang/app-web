<template>
  <div class="app-container">
    <eHeader :query="query"/>
    <!--表格渲染-->
    <el-table v-loading="loading" :data="data" size="small" style="width: 100%;">
      <!--<el-table-column prop="bizId" label="bizId"/>
      <el-table-column prop="agentId" label="代理ID"/>-->
      <el-table-column prop="uid" label="玩家ID" width="80px;"/>  
      <el-table-column prop="rid" label="投注详情" width="320px;"/> 
      <el-table-column prop="amt" label="投注金额" width="80px;"/> 
       <el-table-column prop="amtWin" label="赢金额" width="80px;">
        <template slot-scope="scope">
          <el-tag :type="scope.row.amtWin>0 ? 'warning' : ''">{{ scope.row.amtWin }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="amtLose" label="输" width="80px;"/>
      <!--<el-table-column prop="balance" label="余额"/> -->
      <el-table-column prop="point" label="返点" width="80px;"/> 
      
      <el-table-column label="游戏类型" align="center" width="110px;">
        <template slot-scope="scope">
           <el-tag v-if="scope.row.gameId==='1001' "  :type="scope.row.gameId==='1001' ? 
           'danger' : 'warning'">
            {{gameType[scope.row.gameId]}}
          </el-tag>
           <el-tag v-else-if=" scope.row.gameId==='1003' "  :type="scope.row.gameId==='1003' ? 
           'primary' : 'warning'">
            {{gameType[scope.row.gameId]}}
          </el-tag>
           <el-tag v-else-if=" scope.row.gameId==='1004' "  :type="scope.row.gameId==='1004' ? 
           'success' : 'warning'">
            {{gameType[scope.row.gameId]}}
          </el-tag>
           <el-tag v-else :type="'warning'">
            {{gameType[scope.row.gameId]}}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="gameToken" label="游戏编号"  width="120px;"/> 
      <!--<el-table-column prop="commission" label="佣金"/> 
      <el-table-column prop="stt" label="状态"/>-->
      <el-table-column prop="gmtCreate" label="创建时间" width="150px;">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.gmtCreate) }}</span>
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
import { del } from '@/api/game/flowGame'
import { parseTime } from '@/utils/index'
import eHeader from './module/header'
import edit from './module/edit'
export default {
  components: { eHeader, edit },
  mixins: [initData],
  data() {
    return {
      gameType:{1001:"海洋探险",1002:"荒野淘金",1003:"酷狗游戏",1004:"酷我游戏",1005:"QQ音乐",1006:"龙虎"},
    
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
      this.params = { page: this.page, size: 100, sort: sort }
      const query = this.query
      const uid = query.uid
      const gameToken = query.gameToken
      const agentId = query.agentId
      this.params["uid"] = uid
      this.params["gameToken"] = gameToken
      this.params["agentId"] = agentId
      this.params["startDate"] = this.query.startDate  
      this.params["endDate"] = this.query.endDate
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

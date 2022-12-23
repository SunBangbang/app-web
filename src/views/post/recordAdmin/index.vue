<template>
  <div class="app-container">
    <eHeader :query="query"/>
    <!--表格渲染-->
    <el-table v-loading="loading" :data="data" size="small" style="width: 100%;">
      <!--<el-table-column prop="bizId" label="bizId"/>
      <el-table-column prop="agentId" label="代理ID" width="100px"/>-->
      <el-table-column prop="uid" label="玩家ID" width="80px"/>
      <el-table-column prop="weaponId" label="下注位置" width="80px"/>
      <el-table-column prop="weaponName" label="武器名称">
        <template slot-scope="scope">
          <el-tag :type="scope.row.monsterId> 0 ? '' : 'danger'">{{ scope.row.weaponName }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="monsterId" label="开奖怪物" width="80px"/>
      <el-table-column prop="monsterName" label="怪物名称"/>
      <el-table-column prop="amt" label="投注金额"/>
      <el-table-column prop="amtWin" label="赢金额">
        <template slot-scope="scope">
          <el-tag :type="scope.row.amtWin>0 ? 'warning' : ''">{{ scope.row.amtWin }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="rate" label="赔率"/>
      
      <el-table-column prop="gameId" label="游戏类型">
        <template slot-scope="scope">
            <div v-for="item in gameTypeList" :key="item.key">
              <el-tag v-if="scope.row.gameId.toString() === item.key" :type="scope.row.gameId==='1001' ? 'danger' : 'warning'">{{ item.label }}</el-tag>
            </div>
        </template>
      </el-table-column>
      <el-table-column prop="gameToken" label="游戏局编号"  width="120px"/> 
      <!--<el-table-column prop="startTime" label="游戏开始时间"/>
      <el-table-column prop="awardTime" label="游戏开奖时间"/>
      <el-table-column prop="endTime" label="游戏结束时间"/>-->
      <!--<el-table-column prop="commission" label="佣金"/>
      <el-table-column prop="point" label="返点率"/>
      <el-table-column prop="stt" label="状态"/>-->
      <el-table-column prop="gmtCreate" label="时间"  width="150px">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.gmtCreate) }}</span>
        </template>
      </el-table-column>
      <!--<el-table-column prop="gmtModified" label="修改时间">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.gmtModified) }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="gameId" label="游戏编号"/>-->
      <el-table-column v-if="checkPermission(['ADMIN','FLOWRECORD_ALL','FLOWRECORD_EDIT','FLOWRECORD_DELETE'])" label="操作" width="150px" align="center">
        <template slot-scope="scope">
          <el-popover
            v-permission="['ADMIN','FLOWRECORD_ALL','FLOWRECORD_DELETE']"
            :ref="scope.row.bizId"
            placement="top"
            width="180">
            <p>确定更新本条数据吗？</p>
            <div style="text-align: right; margin: 0">
              <el-button size="mini" type="text" @click="$refs[scope.row.bizId].doClose()">取消</el-button>
              <el-button :loading="delLoading" type="primary" size="mini" @click="subDelete(scope.row.bizId)">确定</el-button>
            </div>
            <el-button slot="reference" type="danger" icon="el-icon-submit" size="mini">修改</el-button>
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
import { del,updateRecord } from '@/api/game/flowRecord'
import { parseTime } from '@/utils/index'
import eHeader from './module/header'
import edit from './module/edit'
export default {
  components: { eHeader, edit },
  mixins: [initData],
  data() {
    return {
      gameTypeList:[{"key":"1001","label":"海洋探险"},{"key":"1002","label":"荒野淘金"}],
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
      this.url = 'admin/flowRecordAdmin'
      const sort = 'bizId,desc'
      this.params = { page: this.page, size: 30, sort: sort }
      const query = this.query
     const uid = query.uid
      const gameToken = query.gameToken
      const agentId = query.agentId
      this.params["uid"] = uid
      this.params["gameToken"] = gameToken
      this.params["agentId"] = agentId
      return true
    },
    subDelete(bizId) {
      this.delLoading = true
      updateRecord(bizId).then(res => {
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

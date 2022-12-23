<template>
  <div class="app-container">
    <eHeader :query="query"/>
    <!--表格渲染-->
    <el-table v-loading="loading" :data="data" size="small" style="width: 100%;">
      <el-table-column prop="monsterId" label="怪物ID"/>
      <el-table-column prop="monsterName" label="怪物名称"/>
      <el-table-column prop="fearWeaponId" label="惧怕武器"/> 
      <el-table-column prop="gameToken" label="游戏局编号" width="150px;"/>
      <el-table-column prop="startTime" label="游戏开始时间" width="150px;">
         <template slot-scope="scope">
          <span>{{ parseTime(scope.row.startTime*1) }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="awardTime" label="游戏开奖时间" width="150px;">
         <template slot-scope="scope">
          <span>{{ parseTime(scope.row.awardTime*1) }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="endTime" label="游戏结束时间" width="150px;">
         <template slot-scope="scope">
          <span>{{ parseTime(scope.row.endTime*1) }}</span>
        </template>
      </el-table-column> 
       <el-table-column label="游戏类型" align="center">
        <template slot-scope="scope">
           <el-tag v-if="gameType[scope.row.gameId]"  :type="scope.row.gameId==='1001' ? 'danger' : 'warning'">
            {{gameType[scope.row.gameId]}}
          </el-tag>
        </template>
      </el-table-column>
        <el-table-column prop="stt" label="状态">
          <template slot-scope="scope">
            <div v-for="item in sttList" :key="item.key">
              <el-tag v-if="scope.row.stt.toString() === item.key" :type="scope.row.stt ? '' : 'info'">{{ item.label }}</el-tag>
            </div>
          </template>
      </el-table-column>
       <el-table-column v-if="checkPermission(['ADMIN','FLOWRECORD_ALL','FLOWRECORD_EDIT','FLOWRECORD_DELETE'])" label="操作" width="250px" align="center">
        <template slot-scope="scope">
          <edit v-permission="['ADMIN','FLOWRECORD_ALL','FLOWRECORD_EDIT']" :data="scope.row" :sup_this="sup_this"/>
          <el-button :loading="delLoading" type="danger" size="mini" @click="doSettle(scope.row.bizId)">重新结算</el-button>
          
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
import { del,doSettle } from '@/api/game/syncData'
import { parseTime } from '@/utils/index'
import eHeader from './module/header'
import edit from './module/edit'
export default {
  components: { eHeader, edit },
  mixins: [initData],
  data() {
    return {
      gameType:{1001:"海洋探险",1002:"荒野淘金",1003:"酷狗游戏",1004:"酷我游戏",1005:"QQ音乐",1006:"龙虎"},
      sttList: [ 
        { key: '4', label: '已结算' },
        { key: '2', label: '已开奖' },
        { key: '3', label: '结算中' },
        { key: '1', label: '未开奖' }
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
      this.url = 'admin/syncData'
      const sort = 'bizId,desc'
      this.params = { page: this.page, size: this.size, sort: sort }
      const query = this.query
      const gameToken = query.gameToken
      this.params["gameToken"] = gameToken
      this.params["gameId"] = '1001'
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
    doSettle(bizId) { 
      doSettle({"bizId":bizId}).then(res => { 
        this.init()
        this.$notify({
          title: '结算已提交处理',
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

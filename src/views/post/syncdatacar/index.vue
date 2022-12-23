<template>
  <div class="app-container">
    <eHeader :query="query"/>
    <!--表格渲染-->
    <el-table v-loading="loading" :data="data" size="small" style="width: 100%;">
      <!--<el-table-column prop="bizId" label="bizId"/>-->
      <el-table-column prop="carId" label="汽车ID" width="100px"/>
      <el-table-column prop="carName" label="汽车名称" width="100px"/>
      <el-table-column prop="rate" label="赔率"/>
      <el-table-column prop="gameTokenKugou" label="外部游戏编号" width="150px"/>
      <el-table-column prop="gameToken" label="游戏局编号" width="150px"/>
      <el-table-column prop="startTime" label="游戏开始时间" width="150px;">
         <template slot-scope="scope">
          <span>{{ parseTime(scope.row.startTime*1000) }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="awardTime" label="游戏开奖时间" width="150px;">
         <template slot-scope="scope">
          <span>{{ parseTime(scope.row.endTime*1000-10*1000) }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="endTime" label="游戏结束时间" width="150px;">
         <template slot-scope="scope">
          <span>{{ parseTime(scope.row.endTime*1000) }}</span>
        </template>
      </el-table-column> 
      <el-table-column prop="stt" label="状态"/>
      <el-table-column v-if="checkPermission(['ADMIN','FLOWRECORD_ALL','FLOWRECORD_EDIT','FLOWRECORD_DELETE'])" label="操作" width="150px" align="center">
        <template slot-scope="scope">
          <edit v-permission="['ADMIN','FLOWRECORD_ALL','FLOWRECORD_EDIT']" :data="scope.row" :sup_this="sup_this"/>
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
import { del } from '@/api/game/syncDataCar'
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
      this.url = 'admin/syncDataCar'
      const sort = 'bizId,desc'
      this.params = { page: this.page, size: this.size, sort: sort }
      const query = this.query
      const type = query.type
      const value = query.value
      if (type && value) { this.params[type] = value }
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

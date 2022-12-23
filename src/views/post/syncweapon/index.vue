<template>
  <div class="app-container">
    <eHeader :query="query"/>
    <!--表格渲染-->
    <el-table v-loading="loading" :data="data" size="small" style="width: 100%;">
      <!--<el-table-column prop="bizId" label="bizId"/>-->
      <el-table-column prop="weaponId" label="武器ID"/>
     <el-table-column label="游戏类型" align="center">
        <template slot-scope="scope">
           <el-tag v-if="gameType[scope.row.gameId]"  :type="scope.row.gameId==='1001' ? 'danger' : 'warning'">
            {{gameType[scope.row.gameId]}}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="weaponName" label="武器名称"/>
      <el-table-column prop="attackMonsterId" label="攻击怪物ID"/> 
      <el-table-column prop="rate" label="赔率"/> 
      <el-table-column prop="amtLimit" label="最大金额限制"/> 
      <el-table-column v-if="checkPermission(['ADMIN','SYNCWEAPON_ALL','SYNCWEAPON_EDIT','SYNCWEAPON_DELETE'])" label="操作" width="150px" align="center">
        <template slot-scope="scope">
          <edit  v-permission="['ADMIN','SYNCWEAPON_ALL','SYNCWEAPON_EDIT']" :data="scope.row" :sup_this="sup_this">
            赔率修改</edit>
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
import { del } from '@/api/game/syncWeapon'
import { parseTime } from '@/utils/index'
import eHeader from './module/header'
import edit from './module/edit'
export default {
  components: { eHeader, edit },
  mixins: [initData],
  data() {
    return {
       gameType:{1001:"海洋探险",1002:"荒野淘金",1003:"酷狗游戏",1004:"酷我游戏"},
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
      this.url = 'admin/syncWeapon'
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

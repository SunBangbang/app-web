<template>
  <div class="app-container">
    <eHeader :query="query"/>
    <!--表格渲染-->
    <el-table v-loading="loading" :data="data" size="small" style="width: 100%;">
      <el-table-column prop="errorMsg" label="提示信息" width="300px"/>
      <!--<el-table-column prop="errorType" label="类型"/>-->
      <el-table-column prop="errorId" label="提示码" width="300px"/>
      <el-table-column prop="errorDesc" label="提示说明" width="300px"/>
      <!--<el-table-column prop="gmtCreate" label="创建时间">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.gmtCreate) }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="gmtModified" label="修改时间">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.gmtModified) }}</span>
        </template>
      </el-table-column>-->
      <el-table-column v-if="checkPermission(['ADMIN','ERRORCODE_ALL','ERRORCODE_EDIT','ERRORCODE_DELETE'])" label="操作" width="150px" align="center">
        <template slot-scope="scope">
          <edit v-permission="['ADMIN','ERRORCODE_ALL','ERRORCODE_EDIT']" :data="scope.row" :sup_this="sup_this"/>
          <el-popover
            v-permission="['ADMIN','ERRORCODE_ALL','ERRORCODE_DELETE']"
            :ref="scope.row.bizId"
            placement="top"
            width="180">
            <p>确定删除本条数据吗？</p>
            <div style="text-align: right; margin: 0">
              <el-button size="mini" type="text" @click="$refs[scope.row.bizId].doClose()">取消</el-button>
              <el-button :loading="delLoading" type="primary" size="mini" @click="subDelete(scope.row.bizId)">确定</el-button>
            </div>
            <el-button slot="reference" type="danger" icon="el-icon-delete" size="mini"/>
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
import { del } from '@/api/errorCode'
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
      this.url = 'admin/errorCode'
      const sort = 'bizId,desc'
      this.params = { page: this.page, size: this.size, sort: sort }
      const query = this.query 
      const errorId = query.errorId
      const errorMsg = query.errorMsg
      this.params["errorId"] = errorId 
      this.params["errorMsg"] = errorMsg
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

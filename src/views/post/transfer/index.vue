<template>
  <div class="app-container">
    <eHeader :query="query"/>
    <!--表格渲染-->
    <el-table v-loading="loading" :data="data" size="small" style="width: 100%;">
      <!--<el-table-column prop="bizId" label="bizId"/
      <el-table-column prop="uname" label="付款人名称"/>>-->
      <el-table-column prop="uid" label="付款人"/>
      <el-table-column prop="ruid" label="收款人"/>
      <el-table-column prop="amt" label="余额"/>
      <el-table-column prop="amtIn" label="转入金额"/>
      <el-table-column prop="amtOut" label="转出金额"/>
      <el-table-column prop="remark" label="说明"/>
      <el-table-column prop="gmtCreate" label="申请时间" width="150px">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.gmtCreate) }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="gmtModified" label="完成时间"  width="150px">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.gmtModified) }}</span>
        </template>
      </el-table-column>
      <!--
      <el-table-column v-if="checkPermission(['ADMIN','FLOWTRANSFER_ALL','FLOWTRANSFER_EDIT','FLOWTRANSFER_DELETE'])" label="操作" width="150px" align="center">
        <template slot-scope="scope">
          <edit v-permission="['ADMIN','FLOWTRANSFER_ALL','FLOWTRANSFER_EDIT']" :data="scope.row" :sup_this="sup_this"/>
          <el-popover
            v-permission="['ADMIN','FLOWTRANSFER_ALL','FLOWTRANSFER_DELETE']"
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
      </el-table-column>-->
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
import { del } from '@/api/game/flowTransfer'
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
      this.url = 'admin/flowTransfer'
      const sort = 'bizId,desc'
      this.params = { page: this.page, size: this.size, sort: sort }
      const query = this.query 
      const uid = query.uid 
      const ruid = query.ruid
      this.params["uid"] = uid  
      this.params["ruid"] = ruid
      var type=""
      if(query.type){
        query.type.forEach(element => {
          type = type+element+","
        });
      }
      this.params["type"]=type;
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

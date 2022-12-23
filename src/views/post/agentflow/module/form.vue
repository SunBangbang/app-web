<template>
  <el-dialog :append-to-body="true" :visible.sync="dialog" :title="isAdd ? '新增' : '编辑'" width="500px">
    <el-form ref="form" :model="form" :rules="rules" size="small" label-width="80px">
      <el-form-item label="上级代理" >
        <el-input v-model="form.parentId" style="width: 370px;"/>
      </el-form-item>
      <el-form-item label="关联用户编号" >
        <el-input v-model="form.uid" style="width: 370px;"/>
      </el-form-item>
      <el-form-item label="代理ID：[list保存]" >
        <el-input v-model="form.agentId" style="width: 370px;"/>
      </el-form-item>
      <el-form-item label="日期" >
        <el-input v-model="form.flowDate" style="width: 370px;"/>
      </el-form-item>
      <el-form-item label="类型" >
        <el-input v-model="form.flowType" style="width: 370px;"/>
      </el-form-item>
      <el-form-item label="返点率" >
        <el-input v-model="form.rate" style="width: 370px;"/>
      </el-form-item>
      <el-form-item label="金额" >
        <el-input v-model="form.amt" style="width: 370px;"/>
      </el-form-item>
      <el-form-item label="流水" >
        <el-input v-model="form.amtFlow" style="width: 370px;"/>
      </el-form-item>
      <el-form-item label="盈亏" >
        <el-input v-model="form.amtProfit" style="width: 370px;"/>
      </el-form-item>
      <el-form-item label="佣金" >
        <el-input v-model="form.amtCommission" style="width: 370px;"/>
      </el-form-item>
      <el-form-item label="返点收入" >
        <el-input v-model="form.amtPoint" style="width: 370px;"/>
      </el-form-item>
      <el-form-item label="创建时间" >
        <el-input v-model="form.gmtCreate" style="width: 370px;"/>
      </el-form-item>
      <el-form-item label="修改时间" >
        <el-input v-model="form.gmtModified" style="width: 370px;"/>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button type="text" @click="cancel">取消</el-button>
      <el-button :loading="loading" type="primary" @click="doSubmit">确认</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { add, edit } from '@/api/game/flowAgent'
export default {
  props: {
    isAdd: {
      type: Boolean,
      required: true
    },
    sup_this: {
      type: Object,
      default: null
    }
  },
  data() {
    return {
      loading: false, dialog: false,
      form: {
        bizId: '',
        parentId: '',
        uid: '',
        agentId: '',
        flowDate: '',
        flowType: '',
        rate: '',
        amt: '',
        amtFlow: '',
        amtProfit: '',
        amtCommission: '',
        amtPoint: '',
        gmtCreate: '',
        gmtModified: ''
      },
      rules: {
      }
    }
  },
  methods: {
    cancel() {
      this.resetForm()
    },
    doSubmit() {
      this.loading = true
      if (this.isAdd) {
        this.doAdd()
      } else this.doEdit()
    },
    doAdd() {
      add(this.form).then(res => {
        this.resetForm()
        this.$notify({
          title: '添加成功',
          type: 'success',
          duration: 2500
        })
        this.loading = false
        this.$parent.$parent.init()
      }).catch(err => {
        this.loading = false
        console.log(err.response.data.message)
      })
    },
    doEdit() {
      edit(this.form).then(res => {
        this.resetForm()
        this.$notify({
          title: '修改成功',
          type: 'success',
          duration: 2500
        })
        this.loading = false
        this.sup_this.init()
      }).catch(err => {
        this.loading = false
        console.log(err.response.data.message)
      })
    },
    resetForm() {
      this.dialog = false
      this.$refs['form'].resetFields()
      this.form = {
        bizId: '',
        parentId: '',
        uid: '',
        agentId: '',
        flowDate: '',
        flowType: '',
        rate: '',
        amt: '',
        amtFlow: '',
        amtProfit: '',
        amtCommission: '',
        amtPoint: '',
        gmtCreate: '',
        gmtModified: ''
      }
    }
  }
}
</script>

<style scoped>

</style>

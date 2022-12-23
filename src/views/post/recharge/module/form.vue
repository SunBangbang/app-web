<template>
  <el-dialog :append-to-body="true" :visible.sync="dialog" :title="isAdd ? '新增' : '编辑'" width="500px">
    <el-form ref="form" :model="form" :rules="rules" size="small" label-width="80px">
      <el-form-item label="支付系统流水号" >
        <el-input v-model="form.orderNo" style="width: 370px;"/>
      </el-form-item>
      <el-form-item label="代理ID" >
        <el-input v-model="form.agentId" style="width: 370px;"/>
      </el-form-item>
      <el-form-item label="关联用户编号" >
        <el-input v-model="form.uid" style="width: 370px;"/>
      </el-form-item>
      <el-form-item label="支付宝ID" >
        <el-input v-model="form.alipayId" style="width: 370px;"/>
      </el-form-item>
      <el-form-item label="支付宝姓名" >
        <el-input v-model="form.alipayName" style="width: 370px;"/>
      </el-form-item>
      <el-form-item label="银行卡号" >
        <el-input v-model="form.accountNo" style="width: 370px;"/>
      </el-form-item>
      <el-form-item label="银行卡姓名" >
        <el-input v-model="form.accountName" style="width: 370px;"/>
      </el-form-item>
      <el-form-item label="银行开户行" >
        <el-input v-model="form.accountBankName" style="width: 370px;"/>
      </el-form-item>
      <el-form-item label="充值金额" >
        <el-input v-model="form.amt" style="width: 370px;"/>
      </el-form-item>
      <el-form-item label="状态" >
        <el-input v-model="form.stt" style="width: 370px;"/>
      </el-form-item>
      <el-form-item label="说明" >
        <el-input v-model="form.remark" style="width: 370px;"/>
      </el-form-item>
      <!--<el-form-item label="创建时间" >
        <el-input v-model="form.gmtCreate" style="width: 370px;"/>
      </el-form-item>
      <el-form-item label="修改时间" >
        <el-input v-model="form.gmtModified" style="width: 370px;"/>
      </el-form-item>-->
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button type="text" @click="cancel">取消</el-button>
      <el-button :loading="loading" type="primary" @click="doSubmit">确认</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { add, edit } from '@/api/game/flowRecharge'
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
        orderNo: '',
        agentId: '',
        uid: '',
        alipayId: '',
        alipayName: '',
        accountNo: '',
        accountName: '',
        accountBankName: '',
        amt: '',
        stt: '',
        remark: '',
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
        orderNo: '',
        agentId: '',
        uid: '',
        alipayId: '',
        alipayName: '',
        accountNo: '',
        accountName: '',
        accountBankName: '',
        amt: '',
        stt: '',
        remark: '',
        gmtCreate: '',
        gmtModified: ''
      }
    }
  }
}
</script>

<style scoped>

</style>

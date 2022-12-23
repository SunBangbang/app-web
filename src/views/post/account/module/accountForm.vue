<template>
  <el-dialog :append-to-body="true" :visible.sync="dialog" :title="'绑定银行卡'" width="700px">
    <el-form ref="form" :model="form" :rules="rules" size="small" label-width="180px">
      <el-form-item label="用户编号" >
        <el-input   disabled="true" v-model="form.uid" style="width: 370px;"/>
      </el-form-item>
      <el-form-item label="名称" >
        <el-input  disabled="true" v-model="form.uname" style="width: 370px;"/>
      </el-form-item> 
      <el-form-item label="姓名" >
        <el-input v-model="form.accountName" style="width: 370px;"/>
      </el-form-item>
      <el-form-item label="卡号" >
        <el-input v-model="form.accountNo" style="width: 370px;"/>
      </el-form-item>
      <el-form-item label="银行名称" >
        <el-input v-model="form.accountBankName" style="width: 370px;"/>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button type="text" @click="cancel">取消</el-button>
      <el-button :loading="loading" type="primary" @click="doSubmit">确认</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { bindAccount } from '@/api/game/account'
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
        uid: '',
        uname: '',
        accountBankName: '',
        loginId: '',
        accountName: '',
        accountNo: ''
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
      this.doEdit()
    }, 
    doEdit() {
      bindAccount(this.form).then(res => {
        this.resetForm()
        this.$notify({
          title: '成功',
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
        uid: '',
        uname: '',
        accountBankName: '',
        loginId: '',
        accountName: '',
        accountNo: ''
      }
    }
  }
}
</script>

<style scoped>

</style>

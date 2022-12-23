<template>
  <el-dialog :append-to-body="true" :visible.sync="dialog" :title="'重置密码'" width="500px">
    <el-form ref="form" :model="form" :rules="rules" size="small" label-width="80px">
      <el-form-item label="用户编号" >
        <el-input   disabled="true" v-model="form.uid" style="width: 370px;"/>
      </el-form-item>
      <el-form-item label="名称" >
        <el-input  disabled="true" v-model="form.uname" style="width: 370px;"/>
      </el-form-item> 
      <el-form-item label="新密码" >
        <el-input v-model="form.loginPassword" style="width: 370px;"/>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button type="text" @click="cancel">取消</el-button>
      <el-button :loading="loading" type="primary" @click="doSubmit">确认</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { resetPassword } from '@/api/game/player'
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
        loginPassword: '',
        loginId: '',
        balance: ''
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
      resetPassword(this.form).then(res => {
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
        loginPassword: '',
        loginId: '',
        balance: '',
      }
    }
  }
}
</script>

<style scoped>

</style>

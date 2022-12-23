<template>
  <el-dialog :append-to-body="true" :visible.sync="dialog" :title="'减分'" width="600px">
    <el-form ref="form" :model="form" :rules="rules" size="small" label-width="130px">
      <el-form-item label="用户编号" >
        <el-input   disabled="true" v-model="form.uid" style="width: 370px;"/>
      </el-form-item>
      <el-form-item label="名称" >
        <el-input  disabled="true" v-model="form.uname" style="width: 370px;"/>
      </el-form-item>
      <el-form-item label="余额" >
        <el-input disabled="true" v-model="form.balance" style="width: 370px;"/>
      </el-form-item>
      <el-form-item label="资金类型" >
        <el-select v-model="form.type" clearable placeholder="资金类型" class="filter-item" style="width: 370px">
          <el-option v-for="item in queryTypeOptions" :key="item.key" :label="item.display_name" :value="item.key"/>
        </el-select>
      </el-form-item>
      <el-form-item label="减分余额（请填写负数）" >
        <el-input v-model="form.amt" style="width: 370px;"/>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button type="text" @click="cancel">取消</el-button>
      <el-button :loading="loading" type="primary" @click="doSubmit">确认</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { rechargeSub } from '@/api/game/account'
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
      
       queryTypeOptions: [
        {key:'0',display_name:'不算返点'},
        {key:'1',display_name:'按充值率算返点'}, 
        /**,
        {key:'3',display_name:'代上分'},
        {key:'1',display_name:'手工回调'},
        {key:'2',display_name:'测试充值'}**/
       ],
      loading: false, dialog: false,
      form: {
        bizId: '',
        uid: '',
        uname: '',
        amt: '0',
        type:'0',
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
      rechargeSub(this.form).then(res => {
        this.resetForm()
        this.$notify({
          title: '减分成功',
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
        amt: '0',
        loginId: '',
        balance: '',
      }
    }
  }
}
</script>

<style scoped>

</style>

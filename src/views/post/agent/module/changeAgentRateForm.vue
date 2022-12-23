<template>
  <el-dialog :append-to-body="true" :visible.sync="dialog" :title="isAdd ? '新增' : '编辑'" width="500px">
    <el-form ref="form" :model="form" :rules="rules" size="small" label-width="80px">
      <el-form-item label="代理ID" >
        <el-input disabled="true" v-model="form.agentId" style="width: 370px;"/>
      </el-form-item>
      <el-form-item disabled="true" label="玩家ID" >
        <el-input v-model="form.uid" style="width: 370px;"/>
      </el-form-item>  
      <el-form-item label="分红率" >
        <el-input v-model="form.agentRate" style="width: 370px;"/>
      </el-form-item>  
       
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button type="text" @click="cancel">取消</el-button>
      <el-button :loading="loading" type="primary" @click="doSubmit">确认</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { changeAgentRate } from '@/api/game/agent'
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
        agentId: '',
        uid: '',
        level: '',
        loginPassword: '',
        commission: '',
        agentRate:0,
        rate: '',
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
     this.changeAgentRate()
    }, 
    changeAgentRate() {
      changeAgentRate(this.form).then(res => {
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
        agentId: '',
        uid: '',
        level: '',
        agentRate:0,
        loginPassword: '',
        commission: '',
        rate: '',
        gmtCreate: '',
        gmtModified: ''
      }
    }
  }
}
</script>

<style scoped>

</style>

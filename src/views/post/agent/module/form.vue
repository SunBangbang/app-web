<template>
  <el-dialog :append-to-body="true" :visible.sync="dialog" :title="isAdd ? '新增' : '编辑'" width="600px">
    <el-form ref="form" :model="form" :rules="rules" size="small" label-width="80px">
     
      <el-form-item label="上级推荐码" >
        <el-input v-model="form.code" style="width: 470px;"/>
      </el-form-item>
       <el-form-item label="代理登录名" >
        <el-input v-model="form.loginId" style="width: 470px;"/>
      </el-form-item>
     <!-- <el-form-item label="级别" >
        <el-input v-model="form.level" style="width: 370px;"/>
      </el-form-item>-->
      <el-form-item label="代理密码" >
        <el-input v-model="form.loginPassword" style="width: 470px;"/>
      </el-form-item> 
      <el-form-item label="返点率" >
        <el-input v-model="form.rate" style="width: 470px;"/>
      </el-form-item>
      <el-form-item label="分红率" >
        <el-input v-model="form.agentRate" style="width: 470px;"/>
      </el-form-item>
      <!--
      <el-form-item label="收益" >
        <el-input v-model="form.amtProfit" style="width: 370px;"/>
      </el-form-item>
      
      <el-form-item label="链接" >
        <el-input v-model="form.link" style="width: 370px;"/>
      </el-form-item>-->
      
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
import { add, edit } from '@/api/game/agent'
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
        point: '',
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
        agentId: '',
        uid: '',
        level: '',
        loginPassword: '',
        commission: '',
        point: '',
        gmtCreate: '',
        gmtModified: ''
      }
    }
  }
}
</script>

<style scoped>

</style>

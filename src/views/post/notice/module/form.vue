<template>
  <el-dialog :append-to-body="true" :visible.sync="dialog" :title="isAdd ? '新增' : '编辑'" width="700px">
    <el-form ref="form" :model="form" :rules="rules" size="small" label-width="80px">
      <el-form-item label="公告名称" >
        <el-input v-model="form.noticeName" />
      </el-form-item>
      <el-form-item label="公告标题" >
        <el-input v-model="form.noticeTitle" />
      </el-form-item> 
      <el-form-item label="公告描述" >
        <el-input v-model="form.noticeDesc" />
      </el-form-item>
      <el-form-item label="公告内容" >
        <textarea rows="10" cols="70" v-model="form.noticeContent"  />
      </el-form-item>
      <!--<el-form-item label="创建时间" >
        <el-input v-model="form.gmtCreate" />
      </el-form-item>
      <el-form-item label="修改时间" >
        <el-input v-model="form.gmtModified" />
      </el-form-item>-->
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button type="text" @click="cancel">取消</el-button>
      <el-button :loading="loading" type="primary" @click="doSubmit">确认</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { add, edit } from '@/api/game/notice'
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
        noticeContent: '',
        noticeDesc: '',
        noticeName: '',
        noticeTitle: '',
        stt: '',
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
        noticeContent: '',
        noticeDesc: '',
        noticeName: '',
        noticeTitle: '',
        stt: '',
        gmtCreate: '',
        gmtModified: ''
      }
    }
  }
}
</script>

<style scoped>

</style>

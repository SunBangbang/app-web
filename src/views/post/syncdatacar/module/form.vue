<template>
  <el-dialog :append-to-body="true" :visible.sync="dialog" :title="isAdd ? '新增' : '编辑'" width="500px">
    <el-form ref="form" :model="form" :rules="rules" size="small" label-width="80px">
       <el-form-item label="外部游戏编号" >
        <el-input v-model="form.gameTokenKugou" style="width: 370px;"/>
      </el-form-item>
      <el-form-item label="汽车ID" >
        <el-input v-model="form.carId" style="width: 370px;"/>
      </el-form-item>
       <!--  <el-form-item label="汽车名称" >
        <el-input v-model="form.carName" style="width: 370px;"/>
      </el-form-item>
   <el-form-item label="赔率" >
        <el-input v-model="form.rate" style="width: 370px;"/>
      </el-form-item>
     
     <el-form-item label="游戏局编号" >
        <el-input v-model="form.gameToken" style="width: 370px;"/>
      </el-form-item>
      <el-form-item label="ENDING("4", "结算完成"),SUCCESS("2", "同步数据成功"),NORMAL("1", "初始状态"),	RUNNING("3", "结算中");" >
        <el-input v-model="form.stt" style="width: 370px;"/>
      </el-form-item>
      <el-form-item label="游戏开始时间" >
        <el-input v-model="form.startTime" style="width: 370px;"/>
      </el-form-item>
      <el-form-item label="游戏开奖时间" >
        <el-input v-model="form.awardTime" style="width: 370px;"/>
      </el-form-item>
      <el-form-item label="游戏结束时间" >
        <el-input v-model="form.endTime" style="width: 370px;"/>
      </el-form-item>
      <el-form-item label="创建时间" >
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
import { add, edit } from '@/api/game/syncDataCar'
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
        carId: '',
        carName: '',
        rate: '',
        gameTokenKugou: '',
        gameToken: '',
        stt: '',
        startTime: '',
        awardTime: '',
        endTime: '',
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
        carId: '',
        carName: '',
        rate: '',
        gameTokenKugou: '',
        gameToken: '',
        stt: '',
        startTime: '',
        awardTime: '',
        endTime: '',
        gmtCreate: '',
        gmtModified: ''
      }
    }
  }
}
</script>

<style scoped>

</style>

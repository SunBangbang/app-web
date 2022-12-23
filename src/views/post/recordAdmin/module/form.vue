<template>
  <el-dialog :append-to-body="true" :visible.sync="dialog" :title="isAdd ? '新增' : '编辑'" width="500px">
    <el-form ref="form" :model="form" :rules="rules" size="small" label-width="80px">
      <el-form-item label="代理ID" >
        <el-input v-model="form.agentId" style="width: 370px;"/>
      </el-form-item>
      <el-form-item label="关联用户编号" >
        <el-input v-model="form.uid" style="width: 370px;"/>
      </el-form-item>
      <el-form-item label="怪物ID" >
        <el-input v-model="form.monsterId" style="width: 370px;"/>
      </el-form-item>
      <el-form-item label="怪物名称" >
        <el-input v-model="form.monsterName" style="width: 370px;"/>
      </el-form-item>
      <el-form-item label="投注金额" >
        <el-input v-model="form.amt" style="width: 370px;"/>
      </el-form-item>
      <el-form-item label="余额" >
        <el-input v-model="form.balance" style="width: 370px;"/>
      </el-form-item>
      <el-form-item label="代理密码" >
        <el-input v-model="form.loginPassword" style="width: 370px;"/>
      </el-form-item>
      <el-form-item label="游戏局编号" >
        <el-input v-model="form.gameToken" style="width: 370px;"/>
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
      <el-form-item label="佣金" >
        <el-input v-model="form.commission" style="width: 370px;"/>
      </el-form-item>
      <el-form-item label="返点率" >
        <el-input v-model="form.point" style="width: 370px;"/>
      </el-form-item>
      <el-form-item label="状态" >
        <el-input v-model="form.stt" style="width: 370px;"/>
      </el-form-item>
      <!--<el-form-item label="创建时间" >
        <el-input v-model="form.gmtCreate" style="width: 370px;"/>
      </el-form-item>
      <el-form-item label="修改时间" >
        <el-input v-model="form.gmtModified" style="width: 370px;"/>
      </el-form-item>-->
      <el-form-item label="游戏编号" >
        <el-input v-model="form.gameId" style="width: 370px;"/>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button type="text" @click="cancel">取消</el-button>
      <el-button :loading="loading" type="primary" @click="doSubmit">确认</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { add, edit } from '@/api/game/flowRecord'
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
        monsterId: '',
        monsterName: '',
        amt: '',
        balance: '',
        loginPassword: '',
        gameToken: '',
        startTime: '',
        awardTime: '',
        endTime: '',
        commission: '',
        point: '',
        stt: '',
        gmtCreate: '',
        gmtModified: '',
        gameId: ''
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
        monsterId: '',
        monsterName: '',
        amt: '',
        balance: '',
        loginPassword: '',
        gameToken: '',
        startTime: '',
        awardTime: '',
        endTime: '',
        commission: '',
        point: '',
        stt: '',
        gmtCreate: '',
        gmtModified: '',
        gameId: ''
      }
    }
  }
}
</script>

<style scoped>

</style>

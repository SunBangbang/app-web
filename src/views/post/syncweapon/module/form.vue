<template>
  <el-dialog :append-to-body="true" :visible.sync="dialog" :title="  '修改赔率'" width="500px">
    <el-form ref="form" :model="form" :rules="rules" size="small" label-width="80px">
      <el-form-item label="武器ID" >
        <el-input  disabled="true" v-model="form.weaponId" style="width: 370px;"/>
      </el-form-item>
       <el-form-item label="游戏编号" >
        <el-input v-model="form.gameId" style="width: 370px;"/>
      </el-form-item>
      <el-form-item label="武器名称" >
        <el-input disabled="true" v-model="form.weaponName" style="width: 370px;"/>
      </el-form-item>
      <el-form-item label="攻击怪物" >
        <el-input  disabled="true" v-model="form.attackMonsterId" style="width: 370px;"/>
      </el-form-item>
      <el-form-item label="赔率" >
        <el-input v-model="form.rate" style="width: 370px;"/>
      </el-form-item>
      <el-form-item label="最大金额限制" >
        <el-input v-model="form.amtLimit" style="width: 370px;"/>
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
import { add, edit } from '@/api/game/syncWeapon'
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
        weaponId: '',
        weaponName: '',
        gameId:'',
        attackMonsterId: '',
        rate: '',
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
        weaponId: '',
        weaponName: '',
        gameId:'',
        attackMonsterId: '',
        rate: ''
      }
    }
  }
}
</script>

<style scoped>

</style>

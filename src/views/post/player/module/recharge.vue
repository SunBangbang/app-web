<template>
  <div>
    <el-button size="mini" type="danger" icon="el-icon-edit" @click="to" >
      充值
    </el-button>
    <eForm ref="form" :sup_this="sup_this" :is-add="false"/>
  </div>
</template>
<script>
import eForm from './rechargeForm'
export default {
  components: { eForm },
  props: {
    data: {
      type: Object,
      required: true
    },
    sup_this: {
      type: Object,
      required: true
    }
  },
  methods: {
    to() {
      const _this = this.$refs.form
      _this.form = {
        bizId: this.data.bizId,
        uid: this.data.uid,
        loginId: this.data.loginId,
        uname: this.data.uname,
        type:"0",
        balance: this.data.balance,
      }
      _this.dialog = true
    }
  }
}
</script>

<style scoped>
  div{
    display: inline-block;
    margin-right: 3px;
  }
</style>

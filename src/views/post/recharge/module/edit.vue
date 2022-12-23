<template>
  <div>
    <el-button size="mini" type="primary" icon="el-icon-edit" @click="to"/>
    <eForm ref="form" :sup_this="sup_this" :is-add="false"/>
  </div>
</template>
<script>
import eForm from './form'
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
        orderNo: this.data.orderNo,
        agentId: this.data.agentId,
        uid: this.data.uid,
        alipayId: this.data.alipayId,
        alipayName: this.data.alipayName,
        accountNo: this.data.accountNo,
        accountName: this.data.accountName,
        accountBankName: this.data.accountBankName,
        amt: this.data.amt,
        stt: this.data.stt,
        remark: this.data.remark,
        gmtCreate: this.data.gmtCreate,
        gmtModified: this.data.gmtModified
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

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
        carId: this.data.carId,
        carName: this.data.carName,
        rate: this.data.rate,
        amtLimit: this.data.amtLimit,
        stt: this.data.stt,
        gameId: this.data.gameId,
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

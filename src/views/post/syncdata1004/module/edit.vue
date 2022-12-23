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
        monsterId: this.data.monsterId,
        monsterName: this.data.monsterName,
        fearWeaponId: this.data.fearWeaponId,
        picUrlList: this.data.picUrlList,
        rewardCoin: this.data.rewardCoin,
        attackProb: this.data.attackProb,
        rewardGifts: this.data.rewardGifts,
        gameToken: this.data.gameToken,
        gameTokenKugou:this.data.gameTokenKugou,
        startTime: this.data.startTime,
        awardTime: this.data.awardTime,
        endTime: this.data.endTime,
        gameId: this.data.gameId,
        stt: this.data.stt,
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

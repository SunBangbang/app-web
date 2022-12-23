<template>
  <el-row class="panel-group" :gutter="40">
    <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
      <div class='card-panel' @click="handleSetLineChartData('newVisitis')">
        <div class="card-panel-icon-wrapper icon-people">
          <svg-icon icon-class="peoples" class-name="card-panel-icon" />
        </div>
        <div class="card-panel-description">
          <div class="card-panel-text">总玩家数</div>
          <count-to class="card-panel-num" :startVal="0" :endVal="count.totalNum" :duration="2600"></count-to>
        </div>
      </div>
    </el-col> 
    <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
      <div class='card-panel' @click="handleSetLineChartData('newVisitis')">
        <div class="card-panel-icon-wrapper icon-people">
          <svg-icon icon-class="peoples" class-name="card-panel-icon" />
        </div>
        <div class="card-panel-description">
          <div class="card-panel-text">总余额</div>
          <count-to class="card-panel-num" :startVal="0" :endVal="count.totalAmt" :duration="2600"></count-to>
        </div>
      </div>
    </el-col> 
    
    <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
      <div class='card-panel' @click="handleSetLineChartData('newVisitis')">
        <div class="card-panel-icon-wrapper icon-people">
          <svg-icon icon-class="peoples" class-name="card-panel-icon" />
        </div>
        <div class="card-panel-description">
          <div class="card-panel-text">总盈亏</div>
          <count-to class="card-panel-num" :startVal="0" :endVal="count.totalProfitAndLoss" :duration="2600"></count-to>
        </div>
      </div>
    </el-col> 
    
    <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
      <div class='card-panel' @click="handleSetLineChartData('newVisitis')">
        <div class="card-panel-icon-wrapper icon-people">
          <svg-icon icon-class="peoples" class-name="card-panel-icon" />
        </div>
        <div class="card-panel-description">
          <div class="card-panel-text">手续费</div>
          <count-to class="card-panel-num" :startVal="0" :endVal="count.totalFee" :duration="2600"></count-to>
        </div>
      </div>
    </el-col> 
    <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
      <div class='card-panel' @click="handleSetLineChartData('newVisitis')">
        <div class="card-panel-icon-wrapper icon-people">
          <svg-icon icon-class="peoples" class-name="card-panel-icon" />
        </div>
        <div class="card-panel-description">
          <div class="card-panel-text">提现总额</div>
          <count-to class="card-panel-num" :startVal="0" :endVal="count.withdrawAmt" :duration="2600"></count-to>
        </div>
      </div>
    </el-col> 
    <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
      <div class='card-panel' @click="handleSetLineChartData('newVisitis')">
        <div class="card-panel-icon-wrapper icon-people">
          <svg-icon icon-class="peoples" class-name="card-panel-icon" />
        </div>
        <div class="card-panel-description">
          <div class="card-panel-text">充值总额</div>
          <count-to class="card-panel-num" :startVal="0" :endVal="count.rechargeAmt" :duration="2600"></count-to>
        </div>
      </div>
    </el-col>  
    <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
      <div class='card-panel' @click="handleSetLineChartData('newVisitis')">
         <div class="card-panel-icon-wrapper icon-message">
          <svg-icon icon-class="message" class-name="card-panel-icon" />
        </div>
        <div class="card-panel-description">
          <div class="card-panel-text">在线人数</div>
          <count-to class="card-panel-num" :startVal="0" :endVal="count.totalOnline" :duration="2600"></count-to>
        </div>
      </div>
    </el-col> 
    <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
      <div class='card-panel' @click="handleSetLineChartData('newVisitis')">
        <div class="card-panel-icon-wrapper icon-people">
          <svg-icon icon-class="peoples" class-name="card-panel-icon" />
        </div>
        <div class="card-panel-description">
          <div class="card-panel-text">今日新增人数</div>
          <count-to class="card-panel-num" :startVal="0" :endVal="count.totalDaily" :duration="2600"></count-to>
        </div>
      </div>
    </el-col>  
    <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
      <div class='card-panel' @click="handleSetLineChartData('messages')">
        <div class="card-panel-icon-wrapper icon-people">
          <svg-icon icon-class="peoples" class-name="card-panel-icon" />
        </div>
        <div class="card-panel-description">
          <div class="card-panel-text">今日提现总额</div>
          <count-to class="card-panel-num" :startVal="0" :endVal="count.withdrawAmtDaily" :duration="2600"></count-to>
        </div>
      </div>
    </el-col> 
    <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
      <div class='card-panel' @click="handleSetLineChartData('purchases')">
        <div class="card-panel-icon-wrapper icon-people">
          <svg-icon icon-class="peoples" class-name="card-panel-icon" />
        </div>
        <div class="card-panel-description">
          <div class="card-panel-text">今日充值总额</div>
          <count-to class="card-panel-num" :startVal="0" :endVal="count.rechargeAmtDaily" :duration="2600"></count-to>
        </div>
      </div>
    </el-col>  
    <!--
    <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
      <div class='card-panel' @click="handleSetLineChartData('purchases')">
        <div class="card-panel-icon-wrapper icon-people">
          <svg-icon icon-class="peoples" class-name="card-panel-icon" />
        </div>
        <div class="card-panel-description">
          <div class="card-panel-text">转账总额</div>
          <count-to class="card-panel-num" :startVal="0" :endVal="count.transferAmt" :duration="2600"></count-to>
        </div>
      </div>
    </el-col> 
    
    <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
      <div class='card-panel' @click="handleSetLineChartData('purchases')">
        <div class="card-panel-icon-wrapper icon-people">
          <svg-icon icon-class="peoples" class-name="card-panel-icon" />
        </div>
        <div class="card-panel-description">
          <div class="card-panel-text">今日转账总额</div>
          <count-to class="card-panel-num" :startVal="0" :endVal="count.transferAmtDaily" :duration="2600"></count-to>
        </div>
      </div>
    </el-col> 
    -->
    <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
      <div class='card-panel' @click="handleSetLineChartData('purchases')">
        <div class="card-panel-icon-wrapper icon-people">
          <svg-icon icon-class="peoples" class-name="card-panel-icon" />
        </div>
        <div class="card-panel-description">
          <div class="card-panel-text">减分总额</div>
          <count-to class="card-panel-num" :startVal="0" :endVal="count.minusAmt" :duration="2600"></count-to>
        </div>
      </div>
    </el-col> 
    
    <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
      <div class='card-panel' @click="handleSetLineChartData('purchases')">
        <div class="card-panel-icon-wrapper icon-people">
          <svg-icon icon-class="peoples" class-name="card-panel-icon" />
        </div>
        <div class="card-panel-description">
          <div class="card-panel-text">今日减分总额</div>
          <count-to class="card-panel-num" :startVal="0" :endVal="count.minusAmtDaily" :duration="2600"></count-to>
        </div>
      </div>
    </el-col> 
     <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
      <div class='card-panel' @click="handleSetLineChartData('purchases')">
        <div class="card-panel-icon-wrapper icon-people">
          <svg-icon icon-class="peoples" class-name="card-panel-icon" />
        </div>
        <div class="card-panel-description">
          <div class="card-panel-text">送分总额</div>
          <count-to class="card-panel-num" :startVal="0" :endVal="count.rechargeAmtRate" :duration="2600"></count-to>
        </div>
      </div>
    </el-col> 
     <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
      <div class='card-panel' @click="handleSetLineChartData('purchases')">
        <div class="card-panel-icon-wrapper icon-people">
          <svg-icon icon-class="peoples" class-name="card-panel-icon" />
        </div>
        <div class="card-panel-description">
          <div class="card-panel-text">今日送分总额</div>
          <count-to class="card-panel-num" :startVal="0" :endVal="count.rechargeAmtRateDaily" :duration="2600"></count-to>
        </div>
      </div>
    </el-col> 
  </el-row>
</template>

<script>
import CountTo from 'vue-count-to'
import { summary } from '@/api/game/player'
export default {
  components: {
    CountTo
  },
  data() {
    return {
      websock:null,
    count : {
        totalOnline : 0,
        totalOffline : 0,
        totalNum : 0,
        totalDaily : 0,
        betAmt : 0,
        betAmtDaily : 0,
        winAmt : 0,
        winDaily : 0,
        totalFee: 0,
        totalAmt: 0,
        totalProfitAndLoss: 0,
        loseAmt : 0,
        loseDaily : 0,
        withdrawAmt : 0,
        withdrawAmtDaily : 0,
        rechargeAmt : 0,
        rechargeAmtDaily : 0,
        rechargeAmtRate : 0,
        rechargeAmtRateDaily : 0,
        minusAmt : 0,
        minusAmtDaily : 0,
        transferAmt : 0,
        transferAmtDaily : 0
      }
    }
  },
  mounted() { 
    const time1 = new Date()
    summary({"type":4}).then(res => {  
      
      this.count.totalOnline=res.totalOnline
      this.count.totalOffline=res.totalOffline
      
      this.count.totalNum=res.totalNum
      this.count.totalDaily=res.totalDaily
      
      this.count.betAmt=res.betAmt
      this.count.betAmtDaily=res.betAmtDaily
      this.count.winAmt=res.winAmt
      this.count.winDaily=res.winDaily
      
      this.count.loseAmt=res.loseAmt
      this.count.loseDaily=res.loseDaily
      this.count.withdrawAmt=res.withdrawAmt
      this.count.withdrawAmtDaily=res.withdrawAmtDaily
      this.count.rechargeAmt=res.rechargeAmt
      this.count.rechargeAmtDaily=res.rechargeAmtDaily
      this.count.rechargeAmtRate=res.rechargeAmtRate
      this.count.rechargeAmtRateDaily=res.rechargeAmtRateDaily
      this.count.minusAmt=res.minusAmt
      this.count.minusAmtDaily=res.minusAmtDaily
      this.count.transferAmt=res.transferAmt
      this.count.transferAmtDaily=res.transferAmtDaily
      this.count.totalAmt=res.totalAmt
      this.count.totalProfitAndLoss=res.totalProfitAndLoss
      this.count.totalFee=res.totalFee 
      
    }) 
  },
  methods: {
    handleSetLineChartData(type) {
      this.$emit('handleSetLineChartData', type)
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.panel-group {
  margin-top: 18px;
  .card-panel-col{
    margin-bottom: 32px;
  }
  .card-panel {
    height: 108px;
    cursor: pointer;
    font-size: 12px;
    position: relative;
    overflow: hidden;
    color: #666;
    background: #fff;
    box-shadow: 4px 4px 40px rgba(0, 0, 0, .05);
    border-color: rgba(0, 0, 0, .05);
    &:hover {
      .card-panel-icon-wrapper {
        color: #fff;
      }
      .icon-people {
         background: #40c9c6;
      }
      .icon-message {
        background: #36a3f7;
      }
      .icon-money {
        background: #f4516c;
      }
      .icon-shoppingCard {
        background: #34bfa3
      }
    }
    .icon-people {
      color: #40c9c6;
    }
    .icon-message {
      color: #36a3f7;
    }
    .icon-money {
      color: #f4516c;
    }
    .icon-shoppingCard {
      color: #34bfa3
    }
    .card-panel-icon-wrapper {
      float: left;
      margin: 14px 0 0 14px;
      padding: 16px;
      transition: all 0.38s ease-out;
      border-radius: 6px;
    }
    .card-panel-icon {
      float: left;
      font-size: 48px;
    }
    .card-panel-description {
      float: right;
      font-weight: bold;
      margin: 26px;
      margin-left: 0px;
      .card-panel-text {
        line-height: 18px;
        color: rgba(0, 0, 0, 0.45);
        font-size: 16px;
        margin-bottom: 12px;
      }
      .card-panel-num {
        font-size: 20px;
      }
    }
  }
}
</style>

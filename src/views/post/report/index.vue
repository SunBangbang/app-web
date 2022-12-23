<template>
  <div class="app-container">
    <eHeader1 :query="query"/>
    <!--表格渲染-->
    <!--
    <el-row>
      <el-col> 
          <pie-chart :dataChart="reportFlowOutData"/> 
      </el-col>
      <el-col> 
          <pie-chart :dataChart="reportFlowInData"/> 
      </el-col>
    </el-row>-->
    <el-row>
      
      <el-col :span="8">
        <el-table v-loading="loading" :data="reportFlowInData" size="small" style="width: 100%;">
          <el-table-column prop="remark" label="类型"/>   
          <el-table-column label="金额">
            <template slot-scope="scope">
              <el-tag >{{ scope.row.amt_in }}</el-tag> 
            </template>
          </el-table-column> 
        </el-table>
      </el-col>
      <el-col :span="8">
        <el-table v-loading="loading" :data="reportFlowOutData" size="small" style="width: 100%;">
          <el-table-column prop="remark" label="类型"/>   
          <el-table-column label="金额">
            <template slot-scope="scope"> 
              <el-tag type="warning">{{ scope.row.amt_out }}</el-tag>
            </template>
          </el-table-column> 
        </el-table>
      </el-col>
      <el-col :span="8">
        <el-table v-loading="loading" :data="reportFlowPayData" size="small" style="width: 100%;">
          <el-table-column prop="remark" label="类型"/>   
          <el-table-column label="金额">
            <template slot-scope="scope"> 
              <el-tag type="warning">{{ scope.row.amt_in }}</el-tag>
            </template>
          </el-table-column> 
        </el-table>
      </el-col>
    </el-row>

     <el-row> 
      <el-col :span="7">
        <el-table v-loading="loading" :data="reportFlowWithrawData" size="small" style="width: 100%;">
          <el-table-column prop="amt_date" label="日期">   
            <template slot-scope="scope">
              <span>{{ parseTime(scope.row.amt_date) }}</span>
            </template>
          </el-table-column>
          <el-table-column label="提现金额">
            <template slot-scope="scope">
              <el-tag >{{ scope.row.amt }}</el-tag> 
            </template>
          </el-table-column>  
        </el-table>
      </el-col>
      <el-col :span="7">
        <el-table v-loading="loading" :data="reportFlowRechargeData" size="small" style="width: 100%;">
           <el-table-column prop="amt_date" label="日期">   
            <template slot-scope="scope">
              <span>{{ parseTime(scope.row.amt_date) }}</span>
            </template>
          </el-table-column>
          <el-table-column label="充值金额">
            <template slot-scope="scope"> 
              <el-tag type="warning">{{ scope.row.amt }}</el-tag>
            </template>
          </el-table-column>  
        </el-table>
      </el-col> 
      <el-col :span="10">
        <el-table v-loading="loading" :data="reportFlowAgentData" size="small" style="width: 100%;">
           <el-table-column prop="amt_date" label="日期">   
            <template slot-scope="scope">
              <span>{{ parseTime(scope.row.amt_date) }}</span>
            </template>
          </el-table-column>
          <el-table-column label="盈亏">
            <template slot-scope="scope"> 
              <el-tag>{{ scope.row.amt_in }}</el-tag>
            </template>
          </el-table-column>  
             <el-table-column label="佣金">
            <template slot-scope="scope"> 
              <el-tag type="warning">{{ scope.row.amt_commission }}</el-tag>
            </template>
          </el-table-column>  
        </el-table>
      </el-col> 
    </el-row>
  </div>
</template>
 
<script>
import checkPermission from '@/utils/permission'
import initData from '@/mixins/initData'
import { del } from '@/api/game/flowGame'
import { reportPlayerFlow,reportAgentFlow,reportFlowDetail,reportFlow } from '@/api/game/report'
import { parseTime } from '@/utils/index' 
import eHeader1 from './module/header' 
export default {
  components: { eHeader1 },
  mixins: [initData],
  data() {
    return {
      reportFlowInData:[],
      reportFlowOutData:[],
      reportFlowPayData:[],
      reportFlowWithrawData:[],
      reportFlowRechargeData:[],
      reportFlowAgentData:[],
      loading: false, sup_this: this
    }
  },
  created() { 

  },
  methods: {
    parseTime,
    checkPermission, 
    reportFlow() {
      this.loading = true
      this.params["startDate"] = this.query.startDate  
      this.params["endDate"] = this.query.endDate
      this.params["uid"] = this.query.uid
      this.params["loginId"] = this.query.loginId
      reportFlow(this.query).then(res => { 
        this.reportFlowInData = res.in_data;
        this.reportFlowOutData = res.out_data;
        this.reportFlowPayData=res.pay_data;
        this.reportFlowWithrawData = res.withrawList;
        this.reportFlowRechargeData=res.rechargeList;
        this.reportFlowAgentData = res.listAgent;
          this.loading = false
      }).catch(err => { 
        console.log(err.response.data.message)
         this.loading = false
      })
    }
  }
}
</script>

<style scoped>

</style>

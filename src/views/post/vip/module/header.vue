<template>
  <div class="head-container">
   
     <el-button class="filter-item" size="mini" type="success" icon="el-icon-search" @click="setBetOpen">开放下注</el-button>
     <el-button class="filter-item" size="mini" type="warning" icon="el-icon-search" @click="setBetClose">关闭下注</el-button>
   
  </div>
</template>

<script>
import eForm from './form'
import { setBetOpen, setBetClose} from '@/api/game/params'
export default {
  components: { eForm },
  props: {
    query: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      queryTypeOptions: [
        { key: 'paramKey', display_name: '参数KEY' },
        { key: 'paramName', display_name: '参数名称' }
      ]
    }
  },
  methods: {
    toQuery() {
      this.$parent.page = 0
      this.$parent.init()
    },
    setBetOpen() {
       setBetOpen({}).then(res => { 
        this.$notify({
          title: '开放成功',
          type: 'success',
          duration: 2500
        }) 
      }).catch(err => { 
        console.log(err.response.data.message)
      })
    },
    setBetClose() {
       setBetClose({}).then(res => { 
        this.$notify({
          title: '关闭成功',
          type: 'success',
          duration: 2500
        }) 
      }).catch(err => { 
        console.log(err.response.data.message)
      })
    }   
  }
}
</script>

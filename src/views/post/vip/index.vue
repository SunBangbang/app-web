<template>
  <div class="app-container">
    <eHeader :query="query"/> 
      
  </div>
</template>

<script>
import checkPermission from '@/utils/permission'
import initData from '@/mixins/initData'
import { del } from '@/api/game/params'
import { parseTime } from '@/utils/index'
import eHeader from './module/header'
import edit from './module/edit'
export default {
  components: { eHeader, edit },
  mixins: [initData],
  data() {
    return {
      delLoading: false, sup_this: this
    }
  },
  created() {
 
  },
  methods: {
    parseTime,
    checkPermission     
  }
}
</script>

<style scoped>

</style>

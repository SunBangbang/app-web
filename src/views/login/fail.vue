<template>
  <div class="errPage-container">
    <el-row>
      <el-col :span="12">
        <h1 class="text-jumbo text-ginormous"> </h1>
         
        <ul class="list-unstyled"> 
          <li class="link-type">
              <p style="padding-top:200px;"> 支付失败！ 您的订单号<span>{{orderid}}</span> <BR />
			</p>
			<p>
			  任何问题请联系客服 :<a style="front-size:14px;" href='https://temp-chat.mstatik.com/widget/standalone.html?eid=206393'>酷我繁星</a>
			</p>
          </li>
          
        </ul>
      </el-col> 
    </el-row> 
  </div>
</template>

<script>
import errGif from '@/assets/401_images/401.gif'

export default {
  name: 'Page401',
  data() {
    return {
   
       orderid:"" 
    }
  },
   created() { 
     debugger
    const order = this.getUrlKey("orderId",window.location.href)
     this.orderid=order;
  },
  methods: {
        getUrlKey(name,url){
		　　return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(url) || [, ""])[1].replace(/\+/g, '%20')) || null
		}
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .errPage-container {
    width: 600px;
    max-width: 100%;
    margin: 100px auto;
    .pan-back-btn {
      background: #008489;
      color: #fff;
      border: none!important;
    }
    .pan-gif {
      margin: 0 auto;
      display: block;
    }
    .pan-img {
      display: block;
      margin: 0 auto;
      width: 100%;
    }
    .text-jumbo {
      font-size: 60px;
      font-weight: 700;
      color: #484848;
    }
    .list-unstyled {
      font-size: 14px;
      li {
        padding-bottom: 5px;
      }
      a {
        color: #008489;
        text-decoration: none;
        &:hover {
          text-decoration: underline;
        }
      }
    }
  }
</style>

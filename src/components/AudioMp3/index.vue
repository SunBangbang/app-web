<template>

  <audio id="successpay" autoplay="autoplay">
  <source id="tts_source_id"  src="./tips.mp3" type="audio/mpeg">
  </audio>
</template>

<script>
export default {
    data () {
        return {
            path:"ws://1.14.148.118:8001/",
            socket:"",
            lockReconnect: false,//是否真正建立连接
            timeout: 28*1000,//30秒一次心跳
            timeoutObj: null,//心跳心跳倒计时
            serverTimeoutObj: null,//心跳倒计时
            timeoutnum: null,//断开 重连倒计时
            lastRunTime: Date.now(),//上次播放声音的时间
            params:{
              "cmd": "56",
              "gameToken": "",
              "token": "0",
              "uid": 0
            } ,
            result:""
        }
    },
    mounted () {
        // 初始化
        this.initWebSocket()
    },
    methods: {
        tipsMp3(){
            var ttsAudio = document.getElementById('successpay');
            try{
                ttsAudio.play();
            }catch(e){
                console.log(e)
            }
        },
        initWebSocket: function () {
            if(typeof(WebSocket) === "undefined"){
                alert("您的浏览器不支持socket")
            }else{
                // 实例化socket
                this.socket = new WebSocket(this.path)
                // 监听socket连接
                this.socket.onopen = this.open
                // 监听socket错误信息
                this.socket.onerror = this.error
                // 监听socket消息
                this.socket.onmessage = this.getMessage

            }
        },
        reconnect() {//重新连接
            var that = this;
            if(that.lockReconnect) {
                return;
            };
            that.lockReconnect = true;
            //没连接上会一直重连，设置延迟避免请求过多
            that.timeoutnum && clearTimeout(that.timeoutnum);
            that.timeoutnum = setTimeout(function () {
                //新连接
                that.initWebSocket();
                that.lockReconnect = false;
            },5000);
        },
        reset(){//重置心跳
            var that = this;
            //清除时间
            clearTimeout(that.timeoutObj);
            clearTimeout(that.serverTimeoutObj);
            //重启心跳
            that.start();
        },
        start:function(){
            var self = this;
            self.timeoutObj && clearTimeout(self.timeoutObj);
            self.serverTimeoutObj && clearTimeout(self.serverTimeoutObj);
            self.timeoutObj = setTimeout(function(){
                //这里发送一个心跳，后端收到后，返回一个心跳消息，
                if (self.socket.readyState == 1) {//如果连接正常
                    self.socket.send("heartCheck");
                }else{//否则重连
                    self.reconnect();
                }
                self.serverTimeoutObj = setTimeout(function() {
                    //超时关闭
                    self.socket.close();
                }, self.timeout);

            }, self.timeout)
        },
        open: function () {
            console.log("socket连接成功")
            this.send();
            this.start();
        },
        error: function () {
            console.log("连接错误")
            this.reconnect();
        },
        getMessage: function (msg) {
            this.reset();
            console.log("data:"+msg.data)
            if(msg.data ===undefined){
                console.log("msg.data.uid:"+msg.data)
                return;
            }
            const result = JSON.parse(msg.data);
            if(result === null || result.data.uid ===undefined ){
                console.log("result.uid:"+result.data)
                return
            }

            this.tipsMp3()
        },
        send: function () {
            console.log("params:"+this.params)
            this.socket.send(JSON.stringify(this.params))
        },
        close: function () {
            console.log("socket已经关闭")
            this.reconnect()
        }
    },
    destroyed () {
        // 销毁监听
        this.socket.onclose = this.close
    }
}
</script>

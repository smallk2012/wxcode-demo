const app = getApp()

Page({
    data: {
        motto: 'Hello World',
        msg:''
    },
    onLoad: function(opt) {
        console.log(this)
        console.log('onLoad')
    },
    onShow: function (opt) {
        console.log('onShow')
    },
    pageInit(){
        this.aaa()
    },
    aaa(){
        console.log(this)
    }
})
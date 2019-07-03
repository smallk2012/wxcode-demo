require('./api/app/axios.js')
require('./api/app/local.js')
require('./api/app/log.js')
require('./api/app/toast.js')
require('./api/app/route.js')
require('./api/app/login.js')
require('./api/page/index.js')

App({
    onLaunch: function(opt) {
        let _this = this
        const updateManager = wx.getUpdateManager()
        updateManager.onCheckForUpdate(function(res) {
            // 请求完新版本信息的回调
            _this.log(res)
        })
        updateManager.onUpdateReady(function() {
            wx.showModal({
                title: '更新提示',
                content: '新版本已经准备好，是否重启应用？',
                success: function(res) {
                    if (res.confirm) {
                        // 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
                        updateManager.applyUpdate()
                    }
                }
            })
        })
        updateManager.onUpdateFailed(function() {
            // 新版本下载失败
            _this.toast('更新失败')
        })
    },
    globalData: {
        code: '',
        userInfo: {}
    },
    config: require('./config.js')
})
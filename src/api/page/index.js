var basePage = Page
Page = function(page) {
    let _app = getApp()
    let _this = null
    let _inited = false
    let _data = {
        opt: {},
        showAuth: false,
        inited: false,
        isloading: false,
        isend: false,
        pageNum: 1,
        pageTotal: 0,
        pageSize: 10,
        list: []
    }
    Object.assign(page.data, _data)
    const getUserInfo = () => {
        wx.getSetting({
            success: (res) => {
                if (res.authSetting['scope.userInfo']) {
                    wx.getUserInfo({
                        lang: 'zh_CN',
                        success: (data) => {
                            _app.log('获取用户信息成功')
                            _app.userLogin(data).then(res=>{
                                page.setData({
                                    showAuth: false
                                })
                                page.pageInit && page.pageInit()
                            },res=>{
                                _app.toast(res.msg)
                            })
                        },
                        fail: (e) => {
                            _app.log('获取用户信息失败')
                            jumpToAuth()
                        }
                    })
                } else {
                    _app.log('用户信息未授权')
                    jumpToAuth()
                }
            },
            fail: (e) => {
                _app.log('获取授权失败')
                jumpToAuth()
            }
        })
    }
    const jumpToAuth = () => {
        if (_app.config.loginPagePath) {
            _app.jumpTo(_app.config.loginPagePath)
        } else {
            _this.setData({
                showAuth: true
            })
        }
    }

    page.checkLogin = () => {
        if (_app.config.unpage.indexOf(_this.route) != -1) {
            _app.log('不需要登录')
            page.pageInit && page.pageInit()
        } else {
            _app.log('开始登陆')
            let _token = _app.local.get(_app.config.tokenName)
            if (_token) {
                _app.log('已登陆')
                page.pageInit && page.pageInit()
            } else {
                wx.login({
                    success: res => {
                        _app.log('wxlogin登陆成功')
                        if (res.code) {
                            _app.globalData.code = res.code
                            getUserInfo()
                        } else {
                            _app.toast('code失败')
                        }
                    },
                    fail: (e) => {
                        _app.toast('wxlogin失败')
                    }
                })
            }
        }
    }

    page.onLoad = function(opt) {
        _this = this
        _this.setData({
            opt: opt
        })
        _inited = true
        page.checkLogin()
    }
    page.onShow = function() {
        //页面打开的时候只会执行onLoad
        if (_inited) return
        page.checkLogin()
    }
    page.onHide = function () {
        _inited = false
    }
    let _pageInit = page.pageInit
    page.pageInit = function(){
        _pageInit && _pageInit.apply(_this, arguments)
    }
    basePage.apply(this, arguments)
}
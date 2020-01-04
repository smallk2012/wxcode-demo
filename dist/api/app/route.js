var baseApp = App
App = function(app) {
    app.jumpTo = (page, params = {}, jumpType = 0) => {
        let _params = ""
        for (let o in params) {
            _params += o + '=' + params[o] + '&'
        }
        _params = _params.length > 0 ? ('?' + _params.substring(0, _params.length - 1)) : ''
        let _page = page + _params
        switch (jumpType) {
            case 1:
                wx.switchTab({
                    url: _page
                })
                break
            case 2:
                wx.redirectTo({
                    url: _page
                })
                break
            case 3:
                wx.reLaunch({
                    url: _page
                })
                break
            default:
                wx.navigateTo({
                    url: _page
                })
                break
        }
    }
    app.back = (delta = 1)=>{
        wx.navigateBack({
            delta: delta
        })
    }
    baseApp.apply(this, arguments);
}
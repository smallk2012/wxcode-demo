var baseApp = App
App = function(app) {
    let _logining = false
    const apiAxios = (method, url, params = {}) => {
        return new Promise((resolve, reject) => {
            let _url = app.config.baseUrl + url + (app.config.mock ? '.json' : '')
            params.loading = params.loading == undefined ? true : params.loading
            if (params.loading) wx.showLoading()
            //loading不属于参数,这里过滤掉
            let _params = {}
            for (let o in params) {
                switch (o) {
                    case 'loading':
                        break;
                    default:
                        _params[o] = params[o]
                        break;
                }
            }
            let _header = {
                'content-type': method == 'GET' ? 'application/json' : 'application/x-www-form-urlencoded'
            }
            if(app.config.tokenName) _header[app.config.tokenName] = app.local.get(app.config.tokenName)

            let _log = "————————————————————————————————————————————————————————————\n"
            _log += "请求的方法：" + method + "\n"
            _log += "请求的链接：" + _url + "\n"
            _log += "请求的参数：" + JSON.stringify(_params) + "\n"
            _log += "————————————————————————————————————————————————————————————\n"

            wx.request({
                url: _url,
                data: _params,
                method: method,
                header: _header,
                complete: (res) => {
                    if (params.loading) wx.hideLoading()
                    _log += JSON.stringify(res.data)
                    _log += "\n————————————————————————————————————————————————————————————\n"
                    app.log(_log)
                    if (res.data && res.data.code) {
                        if (res.data.code === 200){
                            resolve(res.data)
                        } else if (res.data.code == 14007){
                            if (!_logining) {
                                app.log('token过期')
                                _logining = true
                                app.local.del(app.config.tokenName)
                                let _pages = getCurrentPages()
                                let _page = _pages.length > 0 ? _pages[_pages.length - 1] : {}
                                _page.checkLogin && _page.checkLogin()
                            }
                            reject(res.data)
                        }
                        else{
                            reject(res.data)
                        }
                    } else {
                        let _obj = {
                            code: 404,
                            msg: '数据异常' + res.statusCode,
                            data: ''
                        }
                        reject(_obj)
                    }
                }
            })
        })
    }
    app.axios = {
        get: (url, params) => {
            return apiAxios('GET', url, params)
        },
        post: (url, params) => {
            return apiAxios('POST', url, params)
        }
    }
    baseApp.apply(this, arguments);
}
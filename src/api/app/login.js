var baseApp = App
App = function(app) {
    app.userLogin = (params) => {
        return new Promise((resolve, reject) => {
            let _params = {
                js_code: app.globalData.code,
                rawData: params.rawData,
                signature: params.signature,
                encryptedData: params.encryptedData,
                iv: params.iv
            }
            app.axios.post('star/user/wxLogin', _params).then(res => {
                app.log('用户登录成功')
                app.local.set(app.config.tokenName, res.data.token || '')
                app.globalData.userInfo = res.data
                resolve(res)
            }, res => {
                reject(res)
            })
        })
    }
    baseApp.apply(this, arguments);
}
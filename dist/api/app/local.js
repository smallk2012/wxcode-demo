var baseApp = App
App = function(app) {
    app.local = {
        get: (key) => {
            return wx.getStorageSync(key) || ''
        },
        set: (key, value) => {
            wx.setStorageSync(key, value)
        },
        del: (key) => {
            wx.removeStorageSync(key)
        },
        clear: () => {
            wx.clearStorageSync()
        }
    }
    baseApp.apply(this, arguments);
}
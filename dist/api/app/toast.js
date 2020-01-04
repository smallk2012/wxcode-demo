var baseApp = App
App = function(app) {
    app.toast = (title, icon = "none") => {
        title = Object.prototype.toString.call(title) == '[object Array]' ? title.toString() : title
        setTimeout(() => {
            wx.showToast({
                title: title,
                icon: icon,
                mask: true,
                duration: 1500
            })
        }, 10)
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve()
            }, 1500);
        })
    }
    baseApp.apply(this, arguments);
}
var baseApp = App
App = function(app) {
    app.log = (...v) => {
        if (app.config.debug) {
            console.log.apply(console, v)
        }
    }
    baseApp.apply(this, arguments);
}
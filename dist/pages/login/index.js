const app = getApp()
Page({
    data: {

    },
    pageInit(){
        console.log('xxx')
    },
    onGotUserInfo(e){
        if (e.detail.errMsg == 'getUserInfo:ok'){
            app.userLogin(e.detail).then(() => {
                app.back()
            })
        }
    }
})
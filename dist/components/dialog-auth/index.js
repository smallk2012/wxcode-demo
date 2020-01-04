const app = getApp()
Component({
    properties: {

    },
    data: {

    },
    methods: {
        onGotUserInfo(e) {
            if (e.detail.errMsg == 'getUserInfo:ok') {
                app.userLogin(e.detail).then(()=>{
                    console.log('1112')
                })
            }
        }
    }
})

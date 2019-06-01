// import $http from './http'
import $router from '../router'


// 公用函数区域
export default {
    // 增加cookie
    addCookie(name, value, days, path) {
        var name = escape(name);
        var value = escape(value);
        var expires = new Date();
        expires.setTime(expires.getTime() + 10 * 3600000 * 24);
        path = path == ("" || undefined) ? "/" : ";path=" + path;
        var _expires = (typeof days) == "string" ? "" : ";expires=" + expires.toUTCString();
        document.cookie = name + "=" + value + _expires + path;
    },

    // 取出cookie
    getCookieValue(name) {
        var name = escape(name);
        var allcookies = document.cookie;
        name += "=";
        var pos = allcookies.indexOf(name);
        //如果找到了具有该名字的cookie，那么提取并使用它的值
        if (pos != -1) {
            var start = pos + name.length;
            var end = allcookies.indexOf(";", start);
            if (end == -1)
                end = allcookies.length;
            var value = allcookies.substring(start, end);
            // console.log(name + value)
            return (unescape(value));
        } else { //搜索失败，返回空字符串
            return "";
        }
    },

    // 删除cookie
    deleteCookie(name, path) {
        var name = escape(name);
        var expires = new Date(0);
        path = path == ("" || undefined) ? "/" : ";path=" + path;
        document.cookie = name + "=" + ";expires=" + expires.toUTCString() + path;
    },


    

    // 取出 cookie Token
    getTokenCookie(name) {

        var name = escape(name);
        var allcookies = document.cookie;
        name += "=";
        var pos = allcookies.indexOf(name);
        //如果找到了具有该名字的cookie，那么提取并使用它的值
        if (pos != -1) {
            var start = pos + name.length;
            var end = allcookies.indexOf(";", start);
            if (end == -1)
                end = allcookies.length;
            var value = allcookies.substring(start, end);
            // console.log('有cookie')
            return (unescape(value));
        }else { //搜索失败，返回空字符串
            // console.log('无cookie')

            window.$Mint2.MessageBox.confirm('',{

                message: '登录已过期是否重新登录',
                title: '提示',
                confirmButtonText: '确定', 
                cancelButtonText: '取消' ,
                closeOnClickModal: false,
                }).then(res => {
                    if(res == 'confirm') {
                        $router.push('login');
                    }
                }).catch(err => {
                    if(err == 'cancel') {
                }
            });
            return ''
        }
    },



    //封装token过期控制代码
    /* 
        存token 
        key : 存储的名称
        value : 需要存储的值
    */
    setToken(key, value) {
        var curTime = new Date().getTime() / 1000;
        localStorage.setItem(key, JSON.stringify({
            data: value,
            time: curTime
        }));
        // console.log(JSON.stringify({data:value,time:curTime}))
    },

    /* 
        取token 
        key : 存储的名称
        exp : 需要设置过期的时间 (秒)
    */
    getToken(key, exp) {
        var data = localStorage.getItem(key);
        var dataObj = JSON.parse(data);

        if(dataObj){ //有token的情况下

            if (new Date().getTime() / 1000 - dataObj.time > exp) {
                
                window.$Mint2.MessageBox.confirm('',{
                    message: '登录已过期是否重新登录',
                    title: '提示',
                    confirmButtonText: '确定', 
                    cancelButtonText: '取消' ,
                    closeOnClickModal: false,
                    }).then(res => {
                        if(res == 'confirm') {
                            $router.push('login');
                        }
                    }).catch(err => {
                        if(err == 'cancel') {
                    }
                })
    
                var Token = dataObj.data
                return Token

            } else {
                var aa = dataObj.data
                return aa
            }
        }else{
            //没有token时
            $router.push('login');
            
        }
    },




    // 存值到localstorage中
    addLocalStorage(key, value) {
        let obj = localStorage.getItem(key);
        if (obj) {
            localStorage.removeItem(key);
            localStorage.setItem(key, JSON.stringify(value));
        } else {
            localStorage.setItem(key, JSON.stringify(value));
        }
    },


    // 取值localstorage
    getLocalStorage(key) {
        return JSON.parse(localStorage.getItem(key));
    },

    // 删除LocalStorage中的值
    rmLocalStorage(key) {
        localStorage.removeItem(key);
    },

    // 判定是否微信浏览器
    isWechatBrowerHandle() {
        let ua = navigator.userAgent.toLowerCase();
        if (ua.indexOf('micromessenger') != -1) {
            return true;
        } else {
            return false;
        }
    },

    //时间戳
    getTimestamp() {
        var timestamp = Date.parse(new Date());
        timestamp = timestamp / 1000;
        return timestamp;
    },


    // 存值到sessionstorage中
    addSessionStorage(key, value) {
        let obj = sessionStorage.getItem(key);
        if (obj) {
            sessionStorage.removeItem(key);
            sessionStorage.setItem(key, JSON.stringify(value));
        } else {
            sessionStorage.setItem(key, JSON.stringify(value));
        }
    },

    // 取sessionstorage值
    getSessionStorage(key,cb) {
        if(key == 'userInfo'&& cb){
            $http.get('nowLoginInfo').then(res=>{
                if(res.data.state){
                    cb(res.data.sub_user)
                }
            });
        }else{
            return JSON.parse(sessionStorage.getItem(key));
        }
    },

    // 删除sessionStorage中的值
    rmSessionStorage(key) {
        sessionStorage.removeItem(key);
    },

    //封装搜索功能
    /* 
    searchContant: 搜索的内容 string
    searchApi：搜索请求的api string
    localKey: 如果保存搜索历史，需要存入localstorage的key string
    cb: 回调函数
     */
    search(searchContant, searchApi, localKey, cb) {
        if (searchContant !== '') {
            $http.get(searchApi, {
                params: searchContant
            }).then(res => {
                if (res.data.status) cb(res);
            }).catch(error => {
                console.log(error)
            })
            //保存搜索历史
            if (localKey) {
                let searchHistory;
                if (this.getLocalStorage(localKey) !== null) {
                    searchHistory = this.getLocalStorage(localKey);
                    searchHistory.push(searchContant);
                } else {
                    searchHistory = [];
                    searchHistory.push(searchContant);
                }
                for (let item in searchHistory) {
                    let index = searchHistory.indexOf(searchHistory[item]);
                    let lastIndex = searchHistory.lastIndexOf(searchHistory[item]);
                    if (index !== lastIndex) searchHistory.splice(index, 1);
                }
                this.addLocalStorage(localKey, searchHistory)
            }
        } else {
            Toast('请输入搜索内容');
        }
    },

    //touchstar变颜色，touchend恢复
    // touch(selector) {
    //     selector.ontouchstart = function() {
    //         selector.style.color = '#665334';
    //     }
    //     selector.ontouchend = function() {
    //         selector.style.color = '#CDA668';            
    //     }
    // },

    //封装多选功能
    /* 
    index: 索引值 string
    curArr：空数组，push选中索引，变成未筛选数组 Array
    */
    multiSelect(index, curArr) {
        curArr.push(index);
        let newArr = []; //用来放遍历筛选后的数组
        for (let item in curArr) {
            if (curArr.indexOf(curArr[item]) == curArr.lastIndexOf(curArr[item])) {
                newArr.push(curArr[item])
            }
        }
        return curArr = newArr;
    },

    //增加check_state
    addCheckState(checkArr) {
        checkArr.forEach(item => {
            item.check_state = false;
        
               
           
        })
    }

}
/* 
    设置api接口域名
*/

let apiUrl = ''

//根据process.env.HOST判断当前是什么环境
//命令 run build --test，process.env.HOST就设置微test
let HOST = process.env.HOST


apiUrl = 'http://api.' + HOST + '.demo.com'

console.log('环境域名', apiUrl)

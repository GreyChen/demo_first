<template>
  <div id="app">
    <!-- <img src="./assets/logo.png"> -->
    <router-view/>
  </div>
</template>

<script>
import './assets/reset.css'

export default {
  name: 'App',
  data() {
    return {

    }
  },
  mounted() {

    console.log('process', process)
    var u = navigator.userAgent, app = navigator.appVersion;
            var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Linux') > -1; //g
            var isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
            /* if (isAndroid) {
            //这个是安卓操作系统
            alert('安卓')
            }
            if (isIOS) {
        　　　　//这个是ios操作系统
                alert('ios')
            } */

    var str = 'str1'
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  height: 100%;
}
</style>

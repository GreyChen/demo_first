<template>
    <div id="blobs" >
        <div class="main" ref="main">
            <div class="iconfont icon-ai-top" :class="{'top-show': mainScrollTop > 350}" @click="$refs.main.scrollTop = 0"></div>
            <ul>
                <li v-for="item in 50">这是一个demo</li>
            </ul>
        </div>
        <div class="footer">
            <div class="tableft">
                <div class="shouye tab">
                    <i class="iconfont icon-shouye"></i>
                    <div>首页</div>
                </div>
                <div class="xietong tab">
                    <i class="iconfont icon-chanrongxietong"></i>
                    <div>协同</div>
                </div>
            </div>
            <div class="blobs">
                <div class="circle center" @click="openBlobs()"><p class="iconfont icon-jiahao" :class="{'p-rotateZ': isShow}"></p></div>
                <div class="circle first iconfont icon-rili" :class="{'first-show': isShow}"></div>
                <div class="circle second iconfont icon-jisuanqi" :class="{'second-show': isShow}"></div>
                <div class="circle last iconfont icon-clock " :class="{'last-show': isShow}"></div>
            </div>
            <div class="tabright">
                <div class="buycar tab">
                    <i class="iconfont icon-buycar"></i>
                    <div>购物车</div>
                </div>
                <div class="my tab">
                    <i class="iconfont icon-wode1"></i>
                    <div>我的</div>
                </div>
            </div>
        </div>
        <svg xmlns="http://www.w3.org/2000/svg" version="1.1">
            <defs>
                <filter id="goo">
                    <feGaussianBlur in="SourceGraphic" stdDeviation="5" result="blur" />
                    <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -7" result="goo" />
                    <feBlend in="SourceGraphic" in2="goo" />
                </filter>
            </defs>
        </svg>
    </div>


</template>
<script>
export default {
    data() {
        return {
            isShow: false,
            mainScrollTop: '',
        }
    },
    methods: {
        openBlobs() {
            this.isShow = !this.isShow
        },
        
    },
    mounted() {
        this.$refs.main.addEventListener('scroll', () => {
            this.mainScrollTop = this.$refs.main.scrollTop
            // console.log(this.mainScrollTop)
        })
    }
   
}
</script>


<style lang="scss">
    
    #blobs {
        height: 100%;
        display: flex;
        flex-direction: column;
        font-size: .373333rem /* 28/75 */;
        line-height: 1.2rem;
        .main {
            flex:1;
            overflow-x: hidden;
            .icon-ai-top {
                position: fixed;
                right: .266667rem /* 20/75 */;
                top: 75%;
                border-radius: 50%;
                background: #58bc58;
                color: #fff;
                width: .666667rem /* 50/75 */;
                height: .666667rem /* 50/75 */;
                font-size: .346667rem /* 26/75 */;
                line-height: .666667rem /* 50/75 */;
                transform: translateX(1.066667rem /* 80/75 */);
                opacity: 0;
                transition: all 1s;
            }
            .top-show {
                transform: translateX(0);
                opacity: 1;
            }
            
        }
        .footer{
            display: flex;
            justify-content: space-between;
            padding: 0 .4rem;
            position: relative;
            .tableft {
                display: flex;
                align-self: flex-end;
                width: 35%;
                justify-content: space-between;

            }
            .tabright {
                display: flex;
                align-self: flex-end;
                width: 35%;
                justify-content: space-between;
            }
            .tab {
                display: flex;
                flex-direction: column;
                justify-content: flex-end;
                height: 1.333333rem /* 100/75 */;
                i {
                    align-self: center;
                    display: inline-block;
                    width: .533333rem /* 40/75 */;
                    height: .533333rem /* 40/75 */;
                    font-size: .533333rem /* 40/75 */;
                }
            }
            .blobs {   
                position: absolute;
                top: -1.546667rem /* 116/75 */;
                left: 50%;
                transform: translateX(-50%);
                width: 100%;
                height: 1.2rem /* 90/75 */;
                display: flex;
                justify-content: center;
                filter: url(#goo);  
                color: #fff;
                .circle {
                    position: absolute;
                    width: 1.2rem /* 90/75 */;
                    height: 1.2rem;
                    transform: translate(0, 1.333333rem /* 100/75 */);
                    background: hsl(337, 70%, 58%);
                    clip-path: circle(.56rem /* 42/75 */ at center);
                }
                .center {
                    z-index: 2;
                    p {
                        transition: transform 0.5s linear;
                        font-size: .666667rem /* 50/75 */;
                    }
                }
                
                .first {
                    background: hsl(307, 70%, 58%);
                    transition: transform 0.5s 100ms ease-out;
                }

                .second {
                    background: hsl(277, 70%, 58%);
                    transition: transform 0.5s 300ms ease-out;

                }

                .last {
                    background: hsl(247, 70%, 58%);
                    transition: transform 0.5s 500ms ease-out;

                }

                .first-show {
                    transform: translate(-1.333333rem /* 100/75 */, .333333rem /* 25/75 */)
                }

                .second-show {
                    transform: translate(0, -.266667rem /* 20/75 */);
                }
                .last-show {
                    transform: translate(1.333333rem /* 100/75 */, .333333rem /* 25/75 */);
                }
                .p-rotateZ {
                    transform: rotatez(45deg);
                }
            }
        }
        svg {
            width: 0;
            height: 0;
        }
      
    }
</style>


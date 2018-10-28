<template>
    <div 
    id="slideDeleteLi" 
    ref="slideLi"
    @touchstart="start($event)"
    @touchmove="move($event)"
    @touchend="end($event)"
    >
    <!-- <div id="slideDeleteLi"> -->
        <div class="content">
            <slot></slot>
        </div>
        <div class="btn" ref="btn" @click="deleteLi()">
            <div class="text">
                删除

            </div>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            startX: '',
            startY: '',
            moveX: '',
            moveY: '',
            moveDistX: '', 
            moveDistY: '',
            endX: '',
            endY: '',

            defaultStyle: {

            },

            moveRight: '', //滑动的translateX
        }
    },
    methods: {
        start(e) {
            //获取touchstart时的坐标
            this.startX = e.targetTouches[0].pageX
            this.startY = e.targetTouches[0].pageY

            // console.log('获取touchstart时的坐标', this.startX)

            
            this.moveRight = this.$refs.slideLi.style.transform
        },
        move(e) {
            //touchmove的时候，手指离开屏幕时的坐标
            this.moveX = e.targetTouches[0].pageX
            this.moveY = e.targetTouches[0].pageY 
            
            //计算出滑动的距离
            this.moveDistX = this.moveX - this.startX
            this.moveDistY = this.moveY - this.startY 

            let maxDistX = window.getComputedStyle(this.$refs.btn).width //滑动的最大距离，即删除按钮的宽度
                maxDistX = maxDistX.slice(0, maxDistX.indexOf('px'))*1

            //手指左右滑动很难做到笔直的往左往右，稍微有点倾斜，就会被Y轴先行接管，需要再通过绝对值判断
            //当横向滑动距离的绝对值 > 纵向滑动距离的绝对值时，为左右方向，反着则为上下方向
            if(this.moveDistX > 15 && Math.abs(this.moveDistX) > Math.abs(this.moveDistY)) {
                console.log('向右')  
                e.preventDefault() //阻止默认事件，防止左右滑动的时候导致滚动条上下滑动
                if(this.moveRight != '') {
                    // console.log(this.$refs.slideLi.style.transform,this.moveDistX)

                    //获取当前的translateX，再和向右滑动的距离相加
                    let translateXstr = this.$refs.slideLi.style.transform
                    translateXstr = translateXstr.slice(translateXstr.indexOf('\(') + 1, translateXstr.indexOf('rem')) * 1
                    // console.log(translateXstr + this.moveDistX/75)
                    this.moveDistX = translateXstr + this.moveDistX/75
                    // if(this.moveDistX == 0) this.moveDistX = 0
                    console.log(this.moveDistX)
                    this.$refs.slideLi.style.transform = 'translateX(' + this.moveDistX +'rem)'
                    console.log(this.$refs.slideLi.style.transform)


                }



            } else if(this.moveDistX < -15 && Math.abs(this.moveDistX) > Math.abs(this.moveDistY)) {
                e.preventDefault()
                if(this.moveDistX <= -maxDistX) {
                    this.moveDistX = -maxDistX
                } 
                // console.log('向左')
                this.$refs.slideLi.style.transform = 'translateX(' + this.moveDistX/75 +'rem)'

            

            } else if(this.moveDistY > 15 && Math.abs(this.moveDistY) > Math.abs(this.moveDistX)) {
                // console.log('向下')
            } else if(this.moveDistY < -15 && Math.abs(this.moveDistY) > Math.abs(this.moveDistX)) {
                // console.log('向上')
            }

           
        },
        end() {

        },

        deleteLi() {
        }
    },
    mounted() {

    }
}
</script>

<style lang="scss">
    #slideDeleteLi {
        display: flex;
        justify-content: space-between;
        width: 100%;
        position: relative;
        // overflow: hidden;
        .content {
            width: 100%;
        }
        .btn {
            width: 20%;
            height: 100%;
            background: #cda668;
            color: #fff;
            position: absolute;
            left: 100%;
            top: 0;
            font-size: .373333rem /* 28/75 */;
            display: flex;
            .text {
                align-self: center;
                text-align: center;
                width: 100%;
            }
        }
    }
</style>


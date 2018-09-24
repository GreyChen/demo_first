<template>
    <div id="calendar">
        <div class="calendar">
            <p @click="toToday()" style="font-size: 20px">{{todayYear}}.{{todayMonth}}.{{todayDate}}</p>

            <div class="calendar-top">
                <div class="previous"><i class="iconfont icon-fanhui" @click="prevMonth()"></i></div>
                <div class="curYM">{{year}}.{{month}}</div>
                <div class="next"><i class="iconfont icon-fanhui" @click="nextMonth()"></i></div>
            </div>
            <ul class="week">
                <li>Mon</li>
                <li>Tue</li>
                <li>Wed</li>
                <li>Thu</li>
                <li>Fri</li>
                <li>Sat</li>
                <li>Sun</li>              
            </ul>
            <ul class="days">
                <li class="days-item" v-for="(item, index) in currentNumberOfDaysArr.slice(0, 35)" :key="index"> 
                    <div class="num" :class="{active: currentIdx == item.dId, 
                    currentMonth: item.optMonth == 'currentMonth', 
                    currentDay: item.optDay == 'currentDay' && todayMonth == month && todayYear == year}" 
                    @click="active(item.dId)">{{item.day}}</div>
                </li>
            </ul>
            <div class="calendar-bottom">
                <p @click="confirm()">确定</p>
            </div>
        </div>
    </div>
</template>
<script>

export default {
    data() {
        return {
            year: '', //年
            month: '', //月
            date: '', //日
            day: '', //星期几
            currentD: '', //当前时间
            currentDstr: '', //
            firstDay: '', // 当前月份1号星期几
            currentNumberOfDaysArr: [], //当前月份的天数
            prevNumberOfDaysArr: [], //上个月份天数
            nextNumberOfDaysArr: [], //下个月份天数
            currentIdx: '', //点击当前日历号数的索引
            daysArr: [],

            //当天的年月日需要另外存起来
            todayYear: '', 
            todayMonth: '',
            todayDate: '',
        }
    },
    methods: {
        //选中高亮
        active(_dId) {
            this.currentIdx = _dId;
        },
        //确定按钮，点击获取年月日 星期几
        confirm() {
            let dayObj = this.currentNumberOfDaysArr[this.currentIdx]; 
            let confirmMonth, confirmYear;
            if(dayObj.optMonth == 'prevMonth') {
                confirmYear = this.year;
                confirmMonth = this.month - 1;
                if(confirmMonth == 0) {
                    confirmMonth = 12;
                    confirmYear = this.year - 1;
                }
            } else if (dayObj.optMonth == 'nextMonth') {
                confirmYear = this.year;
                confirmMonth = this.month*1 + 1;
                if(confirmMonth == 13) {
                    confirmMonth = 1;
                    confirmYear = this.year*1 + 1;
                }
            } else {
                confirmMonth = this.month;
                confirmYear = this.year;
            }
            let confirmDay = new Date(confirmYear + '/' + confirmMonth + '/' + dayObj.day).getDay();
            let weekArr = ['星期日','星期一','星期二','星期三','星期四','星期五','星期六']
            let a = confirmYear + '-' + confirmMonth + '-' + dayObj.day + '-' +  weekArr[confirmDay];
            alert(a)
        },
        //小封装：获取任意月份天数
        getMonthDays(year, month, zero) {
            return new Date(year, month, zero).getDate();
        },
        //小封装：获取当天所在数组索引
        getCurrentIdx() {
            //统一加id, 用于选中的样式控制，获取当前号数所在索引，当前号数高亮。
            this.daysArr = [];
            for(let item in this.currentNumberOfDaysArr) {
                this.currentNumberOfDaysArr[item].dId = item;
                this.daysArr.push(this.currentNumberOfDaysArr[item].day);
            }          
            this.currentIdx = this.daysArr.lastIndexOf(this.date*1);
           
        },
        //小封装：初始化当前年月日
        toToday() {
            this.currentD = new Date();
            this.currentMonth();
        },
        //小封装：去到某一个月份
        toAnyMonth(anyMonth) {
            let currentDstr = this.currentD.toLocaleDateString();
            let any  = new Date(currentDstr).setMonth(anyMonth);
            this.currentD = new Date(any);
            this.currentMonth();
            if(this.todayMonth !== this.month || this.todayYear !== this.year)  this.currentIdx = '';
            if(this.todayMonth == this.month && this.todayYear == this.year) this.getCurrentIdx();  
            
        },
        //上个月
        prevMonth() {
            this.toAnyMonth(this.month - 2);
            
        },
        //下个月
        nextMonth() {
            this.toAnyMonth(this.month);
        },
        //当前月
        currentMonth() {
            this.year = this.currentD.getFullYear();
            this.month = this.currentD.getMonth() + 1;
            this.date = this.currentD.getDate();
            
            if(this.month < 10) this.month = '0' + this.month;
            if(this.date < 10) this.date = '0' + this.date;
            
            this.day = this.currentD.getDay();
            //获取当前月份1号星期几
            this.firstDay = new Date(this.year, this.month-1, 1).getDay();
            //获取当前月份天数
            let currentNumberOfDays = this.getMonthDays(this.year, this.month, 0);
            //需要清空原有当前天数数组
            this.currentNumberOfDaysArr = [];
            for(let i=1; i<=currentNumberOfDays; i++) {
                //把天数装进对象，并增加一些可控属性再push到数组
                let currentObj = {};
                currentObj.day = i;
                currentObj.optMonth = 'currentMonth';
                if(i == this.date*1) currentObj.optDay = 'currentDay';
                this.currentNumberOfDaysArr.push(currentObj);
            }
            //获取上个月份天数
            let prevNumberOfDays = this.getMonthDays(this.year, this.month-1, 0);            
            //获取下个月份天数
            let nextNumberOfDays = this.getMonthDays(this.year, this.month*1+1, 0);
            // console.log('上个月份',this.month-1, '天数'+ prevNumberOfDays,'下个月份',this.month*1+1, '天数'+ nextNumberOfDays)
            if(this.firstDay == 0) this.firstDay = 7; //把星期天变成7，方便数组的增删
            
            //要截取的上个月月末的数组
            if(this.firstDay !== 1) {
                let prevArr = [];
                for(let i = prevNumberOfDays - (this.firstDay-2); i <= prevNumberOfDays; i++) {
                    let prevObj = {};
                    prevObj.day = i;
                    prevObj.optMonth = 'prevMonth';
                    prevArr.push(prevObj);
                }
                for(let item in prevArr.reverse()) this.currentNumberOfDaysArr.unshift(prevArr[item]);
            } 
            
            //要截取的下个月月初的数组
            let currentLength = this.currentNumberOfDaysArr.length;
            if(currentLength < 35) {
                let nextArr = [];
                for(let i = 1; i <= 35-currentLength; i++) {
                    let nextObj = {};
                    nextObj.day = i;
                    nextObj.optMonth = 'nextMonth';                    
                    nextArr.push(nextObj);
                }
                for(let item in nextArr) this.currentNumberOfDaysArr.push(nextArr[item]);
            }
            this.getCurrentIdx();       
               
        }  
    },
    mounted() {
        this.toToday();

        //当前的年月日的需要另外存起来，否则点击上个月或者下个月的时候会发生变化
        this.$public.addCookie('year', this.year);        
        this.$public.addCookie('month', this.month);
        this.$public.addCookie('date', this.date);
        this.todayYear = this.$public.getCookieValue('year');        
        this.todayMonth = this.$public.getCookieValue('month');
        this.todayDate = this.$public.getCookieValue('date');
    }
}
</script>
<style lang="scss">
    #calendar {
        width: 100%;
        padding: 0 .4rem/* 30/75 */
        ;
        .calendar {
            .calendar-top {
                display: flex;
                justify-content: space-between;
                font-size: .373333rem/* 28/75 */
                ;
                line-height: 1.2rem/* 90/75 */
                ;
                border-bottom: 1px solid #e5e5e5;
                i {
                    display: inline-block;
                    color: #A3A3A3;
                }
                .next {
                    i {
                        transform: rotate(180deg);
                    }
                }
            }
            .week {
                display: flex;
                margin-top: .133333rem/* 10/75 */
                ;
                li {
                    width: 1.306667rem/* 98/75 */
                    ;
                    font-size: .373333rem/* 28/75 */
                    ;
                    line-height: 1.173333rem/* 88/75 */
                    ;
                    text-align: center;
                    color: #A1A1A1;
                }
            }
            .days {
                width: 100%;
                display: flex;
                display: -webkit-flex;
                flex-wrap: wrap;
                -webkit-flex-wrap: wrap;
                .days-item {
                    width: 1.306667rem/* 98/75 */
                    ;
                    display: flex;
                    justify-content: center;
                    .num {
                        text-align: center;
                        font-size: .346667rem/* 26/75 */
                        ;
                        color: #A3A3A3;
                        width: .8rem/* 60/75 */
                        ;
                        height: .8rem;
                        line-height: .8rem/* 60/75 */
                        ;
                        // margin-bottom: .213333rem/* 16/75 */
                        // ;
                    }
                    .currentMonth {
                        color: #000;
                    }
                    .currentDay {
                        border: 1px solid #000;
                        border-radius: 50%;
                    }
                    .active {
                        border-radius: 50%;
                        background: #000;
                        color: #fff;
                    }
                }
            }
            .calendar-bottom {
                display: flex;
                justify-content: center;
                p {
                    font-size: .373333rem/* 28/75 */
                    ;
                    line-height: .666667rem/* 50/75 */
                    ;
                    padding: 0 .666667rem/* 50/75 */
                    ;
                    margin: .533333rem/* 40/75 */
                    0;
                    border: 1px solid #000;
                    border-radius: .133333rem/* 10/75 */
                    ;
                }
            }
        }
    }
</style>

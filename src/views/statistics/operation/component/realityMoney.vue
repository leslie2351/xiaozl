<!-- 热卖商品统计 -->
<style lang="less">
    .demo-spin-icon-load{
        animation: ani-demo-spin 1s linear infinite;
    }
    @keyframes ani-demo-spin {
        from { transform: rotate(0deg);}
        50%  { transform: rotate(180deg);}
        to   { transform: rotate(360deg);}
    }
    .demo-spin-col{
        height: 100%;
        width:90%;
        position: relative;
    }
</style>
<template>
    <div style='min-height:550px;'>
        <div class="margin-bottom-10 clearfix" style="margin-left:2px;">
            <div class="fl padding-left-10">
                <RadioGroup v-model="animal" @on-change='changeAnmal' class='fl padding-top-5'>
                    <Radio label="年"></Radio>
                    <Radio label="月"></Radio>
                </RadioGroup>
                <div v-if='animal == "年"' class="fl padding-left-10">
                    <DatePicker type="year" :value='model8' @on-change='changeDateT' placeholder="选择年" style="width: 100px"></DatePicker>
                </div>
                <div v-if='animal == "月"' class="fl padding-left-10">
                    <DatePicker type="month" placeholder="选择月份" :value='model9' style="width:100px" @on-change='changeDateS'></DatePicker>
                </div>
            </div>
        </div>
        <Card>
            <div class="main_right" style='width:100%;height:350px;'>
                <i-col class="demo-spin-col" span="8" v-if='flag'>
                    <spin fix>
                        <icon type="load-c" size=50 class="demo-spin-icon-load"></icon>
                        <div>加载中</div>
                    </spin>
                </i-col>
            </div>
        </Card>

    </div>
</template>

<script>

export default {
    name: 'home',

    data () {
        return {
            searchConName:'',
            date:[],//时间
            //时间筛选
            animal:'年',
            //年月
            model8:'2018',
            //年月日
            model9:'2018-01',

            flag:true,
            dataName:[],//图表的名字
            dataNum:[],//图表的值

        }
    },
    methods:{
        drawLine(){
            // 基于准备好的dom，初始化echarts实例
            let myChart = this.$echarts.init(document.querySelector('.main_right'))
            // 绘制图表
            myChart.setOption({
                title: {
                    text: '实付金额',
                },
                color: ['#3398DB'],
                tooltip: {
                    trigger: 'axis'
                },
                toolbox: {
                    show: true,
                    feature: {
                        dataZoom: {
                            yAxisIndex: 'none'
                        },
                        dataView: {readOnly: false},
                        magicType: {type: ['line', 'bar']},
                        restore: {},
                        saveAsImage: {}
                    }
                },
                xAxis:  {
                    type: 'category',
                    boundaryGap: false,
                    data: this.dataName,
                    // ['周一','周二','周三','周四','周五','周六','周日']
                },
                yAxis: {
                    type: 'value',
                    axisLabel: {
                        formatter: '{value}'
                    }
                },
                series: [
                    {
                        name:'实付金额',
                        type:'line',
                        data:this.dataNum,
                        // [11, 11, 15, 13, 12, 13, 50],
                        markPoint: {
                            data: [
                                {type: 'max', name: '最大值'},
                                {type: 'min', name: '最小值'}
                            ]
                        },
                        markLine: {
                            data: [
                                {type: 'average', name: '平均值'}
                            ]
                        }
                    }
                ]
            });
        },

        changeAnmal(val){ //选择筛选时间的方式
            if(val == '年'){
                this.initChart({year:this.model8})
            }else if(val == '月'){
                this.initChart({yearMonth:this.model9})
            }

        },
        //已年为单位
        changeDateT(val){
            this.model8 = val;
            this.initChart({year:val})
  
        },
        //已月为单位
        changeDateS(val){
            this.model9 = val;
            this.initChart({yearMonth:val})

        },
        initChart(param){ //请求图表数据
            this.$http.post('http://192.168.10.105:8080/storeStatistics/orderMoneyParticulars',
                    param
               ).then((data)=>{

                this.flag=false;
                this.dataName=[];
                this.dataNum=[]
                if(this.animal == '年'){
                    data.data.forEach((item)=>{
                        this.dataName.push(item.month)
                        this.dataNum.push(item.totalMoney)
                    })
                }else if(this.animal == '月'){
                    data.data.forEach((item)=>{
                        this.dataName.push(item.day)
                        this.dataNum.push(item.totalMoney)
                    })
                }

                this.drawLine()
            }).catch((err)=>{
                console.log(err)

            })
        },

    },
    mounted(){
        this.initChart({year:this.model8})
    }
}
</script>

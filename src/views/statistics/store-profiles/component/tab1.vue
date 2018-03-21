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
    <div style='min-height:420px;'>
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
    props:['data','num'],
    data () {
        return {
            flag:true, //loding
            dataName:[],//图表的名字
            dataNum:[],//图表的值
            onOff:false,
            dataS:{},
        }
    },
    methods:{

        drawLine(){
            // 基于准备好的dom，初始化echarts实例
            let myChart = this.$echarts.init(document.querySelector('.main_right'))
            // 绘制图表
            myChart.setOption({
                title: {
                    text: '近30天的下单金额走势图',
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
                    data:this.data,
                },
                yAxis: {
                    type: 'value',
                    axisLabel: {
                        formatter: '{value}'
                    }
                },
                series: [
                    {
                        name:'下单金额',
                        type:'line',
                        data:this.num,
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

    },
    watch:{
        data(){
            this.drawLine()
        }
    },
    mounted(){
        
        this.drawLine()

    }
}
</script>

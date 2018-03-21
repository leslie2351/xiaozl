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
            <!-- <span class="fl margin-right-10" style="line-height:32px;">展示类型：</span> -->
            <RadioGroup v-model="animal2" @on-change='changeAnmal2' class='fl padding-top-5 padding-left-20'>
                <Radio label="销售金额"></Radio>
                <Radio label="销售量"></Radio>
            </RadioGroup>
            <div class="fl" style="padding-left:80px;">
                <!-- <span class="fl margin-right-10" style="line-height:32px;">时间类型：</span> -->
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
            <div class="clearfix margin-top-20">
                <Button class='fl' @click='btn()'>点击查看列表</Button>
                <div class="fl" v-if='onOff'>
                    <Row class="margin-top-10 searchable-table-con1" justify="center" align="middle">
                        <Table border :columns="columns" :data="data"></Table>
                    </Row>
                </div>
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

            //类型
            animal2:'销售金额',
            columns: [
                {
                    title: '商品名称',
                    key: 'orderNo',
                    align: 'center'
                },
                {
                    title: '商品价格',
                    key: 'bankNum',
                    align: 'center'
                },
                {
                    title: '商品销售数量',
                    key: 'payTypeName',
                    align: 'center'
                },
                {
                    title: '商品销售总额',
                    key: 'refundTypeName',
                    align: 'center'
                },

            ],
            data:[],//列表的数据
            flag:true,
            dataName:[],//图表的名字
            dataNum:[],//图表的值
            onOff:false,//列表是否显示
        }
    },
    methods:{
        btn(){ //点击显示列表时
            this.onOff=true;
            this.initTab1()

        },
        drawLine(){
            // 基于准备好的dom，初始化echarts实例
            let myChart = this.$echarts.init(document.querySelector('.main_right'))
            // 绘制图表
            myChart.setOption({
                title: {
                    text: '热销商品总金额前30的统计',
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
                        name:'下单金额',
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
                if(this.animal2 == '销售金额'){
                    this.initChart('money','http://192.168.10.105:8080/storeStatistics/hotGoodsByMoneyParticulars',{year:this.model8})
                }else if(this.animal2 == '销售量'){
                    this.initChart('num','http://192.168.10.105:8080/storeStatistics/hotGoodsByNumParticulars',{year:this.model8})
                }
                // if(this.onOff){
                //     this.initTab({month:this.model8})
                // }
            }else if(val == '月'){
                if(this.animal2 == '销售金额'){
                    this.initChart('money','http://192.168.10.105:8080/storeStatistics/hotGoodsByMoneyParticulars',{yearMonth:this.model9})
                }else if(this.animal2 == '销售量'){
                    this.initChart('num','http://192.168.10.105:8080/storeStatistics/hotGoodsByNumParticulars',{yearMonth:this.model9})
                }
                // if(this.onOff){
                //     this.initTab({day:this.model9})
                // }
            }

        },
        //查看类型
        changeAnmal2(val){
            console.log(val);
            console.log(this.animal);
            
            if(val == '销售金额'){
                if(this.animal == '年'){
                    this.initChart('money','http://192.168.10.105:8080/storeStatistics/hotGoodsByMoneyParticulars',{year:this.model8})
                }else if(this.animal == '月'){
                    this.initChart('money','http://192.168.10.105:8080/storeStatistics/hotGoodsByMoneyParticulars',{yearMonth:this.model9})
                }

                // if(this.onOff){
                //     this.initTab({month:this.model8})
                // }
            }else if(val == '销售量'){
                if(this.animal == '年'){
                    this.initChart('num','http://192.168.10.105:8080/storeStatistics/hotGoodsByNumParticulars',{year:this.model8})
                }else if(this.animal == '月'){
                    this.initChart('num','http://192.168.10.105:8080/storeStatistics/hotGoodsByNumParticulars',{yearMonth:this.model9})
                }
            }
        },
        //已年为单位
        changeDateT(val){
            this.model8 = val;
            this.initChart('money','http://192.168.10.105:8080/storeStatistics/hotGoodsByMoneyParticulars',{year:val})
            // if(this.onOff){
            //     this.initTab({month:val})
            // }
        },
        //已月为单位
        changeDateS(val){
            this.model9 = val;
            this.initChart('money','http://192.168.10.105:8080/storeStatistics/hotGoodsByMoneyParticulars',{yearMonth:val})
            // if(this.onOff){
            //     this.initTab({day:val})
            // }
        },
        initChart(type,url,param){ //请求图表数据
            this.$http.post(url,
                    param
               ).then((data)=>{
                this.flag=false;

                this.dataName=[];
                this.dataNum=[]
                if(type == 'money'){
                    data.data.list.forEach((item)=>{
                        this.dataName.push(item.goodsName)
                        this.dataNum.push(item.totalNum)
                        
                    })
                }else if(type == 'num'){
                    data.data.list.forEach((item)=>{
                        this.dataName.push(item.goodsName)
                        this.dataNum.push(item.productTotal)
                        
                    })
                }
                this.drawLine()
            }).catch((err)=>{
                console.log(err)

            })
        },
        initTab1(){ //初始化列表
            this.$http.post('http://192.168.10.120:8088/storeGoods/goodsList',{
                startDate:this.date[0],
                endDate:this.date[1],
            }).then((data)=>{
                this.data=data.data.list
            }).catch((err)=>{
                console.log(err)

            })
        }
    },
    mounted(){
        this.initChart('money','http://192.168.10.105:8080/storeStatistics/hotGoodsByMoneyParticulars',{year:2018})
    }
}
</script>

<!-- 我是退款页面 -->
<style lang="less">

    @import '../../../../styles/common.less';
    .ivu-table-cell{
        padding:0;
    }
</style>

<template>
    <div>
        <Row>
            <Col span="24">
                <Card class='clearfix'>

                    <div class="margin-bottom-10 clearfix">
                        <Row class='fl margin-right-10'>
                            <Input v-model="searchConName" @on-click="initRefund" icon="search" placeholder="请输入商品名称搜索..." style="width: 200px" />
                        </Row>
                        <Select class='fl margin-right-10' v-model="model1" style="width:100px" placeholder='商品分组' @on-change='screenOrder'>
                            <Option v-for="item in seller_type" :value="item" :key="item">{{item}}</Option>
                        </Select>
                        <Col class='fl padding-left-20'>
                            <span class="dt">时间范围：</span>
                            <DatePicker :value="valuedata" format="yyyy-MM-dd" @on-change='changeDate' type="daterange" placement="bottom-end" placeholder="请选择时间范围" style="width: 200px"></DatePicker>
                        </Col>

                    </div>
                    <Row class="margin-top-10 searchable-table-con1" justify="center" align="middle">
                        <Table border :columns="orderColumns" :data="orderData"></Table>
                    </Row>
                    <div class="clearfix">
                        <Page :total=total size="small" class='fr margin-top-20' show-elevator show-sizer show-total
                            @on-change = 'changePage' @on-page-size-change='changePageSize' placement='top'></Page>
                    </div>
                </Card>
            </Col>
        </Row>
    </div>
</template>

<script>
export default {
    name: 'mutative-router',
    data () {
        return {
            // searchConName,
            orderColumns: [
                {
                    title: '商品名称',
                    key: 'goodsName',
                    align: 'center'
                },
                {
                    title: '商品价格',
                    key: 'salePrice',
                    align: 'center'
                },
                {
                    title: '商品销售数量',
                    key: 'sellNum',
                    align: 'center'
                },
                {
                    title: '商品销售总额',
                    key: 'totalNum',
                    align: 'center'
                },

            ],
            orderData: [

            ],
            searchConName:'',
            valuedata: [],

            model1:'',
            seller_type:['全部'],//订单归属
            startDate:'',//开始时间
            endDate:'',//结束时间
            id:'',//
            total:0,//总页数
            current:1,//当前页码
            pageSize:10,//每页数量
        };
    },

    methods:{
        initFiltrate(){ //获取筛选条件
            this.$http.get('http://192.168.10.105:8080/storeStatistics/goodsParticulars',{

            }).then((data)=>{

                data.data.forEach((item)=>{
                    this.seller_type.push(item.classifyName)
                })
    
            }).catch((err)=>{
                console.log(err)

            })
        },
        screenOrder(val) { //筛选
            console.log(val)
            this.initRefund()
        },
        initRefund(val){//初始化页面
            let param = this.model1 == '全部' ? '':this.model1;
            this.$http.post('http://192.168.10.105:8080/storeStatistics/goodsParticulars',{
                goodsName:this.searchConName,
                classifyName:param,
                startDate:this.startDate,
                endDate:this.endDate,
                pageNum:this.current,
                pageSize:this.pageSize,
            }).then((data)=>{
                console.log(data)
                this.orderData = data.data.list
                this.total = data.data.total
            }).catch((err)=>{
                console.log(err)

            })
        },
        changePage(val){ //切换页码
            console.log(val)
            this.current = val
            this.initRefund()
        },
        changePageSize(val){ //改变每页显示条数
            this.pageSize = val
            this.initRefund()

        },
        changeDate(val){ //时间筛选
            this.startDate = val[0] + ' '+'00:00:00'
            this.endDate = val[1] + ' '+'00:00:00'
            this.initRefund()

        },
        show(val){
            this.id = this.orderData[val].id;

        },
    },
    mounted(){
        console.log('访问了商品详细')
        this.initRefund()
        this.initFiltrate()
    }
};
</script>

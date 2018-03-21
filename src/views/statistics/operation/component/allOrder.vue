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

            orderColumns: [
                {
                    title: '订单编号',
                    key: 'orderNo',
                    align: 'center'
                },
                {
                    title: '买家账号',
                    key: 'userName',
                    align: 'center'
                },
                {
                    title: '下单时间',
                    key: 'createDate',
                    align: 'center'
                },
                {
                    title: '订单总金额',
                    key: 'orderMoney',
                    align: 'center'
                },
                {
                    title: '实付金额',
                    key: 'orderRealMoney',
                    align: 'center'
                },
                {
                    title: '订单状态',
                    key: 'dictName',
                    align: 'center'
                },
            ],
            orderData: [

            ],
            //时间筛选
            animal:'年',
            //年
            model8:'2018',
            //年月
            model9:'2018-01',
            id:'',//
            total:0,//总页数
            current:1,//当前页码
            pageSize:10,//每页数量
        };
    },

    methods:{

        changeAnmal(val){ //选择筛选时间的方式
            if(val == '年'){
                this.initTable({year:this.model8})
            }else if(val == '月'){
                this.initTable({yearMonth:this.model9})
            }

        },
        //已年为单位
        changeDateT(val){
            this.model8 = val;
            this.initTable({year:val})
           
        },
        //已月为单位
        changeDateS(val){
            this.model9 = val;
            this.initTable({yearMonth:val})

        },
        initTable(param){//初始化页面
            let obj = Object.assign({},param,{
                pageNum:this.current,
                pageSize:this.pageSize,
            })
            this.$http.post('http://192.168.10.105:8080/storeStatistics/orderParticulars',
                obj
            ).then((data)=>{
                console.log(data.data)
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
        show(val){
            this.id = this.orderData[val].id;

        },
    },
    mounted(){
        console.log('访问了所有订单')
        this.initTable({year:this.model8})
    }
};
</script>

<template>
    <div>
        <Row>
            <Col span="24">
            <Card class='clearfix'>
                <div class="margin-bottom-10 clearfix">
                    <Row class='fl margin-right-10'>
                        <Input v-model="searchName" icon="search" placeholder="订单编号/用户名/商品名称" style="width: 200px" @on-click="headleSearch({allQuery:searchName})"/>
                    </Row>
                    <Col class='fl padding-left-20'>
                    <span class="dt">下单时间：</span>
                    <DatePicker :value="valuedata" format="yyyy-MM-dd HH:mm:ss" type="daterange" placement="bottom-end" placeholder="请选择" style="width: 200px"  @on-change="changeDate"></DatePicker>
                    </Col>
                </div>
                <Row class="margin-top-10 searchable-table-con1" justify="center" align="middle">
                    <Row class="margin-top-10 searchable-table-con1 header" justify="center" align="middle">
                        <Col span="6">商品信息</Col>
                        <Col span="3">数量</Col>
                        <Col span="4">应付金额</Col>
                        <Col span="4">实付金额</Col>
                        <Col span="4">备注</Col>
                        <Col span="3">操作</Col>
                    </Row>
                    <div v-for="item,index in paymentData" :key="item.id" :id="item.id">
                        <Row class="margin-top-10 searchable-table-con1 header information" justify="center" align="middle">
                            <Col span="12" style="text-align: left"><span>买家账户：{{item.userName}}</span><span>订单号：{{item.orderNo}}</span></Col>
                            <Col span="12" style='text-align:right'>下单时间：{{item.createDate}}</Col>
                        </Row>
                        <div>
                            <Row style="text-align: center" class="Content">
                                <Col span="9" order="4" style="text-align: left">
                                <ul class='Content-left'>
                                    <li v-for="item1 in goodsList" style="height: 90px">
                                        <img :src='item1.goodsSmallImg' :title="item1.goodsSmallImg"/>
                                        <div>
                                            <p>{{item1.productName}}<span style='margin-left:230px;'>{{item1.productNum}}</span></p>
                                            <p></p>
                                        </div>
                                    </li>
                                </ul>
                                </Col>
                                <Col span="4" order="2" class="col-span" style="color: red">{{item.orderMoney}}</Col>
                                <Col span="4" order="1" class="col-span"><span style="color: red">{{item.orderRealMoney}}</span><p style="font-size: 10px">( 运费：￥ 0.00 )</p></Col>
                                <Col span="4" order="1" class="col-span">{{item.orderDescription}}</Col>
                                <Col span="3" order="1" class="col-span col-span1"><p><router-link :to="'/paymentDetails/'+ item.id">查看详情</router-link></p></Col>
                            </Row>
                        </div>
                    </div>
                    <Page :total=total size="small" class='fr margin-top-20' show-elevator show-sizer show-total placement='top'></Page>
                    <p style="text-align: center;margin-left: 280px;margin-top: 10px;" v-if="isShow == false">暂无数据</p>
                </Row>
            </Card>
            </Col>
        </Row>
    </div>
</template>
<script>
    export default {
        data () {
            return {
                total: 10,
                valuedata: [],
                searchName: '',
                price: '',
                modal1: false,
                id: '',
                model1: '',
                isShow: false,
                orderStatus: [],
                code: '',
                paymentData: [],
                goodsList: []
            };
        },
        methods: {
            tableData (val) { // 初始化订单列表
                this.$http.post('http://192.168.5.15:8080/orderInfo/orderInfoPage', {
                    storeId: 2,
                    orderState: 7
                }).then((response) => {
                    console.log(response);
                    this.paymentData = response.data.list;
                    this.paymentData.forEach((item, index) => {
                        this.goodsList = item.orderProductMiddle;
                        // this.price = item.orderProductMiddle.orderRealMoney;
                    });
                    // console.log(this.id);
                }).catch((response) => {
                    console.log(response);
                });
            },
            headleSearch (val) { // 搜索框
                console.log(val)
                this.$http.post('http://192.168.5.15:8080/orderInfo/orderInfoPage',
                    val
                ).then((response) => {
                    console.log(response);
                    this.paymentData = response.data.list;
                }).catch((response) => {
                    console.log(response);
                });
            },
            changeDate (val) { // 日期
                this.nDate = val
                console.log(this.nDate);
                this.$http.post('http://192.168.5.15:8080/orderInfo/orderInfoPage', {
                    startDate: this.nDate[0],
                    EndDate: this.nDate[1]
                }).then((response) => {
                    console.log(response);
                    this.paymentData = response.data.list;
                    this.paymentData.forEach((item) => {
                        this.goodsList = item.orderProductMiddle;
                    });
                }).catch((data) => {
                    // console.log(data)
                });
            },
            showList () {
                if (this.paymentData.size === 0) {
                    this.isShow = true;
                }
                if (this.paymentData.size > 0) {
                    this.isShow = false;
                }
            }
        },
        mounted () {
            this.tableData();
            // this.filterType();
            this.showList();
        }
    };
</script>

<style scoped lang="less">
    @import '../../../../styles/common.less';
    @import '../all-orders.less';
    .ivu-table-cell{
        padding:0;
    }
</style>

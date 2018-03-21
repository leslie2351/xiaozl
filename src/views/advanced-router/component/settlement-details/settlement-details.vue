<template>
    <div>
        <Row>
            <Card>
                <Tabs value="name1" @on-click='toggletab'>
                    <TabPane label="结算订单" name="name1">
                        <div v-if="name == 'name1'">
                            <Row class="margin-top-10 searchable-table-con1" justify="center" align="middle">
                                <div class="margin-bottom-10 clearfix">
                                    <Col class='fl '>
                                    <span class="dt">时间:</span>
                                    <DatePicker type="date" placeholder="请选择" style="width: 200px" format="yyyy-MM-dd HH:mm:ss" @on-change="changeDate"></DatePicker>
                                    </Col>
                                </div>
                                <Table border :columns="tallyorderColumns" :data="tallyorderData" type="content"></Table>
                            </Row>
                        </div>
                    </TabPane>
                    <TabPane label="售后单信息" name="name2" style="width: 1270px;margin-left: 10px">
                        <div v-if= "name == 'name2'">
                            <Row class="margin-top-10 searchable-table-con1" justify="center" align="middle" >
                                <div class="margin-bottom-10 clearfix">
                                    <Col class='fl '>
                                    <span class="dt">结算时间:</span>
                                    <DatePicker type="date" placeholder="请选择" style="width: 200px" format="yyyy-MM-dd HH:mm:ss" @on-change="changeDate1"></DatePicker>
                                    </Col>
                                </div>
                                <Table border :columns="afterSalesColumns" :data="afterSalesData" type="content"></Table>
                            </Row>
                        </div>
                    </TabPane>
                </Tabs>
            </Card>
        </Row>
        <Row class="margin-top-10">
        </Row>
    </div>
</template>
<script>
    export default {
        data () {
            return {
                name: 'name1',
                id: '2',
                tallyorderColumns: [
                    {
                        title: '订单编号',
                        key: 'orderNo',
                        align: 'center'
                    },
                    {
                        title: '订单金额',
                        key: 'orderMoney',
                        align: 'center'
                    },
                    {
                        title: '实付金额',
                        key: 'orderRealMoney',
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
                    }
                ],
                tallyorderData: [
                    {
                        orderNumber: '1234211',
                        orderAmount: '1243',
                        realPay: '1231',
                        buyersAccount: 'qq',
                        orderTime: '2018-1-01 12:12:21'
                    }
                ],
                afterSalesColumns: [
                    {
                        title: '售后类型',
                        key: 'applyType',
                        align: 'center'
                    },
                    {
                        title: '退款/退货单号',
                        key: 'applyNo',
                        align: 'center'
                    },
                    {
                        title: '订单编号',
                        key: 'orderNo',
                        align: 'center'
                    },
                    {
                        title: '退款金额',
                        key: 'refundMoney',
                        align: 'center'
                    },
                    {
                        title: '买家账号',
                        key: 'userName',
                        align: 'center'
                    },
                    {
                        title: '申请时间',
                        key: 'applyDate',
                        align: 'center'
                    },
                    {
                        title: '结算时间',
                        key: 'finishDate',
                        align: 'center'
                    }
                ],
                afterSalesData: [
                    {
                        orderNumber: '1234211',
                        orderAmount: '1243',
                        realPay: '1231',
                        buyersAccount: 'qq',
                        orderTime: '2018-1-01 12:12:21'
                    }
                ]
            };
        },
        methods: {
            toggletab (val) {
                this.name = val
                console.log(this.name);
                if (val == 'name2') {
                    this.$http.post('http://192.168.5.15:8080/storeSatatement/applyAfterSale', {
                        storeId: this.id,
                        deadline: '2018-03-01 00:00:00'
                    }).then((response) => {
                        console.log(response);
                        this.afterSalesData = response.data.list;
                    }).catch((response) => {
                        console.log(response);
                    });
                }
            },
            tab1Data () { // 初始化结算列表
                this.$http.post('http://192.168.5.15:8080/storeSatatement/orderInfo', {
                    storeId: this.id,
                    deadline: '2018-03-01 00:00:00'
                }).then((response) => {
                    console.log(response);
                    this.tallyorderData = response.data.list;
                }).catch((response) => {
                    console.log(response);
                });
            },
            changeDate (val) { // 日期
                this.nDate = val
                console.log(this.nDate);
                this.$http.post('http://192.168.5.15:8080/storeSatatement/orderInfo', {
                    storeId: this.id,
                    year: this.nDate
                }).then((response) => {
                    console.log(response);
                    this.tallyorderData = response.data.list;
                }).catch((response) => {
                    // console.log(response)
                });
            },
            changeDate1 (val) { // 日期
                this.nDate1 = val
                console.log(this.nDate1);
                this.$http.post('http://192.168.5.15:8080/storeSatatement/applyAfterSale', {
                    storeId: this.id,
                    deadline: this.nDate1
                }).then((response) => {
                    console.log(response);
                    this.afterSalesData = response.data.list;
                }).catch((response) => {
                    console.log(response);
                });
            }
        },
        mounted () {
            this.tab1Data();
        }
    };
</script>
<style lang='less' scoped>
     @import '../../../../styles/common.less';
</style>

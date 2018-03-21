<template>
    <div>
        <Row>
            <Col span="24">
            <Card class='clearfix'>
                <div class="margin-bottom-10 clearfix">
                    <Row class='fl margin-right-10'>
                        <Input icon="search"  placeholder="订单号/退货单号/买家账号" style="width: 200px" v-model="searchName3" @on-click="tableData3"/>
                    </Row>
                    <Select class='fl margin-right-10' style="width:150px" placeholder='订单状态' v-model="model1" @on-change="sellType1">
                        <Option v-for="item in orderType1" :value="item.dictName" :key="item.dictCode">{{ item.dictName }}</Option>
                    </Select>
                    <Col class='fl padding-left-20'>
                    <span class="dt">申请时间：</span>
                    <DatePicker :value="valuedata3" format="yyyy-MM-dd HH:mm:ss" type="daterange" placement="bottom-end" placeholder="请选择" style="width: 200px" @on-change="changeDate"></DatePicker>
                    </Col>
                </div>
                <Row class="margin-top-10 searchable-table-con1" justify="center" align="middle">
                    <Table border :columns="orderColumns3" :data="orderData3" type="content"></Table>
                    <!--<Page :total=total size="small" class='fr margin-top-20' show-elevator show-sizer show-total-->
                    <!--@on-change = 'changePage' @on-page-size-change='changePageSize' placement='top'></Page>-->
                </Row>
            </Card>
            </Col>
        </Row>
    </div>
</template>

<script>
    export default {
        name: 'tab4',
        data () {
            return {
                searchName3: '',
                model1: '',
                valuedata3: [],
                total: 10,
                id3: '2',
                code2: '',
                orderColumns3: [
                    {
                        title: '订单号',
                        align: 'center',
                        key: 'orderNo'
                    },
                    {
                        title: '售后单号',
                        align: 'center',
                        key: 'returnNo'
                    },
                    {
                        title: '买家账号',
                        align: 'center',
                        key: 'userName'
                    },
                    {
                        title: '订单状态',
                        align: 'center',
                        key: 'orderStateName'
                    },
                    {
                        title: '申请时间',
                        align: 'center',
                        key: 'applyDate'
                    },
                    {
                        title: '售后状态',
                        align: 'center',
                        key: 'returnStateName'
                    },
                    {
                        title: '操作',
                        key: 'operation',
                        align: 'center',
                        render: (h, params) => {
                            return h('Button', {
                                props: {
                                    type: 'primary',
                                    size: 'small'
                                },
                                on: {
                                    click: () => {
                                        let row = params.row;
                                        // this.storeId = row.id
                                        let argu = { returned_id: row.id };
                                        this.$router.push({
                                            name: 'complete-set1',
                                            params: argu
                                        });
                                    }
                                }
                            }, '查看');
                        }
                    }
                ],
                orderData3: [
                    {
                        refundNumber: '1234321',
                        orderNumber: '125852.11',
                        buyersAccount: '111',
                        orderStatus: '251563',
                        applytime: '2018-12-12 10:00:00',
                        refundStateName: 'l'
                    }
                ],
                orderType1: [
                    {
                        dictName: '已完成',
                        dictCode: 7
                    },
                    {
                        dictName: '拒绝退款',
                        dictCode: 9
                    }
                ]
            };
        },
        methods: {
            tableData3 () { // 初始化订单列表
                this.$http.post('http://192.168.5.15:8080/afterSale/returnGoodsOverPage', {
                    storeId: this.id3,
                    allQuery: this.searchName3
                }).then((response) => {
                    console.log(response);
                    this.orderData3 = response.data.list;
                    this.orderData3.forEach(item => {
                        item.orderNo = item.orderInfo.orderNo;
                        item.userName = item.orderInfo.userName;
                        item.orderStateName = item.orderInfo.orderStateName;
                    });
                }).catch((response) => {
                    console.log(response);
                });
            },
            changeDate (val) { // 日期
                this.nDate3 = val
                console.log(this.nDate3);
                this.$http.post('http://192.168.5.15:8080/afterSale/returnGoodsOverPage', {
                    startDate: this.nDate3[0],
                    endDate: this.nDate3[1]
                }).then((response) => {
                    console.log(response);
                    this.orderData3 = response.data.list;
                    this.orderData3.forEach(item => {
                        item.orderNo = item.orderInfo.orderNo;
                        item.userName = item.orderInfo.userName;
                        item.orderStateName = item.orderInfo.orderStateName;
                    });
                }).catch((data) => {
                    // console.log(data)
                });
            },
            sellType1 (val) { // 筛选退款单状态
                this.orderType1.forEach((item) => {
                    if (item.dictName === val) {
                        this.code2 = item.dictCode;
                    }
                });
                console.log(this.code2);
                this.$http.post('http://192.168.5.15:8080/afterSale/returnGoodsOverPage', {
                    storeId: this.id3,
                    allQuery: this.searchName3,
                    returnState: this.code2
                }).then((response) => {
                    console.log(response);
                    this.orderData3 = response.data.list;
                    this.orderData3.forEach(item => {
                        item.orderNo = item.orderInfo.orderNo;
                        item.userName = item.orderInfo.userName;
                        item.orderStateName = item.orderInfo.orderStateName;
                    });
                }).catch((response) => {
                    console.log(response);
                });
            }
        },
        mounted () {
            this.tableData3();
        }
    };
</script>

<style scoped lang="less">
    @import '../../../../styles/common.less';
</style>

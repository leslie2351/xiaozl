<template>
    <div>
        <Row>
            <Col span="24">
            <Card class='clearfix' style="min-height: 260px">
                <div class="margin-bottom-10 clearfix">
                    <Row class='fl margin-right-10'>
                        <Input icon="search"  placeholder="订单号/退款单号/买家账号" style="width: 200px" v-model="searchName2" @on-click="tableData2"/>
                    </Row>
                    <Select class='fl margin-right-10' style="width:150px" placeholder='退款单状态' v-model="model1" @on-change="sellType1">
                        <Option v-for="item in orderType" :value="item.dictName" :key="item.dictName">{{ item.dictName }}</Option>
                    </Select>
                    <Col class='fl padding-left-20'>
                    <span class="dt">申请时间：</span>
                    <DatePicker :value="valuedata2" format="yyyy-MM-dd HH:mm:ss" type="daterange" placement="bottom-end" placeholder="请选择" style="width: 200px" @on-change="changeDate"></DatePicker>
                    </Col>
                </div>
                <Row class="margin-top-10 searchable-table-con1" justify="center" align="middle">
                    <Table border :columns="orderColumns2" :data="orderData2" type="content"></Table>
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
        name: 'tab3',
        data () {
            return {
                searchName2: '',
                model1: '',
                valuedata2: [],
                total: 10,
                id2: '2',
                code1: '',
                orderColumns2: [
                    {
                        title: '订单号',
                        align: 'center',
                        key: 'orderNo'
                    },
                    {
                        title: '售后单号',
                        align: 'center',
                        key: 'refundNo'
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
                        key: 'refundStateName'
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
                                        let argu = { complete_id: row.id };
                                        this.$router.push({
                                            name: 'complete-set',
                                            params: argu
                                        });
                                    }
                                }
                            }, '查看');
                        }
                    }
                ],
                orderData2: [],
                orderType: [
                    {
                        dictName: '已完成',
                        dictCode: 4
                    },
                    {
                        dictName: '拒绝退款',
                        dictCode: 5
                    }
                ]
            };
        },
        methods: {
            tableData2 () { // 初始化订单列表
                this.$http.post('http://192.168.5.15:8080/afterSale/refundOverPage', {
                    storeId: this.id2,
                    allQuery: this.searchName2
                }).then((response) => {
                    console.log(response);
                    this.orderData2 = response.data.list;
                    this.orderData2.forEach(item => {
                        item.orderNo = item.orderInfo.orderNo;
                        item.userName = item.orderInfo.userName;
                        item.orderStateName = item.orderInfo.orderStateName;
                    });
                }).catch((response) => {
                    console.log(response);
                });
            },
            sellType1 (val) { // 筛选退款单状态
                this.orderType.forEach((item) => {
                    if (item.dictName === val) {
                        this.code1 = item.dictCode;
                    }
                });
                console.log(this.code1);
                this.$http.post('http://192.168.5.15:8080/afterSale/refundOverPage', {
                    storeId: this.id2,
                    allQuery: this.searchName2,
                    refundState: this.code1
                }).then((response) => {
                    console.log(response);
                    this.orderData2 = response.data.list;
                    this.orderData2.forEach(item => {
                        item.orderNo = item.orderInfo.orderNo;
                        item.userName = item.orderInfo.userName;
                        item.orderStateName = item.orderInfo.orderStateName;
                    });
                }).catch((response) => {
                    console.log(response);
                });
            },
            changeDate (val) { // 日期
                this.nDate2 = val
                console.log(this.nDate2);
                this.$http.post('http://192.168.5.15:8080/afterSale/refundPage', {
                    startDate: this.nDate2[0],
                    endDate: this.nDate2[1]
                }).then((response) => {
                    console.log(response);
                    this.orderData2 = response.data.list;
                    this.orderData2.forEach(item => {
                        item.orderNo = item.orderInfo.orderNo;
                        item.userName = item.orderInfo.userName;
                        item.orderStateName = item.orderInfo.orderStateName;
                    });
                }).catch((data) => {
                    // console.log(data)
                });
            }
        },
        mounted () {
            this.tableData2();
        }
    };
</script>

<style scoped lang="less">
    @import '../../../../styles/common.less';
</style>

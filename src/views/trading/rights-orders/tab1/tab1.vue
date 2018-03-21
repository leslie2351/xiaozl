<template>
    <div>
        <Row>
            <Col span="24">
            <Card class='clearfix'>
                <div class="margin-bottom-10 clearfix">
                    <Row class='fl margin-right-10'>
                        <Input icon="search"  placeholder="订单号/退款单号/买家账号" style="width: 200px" v-model="searchName" @on-click="tableData"/>
                    </Row>
                    <Col class='fl padding-left-20'>
                    <span class="dt">申请时间：</span>
                    <DatePicker :value="valuedata" format="yyyy-MM-dd HH:mm:ss" type="daterange" placement="bottom-end" placeholder="请选择" style="width: 200px" @on-change="changeDate"></DatePicker>
                    </Col>
                </div>
                <Row class="margin-top-10 searchable-table-con1" justify="center" align="middle">
                    <Table border :columns="orderColumns" :data="orderData" type="content"></Table>
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
        name: 'tab1',
        data () {
            return {
                searchName: '',
                model1: '',
                valuedata: [],
                total: 10,
                id: '2',
                orderColumns: [
                    {
                        title: '订单号',
                        align: 'center',
                        key: 'orderNo'
                    },
                    {
                        title: '退款单号',
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
                        title: '退款单状态',
                        align: 'center',
                        key: 'refundStateName'
                    },
                    {
                        title: '申请时间',
                        align: 'center',
                        key: 'applyDate'
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
                                        let row = params.row
                                        // this.storeId = row.id
                                        let argu = {outstanding_id: row.id};
                                        this.$router.push({
                                            name: 'rights-set',
                                            params: argu
                                        });
                                    }
                                }
                            }, '查看');
                        }
                    }
                ],
                orderData: [
                    {
                        refundNumber: '1234321',
                        orderNumber: '125852.11',
                        buyersAccount: '111',
                        orderStatus: '251563',
                        applytime: '2018-12-12 10:00:00'

                    }
                ],
                orderType: [
                    {
                        dictName: '带卖家确认',
                        dictCode: '1'
                    }
                ]
            };
        },
        methods: {
            tableData () { // 初始化订单列表
                this.$http.post('http://192.168.5.15:8080/afterSale/refundPage', {
                    storeId: this.id,
                    allQuery: this.searchName
                }).then((response) => {
                    console.log(response);
                    this.orderData = response.data.list;
                    this.orderData.forEach(item => {
                        item.orderNo = item.orderInfo.orderNo;
                        item.userName = item.orderInfo.userName;
                        item.orderStateName = item.orderInfo.orderStateName;
                    });
                }).catch((response) => {
                    console.log(response);
                });
            },
            changeDate (val) { // 日期
                this.nDate = val
                console.log(this.nDate);
                this.$http.post('http://192.168.5.15:8080/afterSale/refundPage', {
                    startDate: this.nDate[0],
                    endDate: this.nDate[1]
                }).then((response) => {
                    console.log(response);
                    this.orderData = response.data.list;
                    this.orderData.forEach(item => {
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
            this.tableData();
        }
    };
</script>

<style scoped lang="less">
    @import '../../../../styles/common.less';
</style>

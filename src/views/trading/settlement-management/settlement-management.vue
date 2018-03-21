<template>
     <div>
        <Row>
            <Col span="24">
                <Card class='clearfix'>
                    <div class="margin-bottom-10 clearfix">
                        <Col class='fl '>
                        <span class="dt">时间:</span>
                         <DatePicker type="year" placeholder="选择年" style="width: 200px" @on-change="changeDate" format="yyyy"></DatePicker>
                        </Col>
                    </div>
                    <Row class="margin-top-10 searchable-table-con1" justify="center" align="middle">
                    <Table border :columns="settlementColumns" :data="settlementData" type="content"></Table>
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
                id: '2',
                storeId: '',
                settlementColumns: [
                    {
                        title: '结算单号',
                        key: 'statementNo',
                        align: 'center'
                    },
                    {
                        title: '订单总额',
                        key: 'totalMoney',
                        align: 'center'
                    },
                    {
                        title: '退款总额',
                        key: 'refundMoney',
                        align: 'center'
                    },
                    {
                        title: '退货总额',
                        key: 'returnGoodsMoney',
                        align: 'center'
                    },
                    {
                        title: '分润金额',
                        key: 'profitMoney',
                        align: 'center'
                    },
                    {
                        title: '实际付款金额',
                        key: 'realMoney',
                        align: 'center'
                    },
                    {
                        title: '到账金额',
                        key: 'obtainMoney',
                        align: 'center'
                    },
                    {
                        title: '账单截止时间',
                        key: 'deadline',
                        align: 'center',
                        width: '150px'
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
                                        let argu = { settlement_id: row.id };
                                        this.$router.push({
                                            name: 'settlement-details',
                                            params: argu
                                        });
                                    }
                                }
                            }, '查看');
                        }
                    }
                ],
                settlementData: [
                    {
                        orderNumber: '11123',
                        paidIn: '',
                        proportion: '',
                        deduct: '',
                        settlementDate: '2018-4-1 15:48:44'
                    }
                ]
            };
        },
        methods: {
            tableData () { // 初始化订单列表
                this.$http.post('http://192.168.5.15:8080/storeSatatement/statementPage', {
                    storeId: this.id
                }).then((response) => {
                    console.log(response);
                    this.settlementData = response.data.list;
                }).catch((response) => {
                    console.log(response);
                });
            },
            changeDate (val) { // 日期
                this.nDate = val
                console.log(this.nDate);
                this.$http.post('http://192.168.5.15:8080/storeSatatement/statementPage', {
                    storeId: this.id,
                    year: this.nDate
                }).then((response) => {
                    console.log(response);
                    this.settlementData = response.data.list;
                }).catch((response) => {
                    // console.log(response)
                });
            }
        },
        mounted () {
            this.tableData();
        }
    };
</script>
<style scoped lang="less">
     @import '../../../styles/common.less';
</style>

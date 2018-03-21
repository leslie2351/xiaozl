<template>
    <div>
        <Row>
            <Card>
                <p slot="title">
                    <span class="margin-right-10">订单号: 1111111111</span>
                    <!--<span class="margin-left-10 margin-right-10">付款方式: 在线付款</span>-->
                </p>
                <Steps :current="current" class='margin-top-10' style='margin:auto;padding:50px;margin-left: 50px;width: 1300px'>
                    <Step v-for="item in content" :title="item.stateName" :content="item.stateDate + item.description" :key="item.state"></Step>
                </Steps>
                <!--<Icon type="arrow-up-b" size="30"></Icon>-->
                <div class="prompt" v-if="answerCount == 1">
                    <p><strong>请求处理退款申请</strong></p>
                    <p><input type="text" placeholder="买家填写备注" class="input"></p>
                    <Button type="primary" style="width: 130px" @click="agreeRefund">同意退款</Button>
                    <Button type="primary" style="width: 130px" @click="noRefund">不同意退款</Button>
                </div>
            </Card>
            <Card class='margin-top-20'>
                <p slot="title">
                    <span class="margin-right-10">订单信息</span>
                </p>
                <Row class="margin-top-10 searchable-table-con1" justify="center" align="middle">
                    <Table border :columns="orderColumns1" :data="orderData1" type="content"></Table>
                    <!--<Page :total=total size="small" class='fr margin-top-20' show-elevator show-sizer show-total-->
                    <!--@on-change = 'changePage' @on-page-size-change='changePageSize' placement='top'></Page>-->
                </Row>
            </Card>
            <Card class='margin-top-20'>
                <p slot="title">
                    <span class="margin-right-10">退款原因</span>
                </p>
                <Row class="margin-top-10 searchable-table-con1" justify="center" align="middle">
                    <Table border :columns="refundColumns" :data="refundData" type="content"></Table>
                    <!--<Page :total=total size="small" class='fr margin-top-20' show-elevator show-sizer show-total-->
                    <!--@on-change = 'changePage' @on-page-size-change='changePageSize' placement='top'></Page>-->
                </Row>
            </Card>
        </Row>
    </div>
</template>

<script>
    export default {
        name: 'rights-set',
        data () {
            return {
                current: 0,
                answerCount: 1,
                value14: 'Hello World',
                model1: 1,
                content: '',
                orderColumns1: [
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
                        title: '订单金额',
                        align: 'center',
                        key: 'orderRealMoney'
                    },
                    {
                        title: '退款人',
                        align: 'center',
                        key: 'userName'
                    }
                ],
                orderData1: [
                    {
                        orderNo: '',
                        refundNo: '',
                        orderRealMoney: '',
                        userName: ''
                    }
                ],
                refundColumns: [
                    {
                        title: '申请时间',
                        align: 'center',
                        key: 'applyDate'
                    },
                    {
                        title: '退款描述',
                        align: 'center',
                        key: 'refundReason'
                    },
                    {
                        title: '退款金额',
                        align: 'center',
                        key: 'pDescription'
                    }
                ],
                refundData: [
                    {
                        applyDate: '',
                        refundReason: '',
                        pDescription: ''
                    }
                ]
            };
        },
        methods: {
            contentData () {
                this.$http.get('http://192.168.5.15:8080/afterSale/refundBasic/' + this.$route.params.outstanding_id, {

                }).then((response) => {
                    console.log(response);
                    let res = response.data;
                    this.orderData1.forEach((item) => {
                        item.refundNo = res.refundNo;
                        item.orderNo = res.orderInfo.orderNo;
                        item.orderRealMoney = res.orderInfo.orderRealMoney;
                        item.userName = res.orderInfo.userName;
                    });
                    this.refundData.forEach((item) => {
                        item.applyDate = res.applyDate;
                        item.pDescription = res.pDescription;
                        item.refundMoney = res.refundMoney;
                    });
                }).catch((response) => {
                    console.log(response);
                });
            },
            processInformation () { // 订单流程
                this.$http.get('http://192.168.5.15:8080/afterSale/afterRefundProcess/' + this.$route.params.outstanding_id, {

                }).then((response) => {
                    console.log(response);
                    this.content = response.data;
                }).catch((response) => {
                    console.log(response);
                });
            },
            agreeRefund () {
                this.$http.put('http://192.168.5.15:8080/afterSale/updateRefund', {
                    id: this.$route.params.outstanding_id,
                    refundState: 3,
                    sDescription: this.sDescription
                }).then((response) => {
                    console.log(response);
                }).catch((response) => {
                    console.log(response);
                });
            },
            noRefund () {
                this.$http.put('http://192.168.5.15:8080/afterSale/updateRefund', {
                    id: this.$route.params.outstanding_id,
                    refundState: 5,
                    sDescription: this.sDescription
                }).then((response) => {
                    console.log(response);
                }).catch((response) => {
                    console.log(response);
                });
            }
        },
        mounted () {
            this.contentData();
            this.processInformation();
        }
    };
</script>

<style scoped lang="less">
    @import '../../../../styles/common.less';
    @import './rights-Set';
</style>

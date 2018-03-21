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
                <!--<div class="prompt" v-if="answerCount == 1">-->
                <!--<p><strong>请求处理退款申请</strong><span><Icon type="clock"></Icon>还剩7天14时25分</span></p>-->
                <!--<p><input type="text" placeholder="买家填写备注" class="input"></p>-->
                <!--<Button type="primary" style="width: 130px">同意退款</Button>-->
                <!--<Button type="primary" style="width: 130px">不同意退款</Button>-->
                <!--</div>-->
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
                    <span class="margin-right-10">退货原因</span>
                </p>
                <Row class="margin-top-10 searchable-table-con1" justify="center" align="middle">
                    <Table border :columns="returnColumns" :data="returnData" type="content"></Table>
                    <!--<Page :total=total size="small" class='fr margin-top-20' show-elevator show-sizer show-total-->
                    <!--@on-change = 'changePage' @on-page-size-change='changePageSize' placement='top'></Page>-->
                </Row>
            </Card>
        </Row>
    </div>
</template>

<script>
    export default {
        name: 'complete-set1',
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
                        title: '退货单号',
                        align: 'center',
                        key: 'returnNo'
                    },
                    {
                        title: '订单金额',
                        align: 'center',
                        key: 'orderMoney'
                    },
                    {
                        title: '商品名称',
                        align: 'center',
                        key: 'productName'
                    },
                    {
                        title: '购买数量',
                        align: 'center',
                        key: 'productNum'
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
                        returnNo: '',
                        orderMoney: '',
                        productName: '',
                        productNum: '',
                        userName: ''
                    }
                ],
                returnColumns: [
                    {
                        title: '申请时间',
                        align: 'center',
                        key: 'applyDate'
                    },
                    {
                        title: '退货数量',
                        align: 'center',
                        key: 'goodsNum'
                    },
                    {
                        title: '图片信息',
                        align: 'center',
                        key: 'imgInfo',
                        render: (h, params) => {
                            return h('div', [
                                h('img', {
                                    attrs: {
                                        'src': params.row.goodsSmallImg
                                    },
                                    style: {
                                        width: '50px',
                                        height: '50px',
                                        margin: '20px'
                                    }
                                })]
                            );
                        }
                    },
                    {
                        title: '图片展示',
                        key: 'goodsSmallImg',
                        align: 'center',
                        width: '350px',
                        render: (h, params) => {
                            return h('div', [
                                h('img', {
                                    attrs: {
                                        'src': params.row.goodsSmallImg
                                        // title: params.row.goodsSmallImg
                                    },
                                    style: {
                                        width: '50px',
                                        height: '50px',
                                        margin: '20px'
                                    }
                                }),
                                h('img', {
                                    attrs: {
                                        'src': params.row.goodsSmallImg
                                        // title: params.row.goodsSmallImg
                                    },
                                    style: {
                                        width: '50px',
                                        height: '50px',
                                        margin: '20px'
                                    }
                                }),
                                h('img', {
                                    attrs: {
                                        'src': params.row.goodsSmallImg
                                        // title: params.row.goodsSmallImg
                                    },
                                    style: {
                                        width: '50px',
                                        height: '50px',
                                        margin: '20px'
                                    }
                                })]
                            );
                        }
                    },
                    {
                        title: '问题描述',
                        align: 'center',
                        key: 'pDescription'
                    }
                ],
                returnData: [
                    {
                        applyDate: '',
                        goodsNum: '',
                        pDescription: ''
                    }
                ]
            };
        },
        methods: {
            contentData () {
                this.$http.get('http://192.168.5.15:8080/afterSale/returnGoodsBasic/' + this.$route.params.returned_id, {

                }).then((response) => {
                    console.log(response);
                    let res = response.data;
                    this.orderData1.forEach((item) => {
                        item.returnNo = res.returnNo;
                        item.orderNo = res.orderInfo.orderNo;
                        item.orderMoney = res.orderInfo.orderMoney;
                        item.userName = res.orderInfo.userName;
                        item.productNum = res.orderInfo.orderProductMiddle.productNum;
                        res.orderInfo.orderProductMiddle.forEach(item1 => {
                            item.productNum = item1.productNum;
                            item.productName = item1.productName;
                        });
                    });
                    this.returnData.forEach((item) => {
                        item.applyDate = res.applyDate;
                        item.imgInfo = res.imgInfo;
                        item.pDescription = res.pDescription;
                        item.goodsNum = res.goodsNum;
                        res.orderInfo.orderProductMiddle.forEach(item1 => {
                            item.goodsSmallImg = item1.goodsSmallImg;
                        });
                    });
                    // console.log(this.returnData);
                }).catch((response) => {
                    console.log(response);
                });
            },
            processInformation () { // 订单流程
                this.$http.get('http://192.168.5.15:8080/afterSale/afterReturnGoodsProcess/' + this.$route.params.returned_id, {

                }).then((response) => {
                    console.log(response);
                    this.content = response.data;
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
    // http://localhost:8080/#/completeSet1/7
</script>

<style scoped lang="less">
    @import '../../../../styles/common.less';
    @import './rights-Set';
</style>

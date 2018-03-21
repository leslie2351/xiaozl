<template>
    <div>
        <Row>
            <Card>
                <p slot="title">
                    <span class="margin-right-10">订单号: {{informationData.orderNo}}</span>
                    <span class="margin-left-10 margin-right-10">付款方式: {{informationData.payTypeName}}</span>
                    <span class="margin-left-10">下单时间: {{informationData.createDate}}</span>
                </p>
                <Steps :current="current" class='margin-top-10' style='margin:auto;padding:50px;margin-left: 100px;width: 1300px'>
                    <Step v-for='item in processData' :title="item.stateName" :content="item.stateDate" :key="item.orderState"></Step>
                </Steps>
            </Card>
            <Card class='margin-top-20'>
                <Tabs value="name1">
                    <TabPane label="买家信息" name="name1">
                        <p class='inp'><strong>收&nbsp;&nbsp;货&nbsp;&nbsp;人:</strong><span class='margin-left-10'>{{buyersData.consigneeName}}</span></p>
                        <p class='inp'><strong>联系方式:</strong><span class='margin-left-10'>{{buyersData.mobilePhone}}</span></p>
                        <p class='inp' v-if='!isShow'><strong>收货地址:</strong><span class='margin-left-10'>{{shippingAddress}}</span><b style='color:#2d8cf0;margin-left:20px;cursor:pointer;' @click='toggleShow'>修改</b></p>
                        <p class='inp' v-if='isShow'><strong>收货地址:</strong><Input v-model="shippingAddress" placeholder="输入新地址" style="width: 300px;margin-left:10px"></Input><b style='color:#2d8cf0;margin-left:20px;cursor:pointer;' @click='saveAddress'>保存</b></p>
                        <p class='inp'><strong>买家留言:</strong><span class='margin-left-10'>{{informationData.orderDescription}}</span></p>
                    </TabPane>
                    <TabPane label="商品信息" name="name2">
                        <p class='inp'><strong>商品单价:</strong><span class='margin-left-10'>{{goodsData.productMoney}}</span></p>
                        <p class='inp'><strong>数&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;量:</strong><span class='margin-left-10'>{{goodsData.productNum}}</span></p>
                        <p class='inp'><strong>总&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;价:</strong><span class='margin-left-10'>{{goodsData.allProductsMoney}}</span></p>
                        <p class='inp'><strong>运&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;费:</strong><span class='margin-left-10'>{{informationData.logisticsMoney}}</span></p>
                        <p class='inp'><strong>订单总价:</strong><span class='margin-left-10'>{{informationData.orderMoney}}</span></p>
                        <p class='inp'><strong>实付金额:</strong><span class='margin-left-10'>{{informationData.orderRealMoney}}</span></p>
                        <p class='inp'><strong>优惠价格:</strong><span class='margin-left-10'>{{informationData.discountsMoney}}</span></p>
                    </TabPane>
                    <TabPane label="物流信息" name="name3">
                    <p class='inp'><strong>公司名称:</strong><span class='margin-left-10'>王某某</span></p>
                    <p class='inp'><strong>运&nbsp;&nbsp;单&nbsp;&nbsp;号:</strong><span class='margin-left-10'>王某某</span></p>
                    </TabPane>
                </Tabs>
            </Card>
        </Row>
    </div>
</template>
<script>
    export default {
        data () {
            return {
                current: 0,
                isShow: false,
                shippingAddress: '', // 收货人地址
                buyersData: [], // 买家信息
                informationData: [],
                goodsData: [], // 商品信息
                processData: [] // 订单流程
            };
        },
        methods: {
            toggleShow () {
                this.isShow = true;
            },
            saveAddress () {
                this.isShow = false;
            },
            contentData () { // 详情信息
                this.$http.get('http://192.168.5.15:8080/orderInfo/orderBasic/' + this.$route.params.payment_id, {

                }).then((response) => {
                    console.log(response);
                    this.buyersData = response.data.userAddress;
                    this.shippingAddress = response.data.detailedAddress;
                    this.informationData = response.data;
                    response.data.orderProductMiddle.forEach((item) => {
                        this.goodsData = item;
                    });
                    // this.informationData.forEach((item) => {
                    //     this.goodsData = item.orderProductMiddle;
                    // });
                }).catch((response) => {
                    console.log(response);
                });
            },
            orderProcess () { // 流程信息
                this.$http.get('http://192.168.5.15:8080/orderInfo/orderProcessList/' + this.$route.params.payment_id, {

                }).then((response) => {
                    console.log(response);
                    this.processData = response.data;
                }).catch((response) => {
                    console.log(response);
                });
            }
        },
        mounted () {
            this.contentData();
            this.orderProcess();
        }
    };
</script>
<style lang='less' scoped>
     @import '../../../../styles/common.less';
     @import './payment-details.less';
</style>

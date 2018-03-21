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
                        <Select class='fl margin-right-10' style="width:150px" placeholder='订单状态' v-model="model1">
                            <Option v-for="item in orderStatus" :value="item.dictName" :key="item.dictName">{{ item.dictName }}</Option>
                        </Select>
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
                                    <Col span="3" order="1" class="col-span col-span1"><span @click="delivery">发货</span><p style="margin-top: 10px"><router-link :to="'/paymentDetails/'+ item.id">查看详情</router-link></p></Col>
                                </Row>
                            </div>
                        </div>
                        <!--<Table border :columns='paymentColumns' :data="paymentData" class="margin-top-10 searchable-table-con1"></Table>-->
                        <Page :total=total size="small" class='fr margin-top-20' show-elevator show-sizer show-total placement='top'></Page>
                        <!--<Modal-->
                            <!--v-model="modal1"-->
                            <!--title="确认信息"-->
                            <!--@on-ok="ok"-->
                            <!--@on-cancel="cancel">-->
                            <!--<p class='Title'><span>订单号:{{deliveryData.orderNo}}</span><span>下单时间: {{deliveryData.createDate}}</span></p>-->
                            <!--<div class='box'>-->
                                <!--<div class='content'>-->
                                    <!--<ul class='content-left'>-->
                                        <!--<li v-for="item in liData">-->
                                            <!--<img :src='item.goodsSmallImg' />-->
                                            <!--<div style="margin-top: 5px">-->
                                                <!--<p>{{item.productName}}<span style='margin-left:130px;'>{{item.productNum}}</span></p>-->
                                            <!--</div>-->
                                        <!--</li>-->
                                    <!--</ul>-->
                                    <!--<div class="note">-->
                                       <!--<p><span>备注:</span></p><textarea class="textinput"></textarea>-->
                                    <!--</div>-->
                                <!--</div>-->
                                <!--<p class='consignee-information'>收货人信息:山西省太原市迎泽区智慧产业园B座1011室，王某某，18855522232</p>-->
                            <!--</div>-->
                            <!--<p class='company'>选择物流公司</p>-->
                            <!--<div>-->
                                <!--<Select v-model="model1" style="width:240px">-->
                                    <!--<Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>-->
                                <!--</Select>-->
                                <!--<Input v-model="orderNum" clearable placeholder="输入订单号"  style="width: 240px;margin-left: 3px"></Input>-->
                            <!--</div>-->
                        <!--</Modal>-->
                        <Modal
                                v-model="modal1"
                                title="确认信息"
                                @on-ok="ok"
                                @on-cancel="cancel">
                            <p style='margin-left: 120px' class="margin-top-10">物流单号:<Input v-model="courierNo" style="width: 200px" class='margin-left-10'></Input></p>
                        </Modal>
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
            noteInformation: '',
            orderNum: '111',
            // clearable: true,
            orderStatus: [],
            goodsList: [],
            id: '',
            model1: '',
            deliveryData: [],
            paymentData: [],
            liData: [],
            courierNo: '',
            isShow: false,
            cityList: [
                {
                    value: 'New York',
                    label: 'New York'
                },
                {
                    value: 'London',
                    label: 'London'
                },
                {
                    value: 'Sydney',
                    label: 'Sydney'
                },
                {
                    value: 'Ottawa',
                    label: 'Ottawa'
                },
                {
                    value: 'Paris',
                    label: 'Paris'
                },
                {
                    value: 'Canberra',
                    label: 'Canberra'
                }
            ]
        };
    },
    methods: {
        ok () {
            this.$http.put('http://192.168.5.15:8080/orderInfo/updateOrderSendGoods', {
                id: this.id,
                orderState: 3,
                courierNo: this.courierNo
            }).then((response) => {
                console.log(response);
                if (response.data.result == 1) {
                    this.$Message.info('修改成功');
                    this.tableData();
                } else {
                    this.$Message.info('修改失败');
                }
            }).catch((response) => {
                console.log(response);
            });
        },
        cancel () {
            this.$Message.info('修改失败');
        },
        delivery () {
            this.modal1 = true;
            this.price = this.realPay;
            this.paymentData.forEach(item => {
                this.id = item.id;
                this.deliveryData = item;
                this.liData = item.orderProductMiddle;
            })
            console.log(this.id);
        },
        tableData (val) { // 初始化订单列表
            this.$http.post('http://192.168.5.15:8080/orderInfo/orderInfoPage', {
                storeId: 2,
                orderState: 2
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
            console.log(val);
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
        getHeight () {
            let oLi = document.querySelector(".prop_over");
            let oDiv = document.querySelectorAll('.col_div')
            let curHeight = 0;
            for (let i = 0; i <= oLi.length; i++) {
                curHeight += oLi[i].clientHeight;
                console.log(oLi.length);
                // console.log(curHeight);
            }
            // let oHeight = oLi.clientHeight * oLi.length;
            console.log(oLi);
            console.log(curHeight);
            // console.log(oLi.clientHeight);
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
        this.showList();
    }
};
</script>

<style scoped lang="less">
    @import '../../../../styles/common.less';
    @import './tab2.less';
    @import '../all-orders.less';
    .ivu-table-cell{
        padding:0;
    }
</style>

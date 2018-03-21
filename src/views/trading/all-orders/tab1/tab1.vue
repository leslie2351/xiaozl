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
                                    <Col span="3" order="1" class="col-span col-span1"><span @click="modifyPrice">修改价格</span><p style="margin-top: 10px"><router-link :to="'/paymentDetails/'+ item.id">查看详情</router-link></p></Col>
                                </Row>
                            </div>
                        </div>
                        <!--<Table border :columns='paymentColumns' :data="paymentData" class="margin-top-10 searchable-table-con1"></Table>-->
                        <Page :total=total size="small" class='fr margin-top-20' show-elevator show-sizer show-total placement='top'></Page>
                        <Modal
                        v-model="modal1"
                        title="修改价格"
                        @on-ok="ok()"
                        @on-cancel="cancel">
                        <p style='text-align:center'>价格:<Input v-model="price" style="width: 200px" class='margin-left-10'></Input></p>
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
            id: '',
            model1: '',
            isShow: false,
            orderStatus: [],
            code: '',
            paymentColumns: [
                {
                    title: '商品信息',
                    align: 'center',
                    key: 'commodityInformation',
                    width: '300px',
                    render: (h, params) => {
                        return h('div', [
                            h('img', {
                                attrs: {
                                    'src': params.row.couponImg
                                },
                                style: {
                                    width: '50px',
                                    height: '50px'
                                    // position: 'absolute',
                                    // top: 0,
                                    // left: 0
                                }
                            })]
                        );
                    }
                },
                {
                    title: '数量',
                    align: 'center',
                    key: 'number',
                    width: '100px'
                },
                {
                    title: '应付金额',
                    align: 'center',
                    key: 'amountPayable'
                },
                {
                    title: '实付金额',
                    align: 'center',
                    key: 'realPay'
                },
                {
                    title: '备注',
                    align: 'center',
                    key: 'note'
                },
                {
                    title: '操作',
                    align: 'center',
                    key: 'operation',
                    render: (h, params) => {
                        return h('div', [
                            h('Button', {
                                props: {
                                    type: 'Primary',
                                    size: 'small'
                                },
                                on: {
                                    click: () => {
                                        let row = params.row
                                        this.modal1 = true;
                                        this.price = row.realPay;
                                        // console.log(row)
                                    }
                                }
                            }, '修改价格'),
                            h('Button', {
                                props: {
                                    type: 'Primary',
                                    size: 'small'
                                },
                                on: {
                                    click: () => {
                                        // console.log(params.row)
                                        // this.show_id(params.index)
                                        let row = params.row
                                        let argu = {payment_id: row.amountPayable};
                                        this.$router.push({
                                            name: 'payment-details',
                                            params: argu
                                        });
                                    }
                                }
                            }, '查看详情')
                        ]);
                    }
                }
            ],
            paymentData: [],
            goodsList: []
        };
    },
    methods: {
        ok (index) {
            this.$http.put('http://192.168.5.15:8080/orderInfo/updateOrderMoney', {
                id: this.id,
                orderMoney: this.price
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
        modifyPrice () {
            this.modal1 = true;
            this.price = this.realPay;
            this.paymentData.forEach((item) => {
                console.log(item);
                this.id = item.id;
                this.price = item.orderRealMoney;
            });
            console.log(this.id);
            console.log(this.price);
        },
        tableData (val) { // 初始化订单列表
            this.$http.post('http://192.168.5.15:8080/orderInfo/orderInfoPage', {
                storeId: 2,
                orderState: 1
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
        filterType () { // 初始化下拉框搜索条件
            this.$http.post('http://192.168.5.15:8080/systemDict/selectDictType', {
                dictType: "'order_state'"
            }).then((response) => {
                console.log(response);
                this.orderStatus = response.data;
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
        this.filterType();
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
